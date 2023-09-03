import AuthService from "@/services/AuthService"
import { userSlice } from "./features/userSlice"
import { AppDispatch } from "./store"
import { IUser } from "@/models/IUser"
import { $api } from "@/http"
import { AuthResponse } from "@/models/response/AuthResponse"

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await AuthService.login(email, password)
        localStorage.setItem('token', response.data.accessToken)
        dispatch(userSlice.actions.setAuth(true))
        dispatch(userSlice.actions.setUser(response.data.user))
        dispatch(userSlice.actions.userFetchingSucces(false))
        dispatch(userSlice.actions.setIsSuccess(true))
        // console.log(response.data)
    } catch (error: any) {
        dispatch(userSlice.actions.setError(error.response?.data?.message))
        // console.log(error.response.data?.message)
    }
}

export const registration = (email: string, username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await AuthService.registration(email, username, password)
        localStorage.setItem('token', response.data.accessToken)
        dispatch(userSlice.actions.setAuth(true))
        dispatch(userSlice.actions.setUser(response.data.user))
        // console.log(response.data)
    } catch (error: any) {
        dispatch(userSlice.actions.setError(error.response?.data?.message))
        console.log(error?.response?.data?.message)
    }
}

export const logout = () => async (dispatch: AppDispatch) => {
    try {
        localStorage.removeItem('token')
        dispatch(userSlice.actions.setAuth(false))
        dispatch(userSlice.actions.setUser({} as IUser))
        return await AuthService.logout()
    } catch (error: any) {
        dispatch(userSlice.actions.setError(error.response?.data?.message))
    }
}

export const checkAuth = () => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.get<AuthResponse>(`/refresh`)
        // console.log(response)
        localStorage.setItem('token', response.data.accessToken)
        dispatch(userSlice.actions.setAuth(true))
        dispatch(userSlice.actions.setUser(response.data.user))
    } catch (error: any) {
        // console.log(error.response?.data?.message)
    }
}