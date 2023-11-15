import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User, NewUser } from "@/types/User";
import { UserApi } from "@/api/UserApi";
import Spinner from "@/components/ui/Spinner";
import { DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import UserForm from "./UserForm";

interface EditUserFormProps {
  user: User;
  onSubmit: () => void;
}

const EditUserForm: FC<EditUserFormProps> = ({ user, onSubmit }) => {
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
      onSubmit();
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
          phoneNumber: user.phoneNumber ?? "",
          locationLatitude: user.locationLatitude,
          locationLongitude: user.locationLongitude,
        }}
      />
      {isLoading && <Spinner />}
    </DialogContent>
  );
};

export default EditUserForm;
