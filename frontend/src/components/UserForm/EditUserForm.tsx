import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { NewUser } from "@/types/User";
import { UserApi } from "@/api/UserApi";
import { DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import UserForm from "./UserForm";

const EditUserForm: FC = () => {
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
      toast({
        description: t("registerSuccessDescription"),
      });
    },
  });

  return (
    <DialogContent className="min-h-max min-w-max">
      <UserForm onSubmit={(user: NewUser) => mutate(user)} type="update" />
      {isLoading && <Loader />}
    </DialogContent>
  );
};

export default EditUserForm;
