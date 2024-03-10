export interface APIResponse<T> {
    d: T,
    op: number
}

export interface UserData {
    username: string,
    email: string,
    password: string,
    documentID: string,
    placeholders: [{
        name: string,
        value: string
    }],
    googleAccount: {
        connected: boolean,
        refreshToken: string
    },
    admin?: boolean
}

export function isUserData(data: number | UserData): data is UserData {
    return(data as UserData).username !== undefined;
}