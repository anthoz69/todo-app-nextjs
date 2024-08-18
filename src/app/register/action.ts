'use server'

import {z} from 'zod'
import {redirect} from 'next/navigation'
import {baseURL} from "@/api/config";
import {RegisterResponseAction} from "@/types/users";

const registerSchema = z.object({
    username: z.string().min(4, {
        message: "Username must be at least 4 characters long.",
    }).regex(/^[A-Za-z0-9]+$/, {
        message: "Username must contain only alphabet and numeric characters.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long.",
    }),
    passwordConfirmation: z.string().min(8, {
        message: "Password must be at least 8 characters long.",
    }),
}).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match.",
    path: ["passwordConfirmation"], // กำหนด error ที่จะเกิดใน field ไหน
})

export async function registerAction(prevState: any, formData: FormData): Promise<RegisterResponseAction> {
    const form = {
        username: formData.get('username'),
        password: formData.get('password'),
        passwordConfirmation: formData.get('passwordConfirmation'),
    }

    const validatedFields = registerSchema.safeParse(form)
    if (!validatedFields.success) {
        return {
            message: '',
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    try {
        const res = await fetch(`${baseURL}/users`, {
            method: 'POST',
            body: JSON.stringify({
                username: form.username,
                password: form.password
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (!res.ok) {
            return {
                errors: {},
                message: 'register has some problem.'
            }
        }
    } catch (err: any) {
        return {
            message: err.message,
            errors: {}
        }
    }

    redirect('/login')
}