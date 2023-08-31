import { IAuthorsAndGenres } from "@/data/genreList"
import clsx, { ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs))
}

export const correctViewOfAuthors = (array: string[] | undefined): string => {
    let result: string = '';
    array?.map((element: string) => {
        if (element != array[array.length - 1]) {
            result += element + ', '
        } else {
            result += element
        }
    })
    return result
}

export const checkExtendOfUser = (arr:string[],userId:string):boolean => {
    const result:string[] = arr.filter(el => el === userId)
    if (result.length) {
        return true
    }
    return false
}

export const getUniqueObjects = (arr: IAuthorsAndGenres[]) => {
    let uniqueArr = [];
    let seen = new Set();

    for (let obj of arr) {
        let str = JSON.stringify(obj);
        if (!seen.has(str)) {
            uniqueArr.push(obj);
            seen.add(str);
        }
    }
    return uniqueArr;
};