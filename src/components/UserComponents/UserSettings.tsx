import { IUser } from '@/models/IUser'

import { FC, useEffect } from 'react'

import { useForm } from '@/hooks/useForm'

import {
  ModalCheckPassword,
  ModalEmail,
  ModalLogout,
  ModalUploader,
  ModalUsername,
  MyButton
} from '../UI'

import { Barcode, Goose } from '@/assets'
import goose from '@/assets/goose.svg'

import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { getUserImage } from '@/store/actionCreators'
import { useParams } from 'react-router-dom'

interface UserSettingsProps {
  user: IUser
}

const UserSettings: FC<UserSettingsProps> = ({ user }) => {
  const usernameVisable = useForm()
  const emailVisable = useForm()
  const checkPasswordVisable = useForm()
  const photoVisable = useForm()
  const logoutVisable = useForm()

  const dispatch = useAppDispatch()
  const { id } = useParams()
  const {logo} = useAppSelector(store => store.userReducer)

  useEffect(() => {
    if (id) {
      dispatch(getUserImage(id))
    }
  }, [])

  return (
    <section className="mb-[30px] flex flex-col items-center  justify-between gap-y-[30px] 2xl:flex-row 2xl:gap-y-0">
      <div className="flex w-full flex-col items-center justify-center gap-y-[20px] space-x-0 rounded-[15px] bg-mooduck-red p-[30px] lg:flex-row lg:gap-y-0 lg:space-x-[50px] 2xl:w-[729px] ">

        <img
          className="h-[200px] w-[200px] lg:h-[220px] lg:w-[220px] 2xl:h-[220px] 2xl:w-[220px]"
          src={logo}
          alt="Картинка не прогрузилась"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null
            currentTarget.src = goose
          }}
        />
        <div className="flex-col gap-y-[29px] ">
          <Barcode className="mb-[29px]" />
          <div className="flex flex-col gap-y-[29px]">
            <div className="flex gap-x-[53px]">
              <p className="w-[182px] text-xl font-normal text-[#FFFFFF80]">
                Имя пользователя
              </p>
              <p className="text-xl text-mooduck-white">{user.username}</p>
            </div>
            <div className="flex gap-x-[53px]">
              <p className="w-[182px] text-xl font-normal text-[#FFFFFF80]">
                E-mail
              </p>
              <p className="w-[164px] text-xl text-mooduck-white">
                {user.email}
              </p>
            </div>
            <div className="flex gap-x-[53px]">
              <p className="w-[182px] text-xl font-normal text-[#FFFFFF80]">
                Пароль
              </p>
              <p className="text-xl text-mooduck-white">***********</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-y-[20px] md:gap-x-[40px] 2xl:flex-col 2xl:gap-0 2xl:space-y-[20px]">
        <MyButton
          className="w-full py-[15px] lg:w-[433px] 2xl:w-[286px] "
          onClick={() => photoVisable.handleOnClick(true)}
        >
          Изменить фотографию
        </MyButton>
        <ModalUploader
          visable={photoVisable.visable}
          handleOnClick={photoVisable.handleOnClick}
        />

        <MyButton
          className="w-full py-[15px] lg:w-[433px] 2xl:w-[286px] "
          onClick={() => usernameVisable.handleOnClick(true)}
        >
          Изменить имя пользователя
        </MyButton>
        <ModalUsername
          visable={usernameVisable.visable}
          handleOnClick={usernameVisable.handleOnClick}
        />

        <MyButton
          className="w-full py-[15px] lg:w-[433px] 2xl:w-[286px] "
          onClick={() => emailVisable.handleOnClick(true)}
        >
          Изменить E-mail
        </MyButton>
        <ModalEmail
          visable={emailVisable.visable}
          handleOnClick={emailVisable.handleOnClick}
        />

        <MyButton
          className="w-full py-[15px] lg:w-[433px] 2xl:w-[286px] "
          onClick={() => checkPasswordVisable.handleOnClick(true)}
        >
          Изменить пароль
        </MyButton>
        <ModalCheckPassword
          visable={checkPasswordVisable.visable}
          handleOnClick={checkPasswordVisable.handleOnClick}
        />

        <MyButton
          className="w-full py-[15px] 2xl:w-[286px] "
          onClick={() => logoutVisable.handleOnClick(true)}
        >
          Выйти из аккаунта
        </MyButton>
        <ModalLogout
          visable={logoutVisable.visable}
          handleOnClick={logoutVisable.handleOnClick}
        />
      </div>
    </section>
  )
}

export default UserSettings
