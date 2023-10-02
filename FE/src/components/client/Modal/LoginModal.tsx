import { useCallback } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { FcGoogle } from "react-icons/fc";

import { Button, Input, Modal } from "../..";
import { useLoginMutation } from "../../../api/auth";
import { useLoginModal, useRegisterModal } from "../../../hooks";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [loginUser, resultLogin] = useLoginMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onToggle = useCallback(() => {
    reset();
    loginModal.onClose();
    registerModal.onOpen();
  }, [reset, loginModal, registerModal]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    loginUser(data)
      .unwrap()
      .then((response) => {
        console.log(response.message);
        loginModal.onClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const bodyContent = (
    <form className="flex flex-col gap-4">
      <Input
        id="email"
        label="Tài khoản"
        placeholder="Nhập email của bạn"
        disabled={resultLogin.isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Mật khẩu"
        type="password"
        placeholder="********"
        disabled={resultLogin.isLoading}
        register={register}
        errors={errors}
        required
      />
    </form>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr className="border border-divideLight dark:border-divideDark" />

      <Button
        outline
        label="Đăng nhập bằng Google"
        icon={FcGoogle}
        onClick={() => alert("Google")}
      />

      <div className="mt-4 text-center font-light text-textDark2nd dark:text-textDark2nd">
        <p>
          Bạn chưa có tài khoản?
          <span
            onClick={onToggle}
            className="text-textLight dark:text-textDark cursor-pointer hover:underline"
          >
            {" "}
            Đăng ký
          </span>
        </p>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={resultLogin.isLoading}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Đăng nhập"
      actionLabel="Đăng nhập"
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
