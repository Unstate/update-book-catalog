import { ReactComponent as UnknownAvatar } from '@/assets/unknownAvatar.svg'
import { ReactComponent as Barcode } from '@/assets/barcode.svg'
import { IUser } from '@/models/IUser'
import { FC } from 'react'
import { useForm } from '@/hooks/useForm'
import { MyButton } from '../UI'

interface UserSettingsProps {
  user: IUser
}

const UserSettings: FC<UserSettingsProps> = ({ user }) => {
  const username = useForm()
  //FIXME: Посмотреть про кастомные хуки, могу ли я использовать только один, или нужно больше

  return (
    <section className="flex flex-col  items-center justify-between px-[42px] 2xl:flex-row">
      <div className="flex w-full items-center justify-center gap-x-[50px]  rounded-[15px] bg-mooduck-red p-[30px] xl:w-[729px] 2xl:w-[729px]">
        <UnknownAvatar />
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
      <div className="flex flex-row flex-wrap justify-center gap-x-[40px] gap-y-5 2xl:flex-col 2xl:gap-x-0">
        <MyButton
          className="w-[433px] py-[15px] text-base 2xl:w-[286px]"
          onClick={() => username.handleOnClick(true)}
        >
          Изменить фотографию
        </MyButton>
        <MyButton
          className="w-[433px] py-[15px] text-base 2xl:w-[286px]"
        //   onClick={() => setVisableUsername(true)}
        >
          Изменить имя пользователя
        </MyButton>
        <MyButton
          className="w-[433px] py-[15px] text-base 2xl:w-[286px]"
        //   onClick={() => setVisableEmail(true)}
        >
          Изменить E-mail
        </MyButton>
        <MyButton
          className="w-[433px] py-[15px] text-base 2xl:w-[286px]"
        //   onClick={() => setVisableCheckPassword(true)}
        >
          Изменить пароль
        </MyButton>
        <MyButton
          className="w-full py-[15px] text-base 2xl:w-[286px]"
        //   onClick={() => setVisableLogout(true)}
        >
          Выйти из аккаунта
        </MyButton>
      </div>
    </section>
  )
}

export default UserSettings
