"use client"

import GuestLayout from "@/components/layouts/guest-layout";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import {useFormState} from "react-dom";
import {loginAction} from "@/app/login/action";

export default function LoginPage() {
    const [state, formAction, isPending] = useFormState(loginAction, {
        message: '',
        errors: {}
    })

    return (
        <GuestLayout>
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[370px]">
                <div className="flex flex-col text-center">
                    <h1 className="text-2xl font-semibold">login your account</h1>
                    <p className="text-sm mt-2 text-muted-foreground">
                        login with your account and get fantastic!
                    </p>
                </div>

                <form action={formAction} className="mt-3">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Input type="text" name="username" placeholder="Username" required/>
                        {!!state?.errors?.username &&
                          <div className="text-xs text-red-500">{state.errors.username}</div>}
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
                        <Input type="password" name="password" placeholder="Password" required/>
                        {!!state?.errors?.password &&
                          <div className="text-xs text-red-500">{state.errors.password}</div>}
                    </div>

                    {!!state?.message && <div className="text-xs text-red-500 mt-2">{state.message}</div>}

                    <Button className="mt-4 w-full" type="submit">{isPending ? "loading.." : "Login"}</Button>

                    <div className="relative mt-6 mb-6">
                        <div className="absolute inset-0 flex items-center"><Separator/></div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">OR</span>
                        </div>
                    </div>

                    <Link href="/register">
                        <Button variant="outline" className="w-full">Register account</Button>
                    </Link>

                </form>
            </div>
        </GuestLayout>
    )
}