import {cookies} from "next/headers";
import {baseURL} from "@/api/config";
import {CreateTodo, ResponseType, Todo} from "@/types/todos";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const token = cookies().get('token')
  const res = await fetch(`${baseURL}/todo/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token?.value}`
    }
  })
  const data: ResponseType<Todo> = await res.json()

  return Response.json(data)
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const body: CreateTodo = await request.json()
  const token = cookies().get('token')
  const res = await fetch(`${baseURL}/todo/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token?.value}`
    },
    body: JSON.stringify(body)
  })
  const data: ResponseType<Todo> = await res.json()

  return Response.json(data)
}

