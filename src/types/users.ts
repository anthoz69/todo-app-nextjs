export interface RegisterParams {
    username: string
    password: string
}

export interface RegisterResponse {
    isSuccess: boolean
    data: {
        id: string;
        username: string;
        createdAt: string;
        updatedAt: string;
    }
    statusCode: number | undefined
    message: string | undefined
}

export interface RegisterResponseAction {
    message: string
    errors: any
}

export interface LoginResponseAction extends RegisterResponseAction {}
