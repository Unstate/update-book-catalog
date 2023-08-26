export interface IUser {
  id: string
  email: string
  username: string
  password: string
  isActivated: boolean
  activationLink: string
  //FIXME: переделать тип для logo
  logo: any
}
