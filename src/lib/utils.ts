import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(value: string): string {
  const date = new Date(value)

  return date.toLocaleString('en-US')
}
