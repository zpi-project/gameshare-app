import { FC, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDaysInMonth } from "date-fns";
import {
  getFirstDayOfLastMonth,
  getFirstDayOfMonth,
  getFirstDayOfNextMonth,
  getLastDayOfMonth,
} from "@/utils/date";
import { GameInstanceApi } from "@/api/GameInstanceApi";
import { Calendar, CalendarDay } from "./Calendar";

interface ReservationsCalendarProps {
  gameInstanceUUID: string;
}

const ReservationsCalendar: FC<ReservationsCalendarProps> = ({ gameInstanceUUID }) => {
  const [startDate, setStartDate] = useState(getFirstDayOfMonth(new Date()));
  const [month, setMonth] = useState(startDate.getMonth() + 1);
  const [year, setYear] = useState(startDate.getFullYear());

  //   console.log(month, year);
  //   console.log(getFirstDayOfMonth(currentDate));
  //   console.log(getLastDayOfMonth(currentDate));
  //   console.log(getFirstDayOfLastMonth(currentDate));
  //   console.log(getFirstDayOfNextMonth(currentDate));
  //   console.log(getDaysInMonth(currentDate));

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
  });

  return (
    <Calendar
      onNextClick={() => setStartDate(getFirstDayOfNextMonth(startDate))}
      onPrevClick={() => setStartDate(getFirstDayOfLastMonth(startDate))}
      date={startDate}
    >
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
            {Array.from({ length: getDaysInMonth(startDate) }).map((_, idx) => (
              <CalendarDay key={idx} variant="loading" day={idx + 1} />
            ))}
          </>
        )}
      </div>
    </Calendar>
  );
};

export default ReservationsCalendar;
