import { CSSProperties, FC } from "react";
import { useTranslation } from "react-i18next";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/utils/tailwind";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface CalendarProps {
  className?: string;
  children: JSX.Element | JSX.Element[];
  onNextClick: () => void;
  onPrevClick: () => void;
  date: Date;
  tileClassName?: string;
  prevClickDisabled?: boolean;
}

const Calendar: FC<CalendarProps> = ({
  className,
  children,
  onNextClick,
  onPrevClick,
  date,
  tileClassName,
  prevClickDisabled,
}) => {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <CalendarHeader
        onNextClick={onNextClick}
        onPrevClick={onPrevClick}
        date={date}
        prevClickDisabled={prevClickDisabled}
      />
      <CalendarWeekDays tileClassName={tileClassName} />
      {children}
    </div>
  );
};

interface CalendarHeaderProps {
  onNextClick: () => void;
  onPrevClick: () => void;
  date: Date;
  prevClickDisabled?: boolean;
}

const CalendarHeader: FC<CalendarHeaderProps> = ({
  onPrevClick,
  onNextClick,
  date,
  prevClickDisabled,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-row items-center gap-2">
      <p className="mr-auto text-xl capitalize">{t("monthYearFormat", { date: date })}</p>
      <Button
        size="icon"
        onClick={onPrevClick}
        variant="ghost"
        disabled={prevClickDisabled}
        data-test="prev-button"
      >
        <ChevronLeft />
      </Button>
      <Button size="icon" onClick={onNextClick} variant="ghost" data-test="next-button">
        <ChevronRight />
      </Button>
    </div>
  );
};

const CalendarWeekDays: FC<{ tileClassName?: string }> = ({ tileClassName }) => {
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-row gap-2">
      {Array.from({ length: 7 }).map((_, idx) => (
        <p key={idx} className={cn("w-[70px] text-center uppercase", tileClassName)}>
          {t(`weekdays.${idx}`)}
        </p>
      ))}
    </div>
  );
};

interface CalendarDayProps {
  variant: "filled" | "outlined" | "hidden" | "loading";
  day?: number;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  style?: CSSProperties;
  tileClassName?: string;
}

const CalendarDay: FC<CalendarDayProps> = ({
  className,
  day,
  onClick,
  disabled,
  variant,
  style,
}) => {
  return variant === "loading" ? (
    <Skeleton className={cn("h-[70px] w-[70px]", className)} data-test="loading-day" />
  ) : variant === "hidden" ? (
    <div className={cn("flex h-[70px] w-[70px]", className)} data-test="hidden-day" />
  ) : (
    <div
      data-test="day"
      aria-disabled={disabled}
      className={cn(
        "flex h-[70px] w-[70px] items-center justify-center rounded-lg text-xl",
        variant === "filled" && "bg-secondary text-foreground",
        variant === "outlined" && "border border-secondary bg-transparent text-secondary",
        !disabled && "cursor-pointer duration-200 hover:!bg-accent",
        className,
      )}
      style={style}
      onClick={() => onClick && onClick()}
    >
      {day}
    </div>
  );
};

export { Calendar, CalendarDay };
