export interface APIResponse<T> {
    d: T,
    op: number
}

export interface SignInResponse {
    d: {
        token: string,
        userData: UserData
    },
    op: 1
}

export interface UserDataResponse {
    d: UserData | String,
    op: 0 | 2
}

export interface UserData {
    username: string,
    email: string,
    documentID: string,
    placeholders: [{
        name: string,
        value: string
    }],
    googleAccount: {
        connected: boolean,
        refreshToken: string
    },
    lastIndexOutput: number
}

export function isUserData(data: number | UserData): data is UserData {
    return(data as UserData).username !== undefined;
}
