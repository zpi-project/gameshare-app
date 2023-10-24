import { FC } from "react";
import UserForm from "./UserForm";

const RegisterUserForm: FC = () => {
  return (
    <div className="fixed left-0 top-0 z-[1000] flex h-screen w-screen items-center justify-center backdrop-blur-sm ">
      <UserForm />
    </div>
  );
};

export default RegisterUserForm;
