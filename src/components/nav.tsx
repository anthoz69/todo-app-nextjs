"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {logoutAction} from "@/app/login/action"
import Link from "next/link";

export default function Nav() {

  return (
    <div className="border-b">
      <div className="container flex h-16 items-center">
        <div className="font-bold text-2xl hidden md:visible">Just TODO</div>
        <div className="md:ml-6 space-x-2 md:space-x-4">
          <Link href="/" className="hover:font-bold">Home</Link>
          <Link href="/bonus" className="hover:font-bold">Bonus</Link>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://ui.shadcn.com/avatars/03.png"/>
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator/>
              <DropdownMenuItem onClick={() => logoutAction()}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
