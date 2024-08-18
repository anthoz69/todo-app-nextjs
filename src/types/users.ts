export interface RegisterResponseAction {
    message: string
    errors: any
}

export interface LoginResponseAction extends RegisterResponseAction {}
