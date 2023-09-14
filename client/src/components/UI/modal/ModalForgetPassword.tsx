import { FC, memo } from "react";
import Modal from "../Modal";
import MyButton from "../MyButton";
import { useResetPasswordMutation } from '../../../services/api/user.api'
import { useInput } from "../../../hooks/useInput";

interface ModalForgetPassword {
  visable: boolean;
  setVisable: (visable: boolean) => void;
  setVisableAnotherModal: (visable: boolean) => void;
}

const ModalForgetPassword: FC<ModalForgetPassword> = memo(({
  visable,
  setVisable,
  setVisableAnotherModal
}) => {
  const { bind, value } = useInput("");
  const [resetPassword] = useResetPasswordMutation();


  return (
    <Modal visable={visable} setVisable={setVisable} title={"Забыли пароль?"}>
      <p className="text-mooduck-gray ">
        Введите ваш E-mail, мы отправим письмо с кодом восстановления пароля
      </p>
      <input
        {...bind}
        type="text"
        className="w-full rounded-[2px] border-[1px] border-mooduck-gray px-3 py-[15px]"
        placeholder="Введите ваш E-mail"
      />
      <MyButton 
        className="py-[15px]" 
        onClick={() => {
          resetPassword(value)
          setVisable(false)
          setVisableAnotherModal(true)
        }}>
        Отправить
      </MyButton>
    </Modal>
  );
});

export default ModalForgetPassword;
