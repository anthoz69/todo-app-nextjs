"use client"

import GuestLayout from "@/components/layouts/guest-layout";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button"
import {Separator} from "@/components/ui/separator"
import Link from "next/link"
import { registerAction } from '@/app/register/action'
import { useFormState } from 'react-dom'


export default function RegisterPage() {

    const [state, formAction, isPending] = useFormState(registerAction, {
        message: '',
        errors: {}
    })

    return (
        <GuestLayout>
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[370px]">
                <div className="flex flex-col text-center">
                    <h1 className="text-2xl font-semibold">Create an account</h1>
                    <p className="text-sm mt-2 text-muted-foreground">
                        Enter detail below to create your account
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
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
                        <Input type="password" name="passwordConfirmation" placeholder="Confirm password" required/>
                        {!!state?.errors?.passwordConfirmation &&
                          <div className="text-xs text-red-500">{state.errors.passwordConfirmation}</div>}
                    </div>

                    {!!state?.message && <div className="text-xs text-red-500 mt-2">{state.message}</div>}

                    <Button className="mt-4 w-full" type="submit">{isPending ? "loading.." : "Create account"}</Button>

                    <p className="text-muted-foreground text-[12px] text-center mt-5">
                        By clicking continue, you agree to our term or something.
                    </p>

                    <div className="relative mt-6 mb-6">
                        <div className="absolute inset-0 flex items-center"><Separator/></div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">OR</span>
                        </div>
                    </div>

                    <Link href="/login">
                        <Button variant="outline" className="w-full">Login</Button>
                    </Link>

                </form>
            </div>
        </GuestLayout>
    );
}
