import { Formik, Form, FormikHelpers, Field } from "formik";
import { MyButton, Popup } from ".";
import ModalForgetPassword from "./modal/ModalForgetPassword";

import { login } from "../../store/actionCreators";
import { validateEmail, validatePassword } from "../../utils";

import { useNavigate } from "react-router-dom";
import { memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useForm } from "../../hooks/useForm";
import { useSee } from "../../hooks/useSee";
import { useMessage } from "../../hooks/useMessage";

import { email, lock, see } from "../../assets";
import { ReactSVG } from "react-svg";
import ModalAccessForgetPassword from "./modal/ModalAccessForgetPassword";

interface Values {
  email: string;
  password: string;
}

const SignupForm = memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isSuccess, error, isLoading } = useAppSelector(
    (store) => store.userReducer
  );

  const modalForgetPassword = useForm();
  const modalAccessForgetPassword = useForm();
  const seeSecond = useSee(false);
  const message = useMessage(error);

  useEffect(() => {
    navigate("/booksPage");
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      message.setMessage(error);
    }
  }, [error]);

  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-y-[50px] bg-mooduck-white">
      <h1 className="text-center text-4xl font-bold uppercase text-mooduck-black">
        Вход
      </h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(
          values: Values,
          { setSubmitting, resetForm }: FormikHelpers<Values>
        ) => {
          dispatch(login(values.email, values.password));
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col items-start justify-center gap-y-[28px] text-lg">
            <div className=" flex w-[463px] gap-x-5 rounded-sm border-[2px] border-mooduck-gray p-3 font-normal">
              <ReactSVG src={email} />
              <Field
                name="email"
                placeholder="example@mail.ru"
                type="email"
                validate={validateEmail}
                className=" w-full"
              />
            </div>
            {errors.email && touched.email && (
              <div className="text-mooduck-red">{errors.email}</div>
            )}
            <div className=" flex w-[463px] items-center gap-x-5 rounded-sm border-[2px] border-mooduck-gray p-3 font-normal">
              <ReactSVG src={lock} />
              <Field
                name="password"
                placeholder="strongPsW2#"
                type={seeSecond.visable ? "text" : "password"}
                validate={validatePassword}
                className=" w-full"
              />
              <ReactSVG
                src={see}
                className="noselect stroke-mooduck-gray hover:cursor-pointer hover:stroke-mooduck-blue"
                onClick={seeSecond.handleOnClick}
              />
            </div>
            {errors.password && touched.password && (
              <div className="text-mooduck-red">{errors.password}</div>
            )}

            <p
              className="transition-all ease-in hover:cursor-pointer hover:text-mooduck-blue"
              onClick={() => modalForgetPassword.handleOnClick(true)}
            >
              Забыли пароль?
            </p>
            <ModalForgetPassword
              visable={modalForgetPassword.visable}
              setVisable={modalForgetPassword.handleOnClick}
              setVisableAnotherModal={modalAccessForgetPassword.handleOnClick}
            />
            <ModalAccessForgetPassword
              visable={modalAccessForgetPassword.visable}
              handleOnClick={modalAccessForgetPassword.handleOnClick}
            />

            <div className="flex w-full items-center justify-center">
              <MyButton
                type="submit"
                className="mt-[22px] w-[200px] py-4"
                disabled={isLoading ? true : false}
              >
                Войти
              </MyButton>
            </div>
          </Form>
        )}
      </Formik>
      {message.message && (
        <Popup handleOnClose={message.setMessage} message={message.message} />
      )}
    </section>
  );
});

export default SignupForm;
