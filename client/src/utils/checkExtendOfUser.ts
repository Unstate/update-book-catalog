export interface IArray {
    userId: string;
}

export const checkExtendOfUser = (arr:IArray[],userId:string):boolean => {
    const result:IArray[] = arr?.filter(el => el.userId === userId)
    
    if (result?.length) {
        return true
    }

    // arr.map(el => console.log(el.userId ))
    return false
}

