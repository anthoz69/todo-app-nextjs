import MainLayout from "@/components/layouts/main-layout";
import TodoComponent from "@/components/todo/todo";
import {ResponseType, Todo} from "@/types/todos";
import {baseURL} from "@/api/config";
import {cookies} from "next/headers";

async function fetchTodos() {
  const token = cookies().get('token')
  try {
    const res = await fetch(`${baseURL}/todo`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token?.value}`
      }
    })
    const data: ResponseType<Todo[]> = await res.json()

    return data
  } catch (err: any) {
    console.error(err)
    throw err
  }
}
export default async function Home() {
  const data = await fetchTodos()
  return (
    <MainLayout>
      {<TodoComponent initTodoList={data.data} />}
    </MainLayout>
  )
}
