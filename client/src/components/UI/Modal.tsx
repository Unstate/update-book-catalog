import { ReactComponent as Cross } from '@/assets/cross.svg'
import React from 'react'

interface ModalProps extends React.HTMLAttributes<HTMLButtonElement> {
  visable: boolean
  setVisable: (visable: boolean) => void
  title: string
}

const Modal: React.FC<ModalProps> = ({
  children,
  visable,
  setVisable,
  title,

}) => {
  return (
    <>
      {visable && (
        <div className=" fixed left-0 top-0 flex h-screen w-full items-center justify-center bg-mooduck-gray">
          <main className="flex 2xl:w-[772px] xl:w-[772px] lg:w-[772px] w-[426px] flex-col gap-y-[30px] bg-mooduck-white p-10">
            <div className="flex items-center justify-between">
              <p className="text-[25px] font-semibold text-mooduck-black">
                {title}
              </p>
              <Cross
                className="hover:cursor-pointer"
                onClick={() => {
                  setVisable(false)
                }}
              />
            </div>
            {children}
          </main>
        </div>
      )}
    </>
  )
}

export default Modal
