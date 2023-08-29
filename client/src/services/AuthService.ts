import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { $api } from "@/http";

export default class AuthService {
    static async login(email:string, password:string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/login', {email, password})
    }

    static async registration(email:string,username:string, password:string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/registration', {email,username,password})
    }

    static async logout(): Promise<void> {
        return $api.post('/logout')
    }

    static async resetPassword(email:string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/resetPassword', {email})
    }

    static async resetChangePassword(token:string, password:string): Promise<AxiosResponse<AuthResponse>> {
        return $api.put<AuthResponse>('/resetPassword', {token, password})
    }

}