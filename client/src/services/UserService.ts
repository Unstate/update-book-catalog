import { AxiosResponse } from "axios";
import { IUser } from "../models/IUser";
import { $api, BASE_URL } from "@/http";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users')
    }
}

// export const userAPI = createApi({
//     reducerPath: 'userApi',
//     baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
//     endpoints: (builder) => ({
//     }),
// })

// export const {} = userAPI