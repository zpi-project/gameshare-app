import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { parsePhoneNumber } from "libphonenumber-js";
import { User } from "@/types/User";
import { getFullname } from "@/utils/user";
import { Map, LocationMarker } from "@/components/Map";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import Avatar from "./Avatar";
import { EditUserForm } from "./UserForm";
import { Button } from "./ui/button";

interface Props {
  user?: User;
  showEdit: boolean;
  isLoading: boolean;
}

const UserDetails: FC<Props> = ({ user, showEdit, isLoading }) => {
  const { t } = useTranslation();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="flex h-full flex-col gap-6">
      {isLoading && (
        <>
          <div className="flex w-full flex-row items-center gap-6">
            <Skeleton className="h-40 w-40 rounded-full" />
            <Skeleton className="h-max-h flex-grow rounded-lg p-5" />
          </div>
          <div className="flex flex-col gap-6">
            <Skeleton className="h-10 w-6/12 rounded-lg p-2" />
            <Skeleton className="h-10 w-6/12 rounded-lg p-2" />
          </div>
        </>
      )}
      {user && (
        <>
          <div className="flex h-full w-full flex-row items-center gap-6">
            <div className="flex w-3/12 flex-col items-center gap-6">
              <Avatar user={user} className="h-40 w-40 text-5xl" />
              {user.phoneNumber && (
                <div className="rounded-lg bg-card p-2.5 px-6">
                  {parsePhoneNumber(user.phoneNumber).formatInternational()}
                </div>
              )}
              <div>
                {showEdit && (
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-44">{t("edit")}</Button>
                    </DialogTrigger>
                    <EditUserForm user={user} onSubmit={() => setDialogOpen(false)} />
                  </Dialog>
                )}
              </div>
            </div>
            <div className="h-full flex-grow flex-col justify-between gap-6">
              <div className="h-1/4 flex-grow">
                <div className="rounded-lg bg-card p-3 text-xl">{getFullname(user)}</div>
              </div>
              <div className="h-3/4 min-w-[100px] flex-grow overflow-hidden rounded-lg bg-section">
                <Map location={[user.locationLatitude, user.locationLongitude]}>
                  <LocationMarker />
                </Map>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDetails;
