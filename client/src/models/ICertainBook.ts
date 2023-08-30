import { IComment, IImages } from "./IBook";

export interface CertainBook {
    authors: string[];
    bookBinding: string;
    bookSeries: string;
    comments: IComment[];
    description: string;
    genres: string[];
    img: IImages;
    pageCount: number;
    painters: string[];
    publishedDate: string;
    publisher:string;   
    title: string;
    translaters: string[];
    _id: string;
}