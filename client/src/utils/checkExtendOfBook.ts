import { IBook } from "@/models/IBook";

export const checkExtendOfBook = (books:IBook[] | undefined, id:string): boolean => {
    const result = books?.filter(book => book._id === id)
    if (result?.length) {
        return true
    } else {
        return false
    }
}