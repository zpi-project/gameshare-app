import { FC, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getDaysInMonth } from "date-fns";
import { getFirstDayOfMonth, getFirstDayOfNextMonth, getFirstDayOfLastMonth } from "@/utils/date";
import { GameInstanceApi } from "@/api/GameInstanceApi";
import { Calendar, CalendarDay } from "./Calendar";

interface AvailabilityCalendarProps {
  gameInstanceUUID: string;
  startDate?: Date;
  endDate?: Date;
}

const AvailabilityCalendar: FC<AvailabilityCalendarProps> = ({ gameInstanceUUID }) => {
  const FIRST_DAY_OF_CURRENT_MONTH = getFirstDayOfMonth(new Date(new Date().setHours(0, 0, 0, 0)));
  const [startDate, setStartDate] = useState(FIRST_DAY_OF_CURRENT_MONTH);
  const [month, setMonth] = useState(startDate.getMonth() + 1);
  const [year, setYear] = useState(startDate.getFullYear());
  const { t } = useTranslation();

  useEffect(() => {
    setMonth(startDate.getMonth() + 1);
    setYear(startDate.getFullYear());
  }, [startDate]);

  const {
    data: reservations,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["availability-calendar", { uuid: gameInstanceUUID, month, year }],
    queryFn: () => GameInstanceApi.getNonAvailability(gameInstanceUUID, month, year),
  });

  const availableDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(startDate);
    const startDateCopy = new Date(startDate);

    return Array.from({ length: daysInMonth }).map((_, idx) => {
      const currDate = new Date(startDateCopy);
      currDate.setDate(startDateCopy.getDate() + idx);

      const matchingTimeframe = (reservations || []).find(reservation => {
        const startDate = new Date(new Date(reservation.startDate).setHours(0, 0, 0, 0));
        const endDate = new Date(new Date(reservation.endDate).setHours(0, 0, 0, 0));

        return startDate <= currDate && currDate <= endDate;
      });

      return matchingTimeframe ? false : true;
    });
  }, [reservations, startDate]);

  // disable back click
  // not show prev days

  return (
    <Calendar
      onNextClick={() => setStartDate(getFirstDayOfNextMonth(startDate))}
      onPrevClick={() => setStartDate(getFirstDayOfLastMonth(startDate))}
      date={startDate}
      prevClickDisabled={FIRST_DAY_OF_CURRENT_MONTH >= startDate}
    >
      {isError ? (
        <h3 className="mt-4 text-center text-xl text-destructive">
          {t("errorFetchingReservationsCalendar")}
        </h3>
      ) : (
        <div className="flex flex-row flex-wrap gap-2">
          {Array.from({ length: (7 + startDate.getDay() - 1) % 7 }).map((_, idx) => (
            <CalendarDay key={idx + "hidden"} variant="hidden" />
          ))}
          {isLoading ? (
            <>
              {Array.from({ length: getDaysInMonth(startDate) }).map((_, idx) => (
                <CalendarDay key={idx + "loading"} variant="loading" />
              ))}
            </>
          ) : (
            <>
              {availableDays.map((available, idx) => {
                return (
                  <CalendarDay
                    key={idx}
                    variant={available ? "filled" : "outlined"}
                    disabled={true}
                    day={idx + 1}
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

export default AvailabilityCalendar;
