import { FC, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/ThemeProvider";
import { useQuery } from "@tanstack/react-query";
import { getDaysInMonth } from "date-fns";
import { URLS } from "@/constants/urls";
import { getFirstDayOfLastMonth, getFirstDayOfMonth, getFirstDayOfNextMonth } from "@/utils/date";
import { stringToHexColor } from "@/utils/stringToColor";
import { GameInstanceApi } from "@/api/GameInstanceApi";
import { Calendar, CalendarDay } from "./Calendar";

interface ReservationsCalendarProps {
  gameInstanceUUID: string;
  tileClassName?: string;
  className?: string;
}

const ReservationsCalendar: FC<ReservationsCalendarProps> = ({
  gameInstanceUUID,
  tileClassName,
  className,
}) => {
  const [startDate, setStartDate] = useState(
    getFirstDayOfMonth(new Date(new Date().setHours(0, 0, 0, 0))),
  );
  const [month, setMonth] = useState(startDate.getMonth() + 1);
  const [year, setYear] = useState(startDate.getFullYear());
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { theme } = useTheme();
  const color =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  useEffect(() => {
    setMonth(startDate.getMonth() + 1);
    setYear(startDate.getFullYear());
  }, [startDate]);

  const {
    data: reservations,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reservations-calendar", { uuid: gameInstanceUUID, month, year }],
    queryFn: () => GameInstanceApi.getReservations(gameInstanceUUID, month, year),
    select: data => {
      return data.map(reservationTimeframe => ({
        ...reservationTimeframe,
        salt: new Date(reservationTimeframe.endDate).getDay(),
      }));
    },
  });

  const daysWithReservations = useMemo(() => {
    const daysInMonth = getDaysInMonth(startDate);
    const startDateCopy = new Date(startDate);

    return Array.from({ length: daysInMonth }).map((_, idx) => {
      const currDate = new Date(startDateCopy);
      currDate.setDate(startDateCopy.getDate() + idx);

      const matchingReservation = (reservations || []).find(reservation => {
        const reservationStartDate = new Date(new Date(reservation.startDate).setHours(0, 0, 0, 0));
        const reservationEndDate = new Date(new Date(reservation.endDate).setHours(0, 0, 0, 0));

        return reservationStartDate <= currDate && currDate <= reservationEndDate;
      });

      return matchingReservation
        ? { id: matchingReservation.reservationId, salt: matchingReservation.salt.toString() }
        : null;
    });
  }, [reservations, startDate]);

  return (
    <Calendar
      onNextClick={() => setStartDate(getFirstDayOfNextMonth(startDate))}
      onPrevClick={() => setStartDate(getFirstDayOfLastMonth(startDate))}
      date={startDate}
      tileClassName={tileClassName}
      className={className}
    >
      {isError ? (
        <h3 className="mt-4 text-center text-xl text-destructive">
          {t("errorFetchingReservationsCalendar")}
        </h3>
      ) : (
        <div className="flex flex-row flex-wrap gap-2">
          {Array.from({ length: (7 + startDate.getDay() - 1) % 7 }).map((_, idx) => (
            <CalendarDay key={idx + "hidden"} variant="hidden" className={tileClassName} />
          ))}
          {isLoading ? (
            <>
              {Array.from({ length: getDaysInMonth(startDate) }).map((_, idx) => (
                <CalendarDay key={idx + "loading"} variant="loading" className={tileClassName} />
              ))}
            </>
          ) : (
            <>
              {daysWithReservations.map((reservation, idx) => {
                const id = ((reservation ? reservation.id.slice(-3) : "") + "salt").replace(
                  "-",
                  reservation?.salt ?? "",
                );

                return (
                  <CalendarDay
                    key={idx}
                    className={tileClassName}
                    variant={reservation ? "filled" : "outlined"}
                    disabled={reservation === null}
                    style={{
                      backgroundColor: reservation?.id
                        ? color === "dark"
                          ? stringToHexColor(id, 0.4, 0.2)
                          : stringToHexColor(id, 0.5, 0.7)
                        : "transparent",
                    }}
                    day={idx + 1}
                    onClick={() =>
                      reservation && navigate(`${URLS.MY_RESERVATIONS}/${reservation.id}`)
                    }
                  />
                );
              })}
            </>
          )}
        </div>
      )}
    </Calendar>
  );
};

export default ReservationsCalendar;
