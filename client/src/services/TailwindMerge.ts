import clsx, { ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs))
}

export const correctViewOfAuthors = (array: string[]): string => {
    let result: string = '';
    array.map((element: string) => {
        if (element != array[array.length - 1]) {
            result += element + ', '
        } else {
            result += element
        }
    })
    return result
}