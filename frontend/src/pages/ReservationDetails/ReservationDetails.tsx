import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { t } from "i18next";
import { useRecoilValue } from "recoil";
import { tokenState } from "@/state/token";
import { URLS } from "@/constants/urls";
import { ReservationsApi } from "@/api/ReservationsApi";
import { UserApi } from "@/api/UserApi";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import ReservationDetailsOwner from "./ReservationDetailsOwner/ReservationDetailsOwner";
import ReservationDetailsRenter from "./ReservationDetailsRenter";

const ReservationDetails: FC = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const token = useRecoilValue(tokenState);
  const [userType, setUserType] = useState<"owner" | "renter">();
  const {
    i18n: { language },
  } = useTranslation();

  const {
    data: reservation,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reservation", { id, language }],
    queryFn: () => ReservationsApi.getDetails(id),
  });

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery({
    queryKey: ["user", { token }],
    queryFn: UserApi.get,
  });

  useEffect(() => {
    if (user && reservation) {
      if (reservation.reservation.renter.uuid === user.uuid) {
        setUserType("renter");
      }
      if (reservation.reservation.gameInstance.owner.uuid === user.uuid) {
        setUserType("owner");
      }
    }
  }, [user, reservation]);

  useEffect(() => {
    if (isUserError || isError) {
      toast({
        title: t("tryRefreshing"),
        description: t("errorFetchingDetails", { reservationId: id }),
        variant: "destructive",
      });
      navigate(URLS.MY_RESERVATIONS);
    }
  }, [isUserError, isError, toast, id, navigate]);

  return isLoading || isUserLoading ? (
    <Skeleton className="h-full w-full rounded-lg" />
  ) : (
    !(isUserError || isError) && (
      <>
        {userType === "owner" && <ReservationDetailsOwner reservation={reservation} />}
        {userType === "renter" && <ReservationDetailsRenter reservation={reservation} />}
      </>
    )
  );
};

export default ReservationDetails;
