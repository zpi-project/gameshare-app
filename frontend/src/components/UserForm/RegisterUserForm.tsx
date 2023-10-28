import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useRecoilState } from "recoil";
import { registerFormOpenState } from "@/state/registerForm";
import { NewUser } from "@/types/User";
import { UserApi } from "@/api/UserApi";
import { useToast } from "../ui/use-toast";
import UserForm from "./UserForm";

interface RegisterUserFormProps {
  onRegisterSuccess: () => void;
}

const RegisterUserForm: FC<RegisterUserFormProps> = ({ onRegisterSuccess }) => {
  const [registerFormOpen, setRegisterFormOpen] = useRecoilState(registerFormOpenState);
  const { toast } = useToast();
  const { t } = useTranslation();

  const { mutate, isLoading } = useMutation({
    mutationFn: (user: NewUser) => UserApi.create(user),
    onError: () => {
      toast({
        title: t("registerErrorTitle"),
        description: t("tryRefreshing"),
        variant: "destructive",
      });
    },
    onSuccess: () => {
      setRegisterFormOpen(false);
      toast({
        description: t("registerSuccessDescription"),
      });
      onRegisterSuccess();
    },
  });

  return registerFormOpen ? (
    <div className="fixed left-0 top-0 z-[100] flex h-screen w-screen items-center justify-center bg-black/20 backdrop-blur-sm">
      <UserForm onSubmit={(user: NewUser) => mutate(user)} type="register" />
      {isLoading && <Loader />}
    </div>
  ) : (
    <></>
  );
};

export default RegisterUserForm;
