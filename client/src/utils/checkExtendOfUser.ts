export const checkExtendOfUser = (arr:string[],userId:string):boolean => {
    const result:string[] = arr?.filter(el => el === userId)
    if (result?.length) {
        return true
    }
    return false
}

