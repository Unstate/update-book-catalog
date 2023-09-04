// import React, { FC } from 'react'
// import Modal from '../Modal'
// import MyButton from '../MyButton'

// interface ModalUsernameProps {
//     visable: boolean
//     setVisable: (visable:boolean) => void
// }

// const ModalUsername:FC<ModalUsernameProps> = ({visable, setVisable}) => {

//   return (
//     <Modal
//       visable={visable}
//       setVisable={setVisable}
//       title={'Изменение имени пользователя'}
//     >
//       <input
//         className="w-full rounded-[2px] border-[2px] border-mooduck-gray px-3 py-[15px]"
//         placeholder="Введите новое имя пользователя"
//         name="changeUsername"
//         type="text"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <MyButton
//         className="py-[15px]"
//         onClick={() => {
//           handleChangeUsername(id, username)
//         }}
//       >
//         Сохранить изменения
//       </MyButton>
//     </Modal>
//   )
// }

// export default ModalUsername
