import { IAuthorsAndGenres } from "@/models/IAuthorsAndGenres";

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

