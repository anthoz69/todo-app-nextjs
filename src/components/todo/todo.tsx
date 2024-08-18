"use client"

import {useEffect, useMemo, useState} from "react";
import {CreateTodo, ResponseType, Todo} from "@/types/todos";
import MainLayout from "@/components/layouts/main-layout";
import {Button} from "@/components/ui/button";
import {CirclePlus} from "lucide-react";
import EmptyState from "@/components/EmptyState";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import TodoItem from "@/components/todo/todo-item";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";

interface TodoProps {
  initTodoList: Todo[]
}

export default function TodoComponent({initTodoList}: TodoProps) {
  const [createDialog, setCreateDialog] = useState<boolean>(false)
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false)
  const [todoList, setTodoList] = useState<Todo[]>(initTodoList)
  const [todoId, setTodoId] = useState<string>('')
  const [createTodo, setCreateTodo] = useState<CreateTodo>({
    title: '',
    description: ''
  })
  const editMode: boolean = useMemo(() => {
    return todoId != ''
  }, [todoId])

  const fetchTodo = async () => {
    try {
      const res = await fetch('/api/todo')
      const data: ResponseType<Todo[]> = await res.json()

      if (data.isSuccess) {
        setTodoList(data.data)
      }
    } catch (err: any) {
      console.log(err)
    }
  }

  const fetchDeleteTodo = async (id: string) => {
    if (!id) return
    try {
      const res = await fetch('/api/todo', {
        method: 'DELETE',
        body: JSON.stringify({
          id
        })
      })
      const data: { isSuccess: boolean } = await res.json()
      if (data.isSuccess) {
        const updateTodo = todoList.filter((t) => t.id != id)
        setTodoList(updateTodo)
      }
    } catch (err: any) {
      console.log(err)
    }
  }

  const createTodoHandle = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setCreateDialog(false)
    try {
      const res = await fetch('/api/todo', {
        method: 'POST',
        body: JSON.stringify({
          title: createTodo.title,
          description: createTodo.description,
        })
      })
      const data: { isSuccess: boolean } = await res.json()
      if (data.isSuccess) {
        fetchTodo()
        setCreateTodo({
          title: '',
          description: ''
        })
      }
    } catch (err: any) {
      console.log(err)
    }
  }

  const updateTodoHandle = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setCreateDialog(false)
    try {
      const res = await fetch(`/api/todo/${todoId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          title: createTodo.title,
          description: createTodo.description,
        })
      })
      const data: { isSuccess: boolean } = await res.json()
      if (data.isSuccess) {
        fetchTodo()
        setCreateTodo({
          title: '',
          description: ''
        })
        setTodoId('')
      }
    } catch (err: any) {
      console.log(err)
    }
  }

  const fetchTodoById = async (id: string) => {
    try {
      const res = await fetch(`/api/todo/${id}`)
      if (!res.ok || res.status !== 200) {
        throw Error('get todo by id error')
      }

      const data: ResponseType<CreateTodo> = await res.json()
      return data
    } catch (err: any) {
      console.log(err)
    }
  }

  const editHandle = async (id: string) => {
    try {
      const todoData = await fetchTodoById(id)
      if (!todoData || !todoData.isSuccess) {
        throw Error('get todo by id error')
      }
      setTodoId(id)
      setCreateDialog(true)
      setCreateTodo(todoData.data)
    } catch (err: any) {
      console.log(err)
    }
  }
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target
    setCreateTodo({
      ...createTodo,
      [name]: value
    })
  }

  return (

    <>
      <div>
        <div className="flex flex-wrap items-start justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Todo list</h2>
            <p className="text-sm text-muted-foreground">list of your todo app</p>
          </div>
          <div>
            <Button onClick={() => setCreateDialog(true)}>
              <CirclePlus width={16}/> <span className="ml-2">Add new</span>
            </Button>
          </div>
        </div>

        {!todoList.length && <EmptyState
          title="You have no todos"
          description="You can start as soon as you add a todo"
          buttonText="Add Todo"
          onButtonClick={() => setCreateDialog(true)}
        />}
        <div className="mt-[80px] md:mt-[100px] grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-4">
          {
            todoList.map((todo, index) =>
              <TodoItem
                todo={todo}
                deleteHandle={(id) => {
                  setTodoId(id)
                  setDeleteDialog(true)
                }}
                editHandle={editHandle}
                key={`${index}-${todo.id}`}
              />
            )
          }
        </div>
      </div>

      <Dialog open={createDialog} onOpenChange={setCreateDialog}>
        <DialogContent onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>{editMode ? 'Edit' : 'Add'} todo</DialogTitle>
            <DialogDescription>
              fill form below to {editMode ? 'Edit' : 'Create'} your todo.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={editMode ? updateTodoHandle : createTodoHandle}>
            <div className="grid w-full items-center gap-1.5">
              <Input type="text" name="title" placeholder="Todo title" onChange={handleInputChange}
                     value={createTodo.title} required/>
            </div>
            <div className="grid w-full items-center gap-1.5 mt-4">
              <Textarea name="description" placeholder="Todo description" onChange={handleInputChange}
                        value={createTodo.description} required/>
            </div>

            <Button className="w-full mt-5" type="submit">{editMode ? 'Edit' : 'Add'}</Button>
            <Button className="w-full mt-7" type="button" variant="outline"
                    onClick={() => setCreateDialog(false)}>Cancel</Button>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500 hover:bg-red-600"
                               onClick={() => fetchDeleteTodo(todoId)}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
