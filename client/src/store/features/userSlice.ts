import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { BooksProps, BooksState, IComments } from "./bookSlice";
import { IUser } from "@/models/IUser";
import { IComment } from "@/models/IBook";

interface IUsers {
    user: IUser;
    isAuth: boolean;
    isLoading: boolean;
    // favouriteBooks: IFavoritebooks;
    comments: IComment[];
    error: string;
    isSuccess: boolean;
    
}

// export interface IFavoritebooks {
//     books: BooksProps[],
//     totalPages: number,
//     hasNextPage: boolean,
//     hasPrevPage: boolean,
//     page: number,
// }

const initialState: IUsers = {
    user: {
        id: '',
        email: '',
        username: '',
        password: '',
        isActivated: false,
        activationLink: '',
        logo: '',
    },
    isAuth: false,
    isLoading: false,
    // favouriteBooks: {
    //     books: [],
    //     totalPages: 0,
    //     hasNextPage: false,
    //     hasPrevPage: false,
    //     page: 1,
    // },
    comments: [],
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
            state.isSuccess = !action.payload
        },
        setUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload
        },
        setAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload
        },
        // setFavouriteBooks(state, action: PayloadAction<BooksState>) {
        //     state.favouriteBooks = action.payload
        // },
        setUserComments(state, action:PayloadAction<IComment[]>) {
            state.comments = action.payload
        },
        setError(state, action:PayloadAction<string>) {
            state.error = action.payload
        },
        // deleteFavouriteBook(state, action: PayloadAction<string>) {
        //     state.favouriteBooks.books = state.favouriteBooks.books.filter(book => book._id !== action.payload)
        // },
        // setOneFavouriteBook(state, action:PayloadAction<BooksProps>) {
        //     state.favouriteBooks.books = [...state.favouriteBooks.books, action.payload]
        // },
        setUserImage(state,action:PayloadAction<string>) {
            state.user.logo = action.payload
        }
    }
})

export const { } = userSlice.actions

export default userSlice.reducer