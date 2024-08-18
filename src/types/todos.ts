export interface Todo {
  completed?: boolean
  description: string
  title: string
  updated_at: string
  created_at?: string
  created_by?: CreatedBy
  id?: string
  no?: number
  date?: string
  due_date?: string
  date_time?: string
  isDone?: boolean
}

export interface CreatedBy {
  id: string
  username: string
}

export interface ResponseType<T> {
  isSuccess: boolean
  data: T
}

export interface CreateTodo {
  title: string
  description: string
}
