'use server'

import {z} from "zod";
import {baseURL} from "@/api/config";
import { cookies } from 'next/headers';
import {redirect} from "next/navigation";
import {LoginResponseAction} from "@/types/users";

const loginSchema = z.object({
    username: z.string(),
    password: z.string(),
})

export async function loginAction(prevState: any, formData: FormData): Promise<LoginResponseAction> {
    const form = {
        username: formData.get('username'),
        password: formData.get('password'),
    }
    const validatedFields = loginSchema.safeParse(form)
    if (!validatedFields.success) {
        return {
            message: '',
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    try {
        const res = await fetch(`${baseURL}/auth/login`, {
            method: 'POST',
            body: JSON.stringify({
                username: form.username,
                password: form.password
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (!res.ok || res.status !== 201) {
            return {
                errors: {},
                message: 'login has some problem.'
            }
        }

        const data = await res.json()

        cookies().set({
            name: "token",
            value: data.access_token,
            httpOnly: true,
            secure: true,
            path: "/",
        });
    } catch (err: any) {
        console.log(err)
        return {
            message: err.message,
            errors: {}
        }
    }

    redirect('/')
}

export async function logoutAction() {
    cookies().delete('token')
    redirect('/login')
}