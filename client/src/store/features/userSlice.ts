import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";


interface IUsers {
    user: IUser;
    isAuth: boolean;
    isLoading: boolean;
    error: string;
    isSuccess: boolean;
    logo: any;
}

const initialState: IUsers = {
    user: {
        id: '',
        email: '',
        username: '',
        password: '',
        isActivated: false,
        activationLink: '',
    },
    logo: '',
    isAuth: false,
    isLoading: false,
    error: '',
    isSuccess: false,   
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userFetching(state) {
            state.isLoading = true;
        },
        userFetchingSucces(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
        },
        setUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload
        },
        setIsSuccess(state, action: PayloadAction<boolean>) {
            state.isSuccess = action.payload
        },
        setAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload
        },
        setError(state, action:PayloadAction<string>) {
            state.error = action.payload
        },
        setUserImage(state,action:PayloadAction<string>) {
            state.logo = action.payload
        }
    }
})

export const { } = userSlice.actions

export default userSlice.reducer