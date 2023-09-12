import { $api, $api_users } from '../http'
import { IUser } from '../models/IUser'
import { AuthResponse } from '../models/response/AuthResponse'
import AuthService from '../services/AuthService'
import { userSlice } from './features/userSlice'
import { AppDispatch } from './store'
import { AxiosResponse } from 'axios'

export const login =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await AuthService.login(email, password)
      localStorage.setItem('token', response.data.accessToken)
      dispatch(userSlice.actions.setAuth(true))
      dispatch(userSlice.actions.setUser(response.data.user))
      dispatch(userSlice.actions.userFetchingSucces(false))
      dispatch(userSlice.actions.setIsSuccess(true))
    } catch (error: any) {
      dispatch(userSlice.actions.setError(error.response?.data?.message))
      console.log(error.response.data?.message)
    }
  }

export const registration =
  (email: string, username: string, password: string) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await AuthService.registration(email, username, password)
      localStorage.setItem('token', response.data.accessToken)
      dispatch(userSlice.actions.setAuth(true))
      dispatch(userSlice.actions.setUser(response.data.user))
      dispatch(userSlice.actions.setIsSuccess(true))
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
    localStorage.setItem('token', response.data.accessToken)
    dispatch(userSlice.actions.setAuth(true))
    dispatch(userSlice.actions.setUser(response.data.user))
  } catch (error: any) {
    console.log(error.response?.data?.message)
  }
}

export const getUserImage = (id: string) => async (dispatch: AppDispatch) => {
  try {
    await $api_users
      .get(`/${id}/logo`, { responseType: 'blob' })
      .then((response: AxiosResponse<Blob>) => {
        const imageBlob = response.data
        const imageUrl = URL.createObjectURL(imageBlob)
        const imgEl = new Image()
        imgEl.src = imageUrl
        dispatch(userSlice.actions.setUserImage(imgEl.src))
      })
  } catch (error: any) {
    console.log(error.response?.data?.message)
  }
}

export const setNewUserImage = async (id: string, logoList: FileList) => {
  const logo = logoList[0]
  try {
    return await $api_users.put(
      `/${id}/logo`,
      { logo },
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
  } catch (error: any) {
    console.log(error.response?.data?.message)
  }
}

export const deleteUserImage = async (id: string | undefined) => {
  try {
    return await $api_users.delete(`/${id}/logo`)
  } catch (error: any) {
    console.log(error.response?.data?.message)
  }
}
