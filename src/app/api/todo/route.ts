import {baseURL} from '@/api/config'
import {cookies} from "next/headers";
import {CreateTodo, ResponseType, Todo} from '@/types/todos'

export async function GET() {
  const token = cookies().get('token')
  const res = await fetch(`${baseURL}/todo`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token?.value}`
    }
  })
  const data: ResponseType<Todo[]> = await res.json()

  return Response.json(data)
}

export async function DELETE(request: Request) {
  const body = await request.json()
  const token = cookies().get('token')
  const res = await fetch(`${baseURL}/todo/${body.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token?.value}`
    }
  })
  const data: { isSuccess: Boolean } = await res.json()

  return Response.json(data)
}

export async function POST(request: Request) {
  const body: CreateTodo = await request.json()
  if (body.title.trim() === '' || body.description.trim() === '') {
    return Response.json({
      isSuccess: false,
      message: 'Some param is empty',
      body
    }, {
      status: 400
    })
  }
  const token = cookies().get('token')
  const res = await fetch(`${baseURL}/todo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token?.value}`
    },
    body: JSON.stringify({
      title: body.title,
      description: body.description
    })
  })
  const data: { isSuccess: Boolean } = await res.json()

  return Response.json(data)
}
