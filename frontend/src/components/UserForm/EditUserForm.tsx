import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { tokenState } from "@/state/token";
import { User, NewUser } from "@/types/User";
import { UserApi } from "@/api/UserApi";
import Spinner from "@/components/ui/Spinner";
import { DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import UserForm from "./UserForm";

interface EditUserFormProps {
  user: User;
}

const EditUserForm: FC<EditUserFormProps> = ({ user }) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (user: NewUser) => UserApi.update(user),
    onError: () => {
      toast({
        title: t("updateErrorTitle"),
        description: t("tryRefreshing"),
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        description: t("updateSuccessDescription"),
      });
      queryClient.invalidateQueries(["user"]);
    },
  });

  return (
    <DialogContent className="min-h-max min-w-max">
      <UserForm
        onSubmit={(user: NewUser) => mutate(user)}
        type="update"
        user={{
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
          locationLatitude: user.locationLatitude,
          locationLongitude: user.locationLongitude,
        }}
      />
      {isLoading && <Spinner />}
    </DialogContent>
  );
};

export default EditUserForm;
