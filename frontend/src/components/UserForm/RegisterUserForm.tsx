import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { registerFormOpenState } from "@/state/registerForm";
import { NewUser } from "@/types/User";
import { UserApi } from "@/api/UserApi";
import Spinner from "@/components/ui/Spinner";
import { useToast } from "@/components/ui/use-toast";
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
    <div className="fixed left-0 top-0 z-[100] flex h-screen w-screen items-center justify-center bg-background/20 backdrop-blur-sm">
      <UserForm onSubmit={(user: NewUser) => mutate(user)} type="register" />
      {isLoading && <Spinner />}
    </div>
  ) : (
    <></>
  );
};

export default RegisterUserForm;
