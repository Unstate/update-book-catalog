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
