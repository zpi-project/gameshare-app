import { FC, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useTranslation } from "react-i18next";
import { CalendarIcon } from "lucide-react";
import { formatDate } from "@/utils/date";
import { Calendar } from "@/components/ui/calendar";

interface DatePickerProps {
  date?: DateRange;
  setDate: (date: DateRange | undefined) => void;
}

const DatePicker: FC<DatePickerProps> = ({ date, setDate }) => {
  const { t } = useTranslation();
  const [isSm, setIsSm] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsSm(window.innerWidth < 720);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <div className="flex items-center">
        <CalendarIcon className="mr-2 h-4 w-4" />
        <span className="mr-2">{t("selectedDates")}</span>
        <span className="font-bold">
          {date?.from && date.to ? (
            `${formatDate(new Date(date.from))} - ${formatDate(date.to)}`
          ) : (
            <span>Pick a date</span>
          )}
        </span>
      </div>
      <div className="flex w-[300px] flex-col items-center justify-center p-0 sm:w-[550px]">
        <Calendar
          mode="range"
          selected={date}
          onSelect={setDate}
          className="flex flex-col sm:items-center sm:justify-center"
          numberOfMonths={isSm ? 1 : 2}
          disabled={{ before: new Date() }}
          defaultMonth={new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1)}
        />
      </div>
    </div>
  );
};

export default DatePicker;
