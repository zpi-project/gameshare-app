import { FC } from "react";
import { useRecoilState } from "recoil";
import { registerFormOpenState } from "@/state/registerForm";
import UserForm from "./UserForm";

const RegisterUserForm: FC = () => {
  const [registerFormOpen, setRegisterFormOpen] = useRecoilState(registerFormOpenState);

  const onSubmit = () => {
    console.log("submitted");
    setRegisterFormOpen(false);
  };
  return registerFormOpen ? (
    <div className="fixed left-0 top-0 z-[1000] flex h-screen w-screen items-center justify-center bg-black/20 backdrop-blur-sm">
      <UserForm onSubmit={onSubmit} />
    </div>
  ) : (
    <></>
  );
};

export default RegisterUserForm;
