import { FC, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { GameInstanceDetails } from "@/types/GameInstance";
import { NewReservation } from "@/types/Reservation";
import { cn } from "@/utils/tailwind";
import { GameInstanceApi } from "@/api/GameInstanceApi";
import Spinner from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormControl, FormMessage, Form } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import DatePicker from "./DatePicker";

interface ReservationFormProps {
  gameInstance: GameInstanceDetails;
  onSubmit: (formValues: NewReservation) => void;
}

const DAY = 24 * 60 * 60 * 1000;

const ReservationForm: FC<ReservationFormProps> = ({ gameInstance, onSubmit }) => {
  const { t } = useTranslation();
  const TODAY = new Date(new Date().setHours(0, 0, 0, 0));
  const TOMORROW = new Date(TODAY);
  TOMORROW.setDate(TODAY.getDate() + 1);
  const [isAvailable, setIsAvailable] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(Date.now() + DAY),
    to: new Date(Date.now() + 3 * DAY),
  });

  const formSchema = z
    .object({
      startDate: z
        .date({
          required_error: t("fieldIsRequired", {
            field: `${t("formStartDate")}`,
            context: "female",
          }),
        })
        .min(TOMORROW, { message: t("startDateNotPast") }),
      endDate: z.date({
        required_error: t("fieldIsRequired", { field: `${t("formEndDate")}`, context: "female" }),
      }),
      renterComment: z.string().trim().optional(),
      gameInstanceUUID: z.string(),
    })
    .refine(data => data.endDate >= data.startDate, {
      message: t("endDateAtLeastStartDate"),
      path: ["endDate"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gameInstanceUUID: gameInstance.uuid,
      renterComment: "",
    },
  });

  useEffect(() => {
    date?.from && form.setValue("startDate", date.from);
    date?.to && form.setValue("endDate", date.to);
  }, [date, form]);

  const startDate = form.watch("startDate");
  const endDate = form.watch("endDate");

  useEffect(() => {
    if (startDate && endDate) {
      form.trigger();
    }
  }, [startDate, endDate, form]);

  const { isFetching, isSuccess } = useQuery({
    queryKey: ["game-instance-is-available", { uuid: gameInstance.uuid, startDate, endDate }],
    queryFn: () => GameInstanceApi.checkAvailability(gameInstance.uuid, startDate, endDate),
    enabled:
      startDate !== undefined &&
      endDate !== undefined &&
      !form.formState.errors["startDate"] &&
      !form.formState.errors["endDate"],
    onSuccess: data => {
      setIsAvailable(data);
      form.trigger();
    },
  });

  return (
    <div className="flex flex-grow flex-col gap-4">
      <h2 className="text-2xl uppercase text-secondary">{t("reservationForm")}</h2>
      <div className="flex flex-grow flex-col gap-8 rounded-lg bg-section p-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(data => {
              if (isAvailable) {
                onSubmit(data);
              }
            })}
            className="flex flex-grow flex-col gap-4"
          >
            <p
              className={cn("h-[100px]", {
                "text-secondary": isSuccess && isAvailable,
                "text-destructive": isSuccess && !isAvailable,
              })}
            >
              {isSuccess && !form.formState.errors["startDate"] && !form.formState.errors["endDate"]
                ? isAvailable
                  ? t("timeframeAvailable")
                  : t("timeframeNoAvailable")
                : ""}
            </p>
            <DatePicker date={date} setDate={setDate} />
            <FormField
              control={form.control}
              name="renterComment"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder={t("leaveMessage")}
                      className="h-[100px] resize-none bg-card p-4"
                      {...field}
                      spellCheck={false}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant="secondary" className="ml-auto mt-auto w-max px-8">
              {t("submitReservation")}
            </Button>
          </form>
        </Form>
      </div>
      {isFetching && <Spinner />}
    </div>
  );
};

export default ReservationForm;
