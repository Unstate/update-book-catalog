export interface IParamsFilterBooksUser {
  limit: number;
  page: number
  id: string | undefined;
}

export interface IParamsFilterBooksBooks {
  limit: number;
  page: number;
  genre: string[] | string | undefined;
  author: string[] | string | undefined;
}

export interface IChangeUserData {
  id: string | undefined;
  [key: string]: string | undefined;
}

export interface IChangeResetPassword {
  token: string;
  password: string;
}

export interface ISetNewComment {
  id: string | undefined;
  title: string;
  text: string;
  rating: number;
}
