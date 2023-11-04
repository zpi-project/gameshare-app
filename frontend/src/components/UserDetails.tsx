import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { parsePhoneNumber } from "libphonenumber-js";
import { useRecoilValue } from "recoil";
import { locationState } from "@/state/location";
import { User } from "@/types/User";
import { getFullname } from "@/utils/user";
import { Map, LocationButton, LocationMarker } from "@/components/Map";
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
  const default_location = useRecoilValue(locationState) as number[];
  const default_latitude = user?.locationLatitude ?? default_location[0];
  const default_longitude = user?.locationLongitude ?? default_location[1];
  const location = [default_latitude, default_longitude];

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
            <div className="flex w-4/12 flex-col gap-6">
              <Avatar user={user} className="h-40 w-40 text-5xl" />
              <div className="rounded-lg bg-card p-2">
                {parsePhoneNumber(user.phoneNumber).formatInternational()}
              </div>
              <div className="flex w-full flex-row justify-between">
                {showEdit && (
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-32">{t("edit")}</Button>
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
              <div className="h-3/4 min-w-[100px] flex-grow rounded-lg bg-section">
                <Map location={location}>
                  <LocationButton />
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
