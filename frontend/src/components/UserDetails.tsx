import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { parsePhoneNumber } from "libphonenumber-js";
import { User } from "@/types/User";
import { getFullname } from "@/utils/user";
import { Map, LocationMarker } from "@/components/Map";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import Avatar from "./Avatar";
import { Stars } from "./Stars";
import { EditUserForm } from "./UserForm";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface Props {
  user?: User;
  showEdit?: boolean;
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
          <div className="flex h-full w-full flex-row items-center gap-6" data-test="user-details">
            <div className="flex flex-col items-center gap-3 xl:gap-6">
              <Avatar user={user} className="h-20 w-20 xl:h-[148px] xl:w-[148px] xl:text-5xl" />
              {user.phoneNumber && (
                <div className="w-full rounded-lg bg-card p-2.5 px-6 text-sm xl:text-base">
                  {parsePhoneNumber(user.phoneNumber).formatInternational()}
                </div>
              )}
              {showEdit && (
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full">{t("edit")}</Button>
                  </DialogTrigger>
                  <EditUserForm user={user} onSubmit={() => setDialogOpen(false)} />
                </Dialog>
              )}
            </div>
            <div className="h-full flex-grow flex-col justify-between">
              <div className="mb-4 flex flex-row justify-between rounded-lg bg-card p-2 xl:p-3">
                <h2 className="xl:text-xl">{getFullname(user)}</h2>
                {user.opinionsAmount > 0 ? (
                  <div className="flex flex-row gap-2">
                    <p className="text-base tracking-widest text-foreground">
                      ({user.opinionsAmount})
                    </p>
                    <Stars count={Math.round(user.avgRating)} />
                  </div>
                ) : (
                  <Badge variant="secondary" className="w-max px-3 py-1 hover:bg-primary">
                    {t("noOpinions")}
                  </Badge>
                )}
              </div>
              <div className="h-[calc(100%-70px)] min-w-[100px] overflow-hidden rounded-lg bg-section">
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
