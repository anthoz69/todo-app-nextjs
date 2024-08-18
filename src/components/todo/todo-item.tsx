import {Todo} from "@/types/todos";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {formatDate} from "@/lib/utils";
import {CircleX} from "lucide-react"

interface TodoItemProps {
  todo: Todo,
  deleteHandle: (id: string) => void,
  editHandle: (id: string) => void
}

export default function TodoItem({todo, deleteHandle, editHandle}: TodoItemProps) {
  return (
    <Card className="hover:shadow-md">
      <CardHeader>
        <div className="relative flex items-center">
          <CardTitle className="text-2xl truncate pr-8">{todo.title}</CardTitle>
          <CircleX width="18" className="absolute -top-2 -right-2 text-gray-500 hover:text-red-500 cursor-pointer"
            onClick={() => deleteHandle(todo.id || '')}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-base">{todo.description}</div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-gray-500/40 text-xs md:text-sm">Author: {todo.created_by?.username || '-'}</div>
        <div className="text-gray-500/40 text-xs md:text-sm">
          {formatDate(todo.updated_at)} | <span onClick={() => editHandle(todo.id || '')} className="text-blue-700 cursor-pointer">Edit</span>
        </div>
      </CardFooter>
    </Card>
  )
}
