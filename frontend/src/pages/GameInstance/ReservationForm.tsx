import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { GameInstanceDetails } from "@/types/GameInstance";
import { NewReservation } from "@/types/Reservation";
import { cn } from "@/utils/tailwind";
import { GameInstanceApi } from "@/api/GameInstanceApi";
import { PriceBadge } from "@/components/Badge";
import { Stars } from "@/components/Stars";
import Spinner from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import DatePicker from "@/components/ui/datepicker";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface ReservationFormProps {
  gameInstance: GameInstanceDetails;
  onSubmit: (formValues: NewReservation) => void;
}

const ReservationForm: FC<ReservationFormProps> = ({ gameInstance, onSubmit }) => {
  const { t } = useTranslation();
  const TODAY = new Date(new Date().setHours(0, 0, 0, 0));
  const [isAvailable, setIsAvailable] = useState(false);

  const formSchema = z
    .object({
      startDate: z
        .date({
          required_error: t("fieldIsRequired", {
            field: `${t("formStartDate")}`,
            context: "female",
          }),
        })
        .min(TODAY, { message: t("startDateNotPast") }),

      endDate: z.date({
        required_error: t("fieldIsRequired", { field: `${t("formEndDate")}`, context: "female" }),
      }),
      renterComment: z.string().trim().optional(),
      gameInstanceUUID: z.string(),
    })
    .refine(data => data.endDate >= data.startDate, {
      message: t("endDateAtLeastStartDate"),
      path: ["endDate"],
    })
    .refine(() => isAvailable, {
      message: t("timeframeNoAvailable"),
      path: ["root"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gameInstanceUUID: gameInstance.uuid,
      renterComment: "",
    },
  });

  const startDate = form.watch("startDate");
  const endDate = form.watch("endDate");

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
    <div className="flex w-[364px] min-w-[364px] flex-grow flex-col gap-4">
      <h2 className="text-2xl uppercase text-secondary">{t("reservationForm")}</h2>
      <div className="flex flex-grow flex-col gap-8 rounded-lg bg-section p-4">
        <GameInstanceSummary gameInstance={gameInstance} />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(data => {
              onSubmit(data);
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
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="h-[80px]">
                  <FormLabel>{t("formStartDate")}</FormLabel>
                  <FormControl>
                    <DatePicker onSelect={field.onChange} placeholder={t("pickDate")} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="h-[80px]">
                  <FormLabel>{t("formEndDate")}</FormLabel>
                  <FormControl>
                    <DatePicker onSelect={field.onChange} placeholder={t("pickDate")} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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

const GameInstanceSummary: FC<{ gameInstance: GameInstanceDetails }> = ({
  gameInstance: {
    avgRating,
    pricePerDay,
    game: { name, image },
  },
}) => (
  <div className="flex w-full flex-row gap-3">
    <div className="h-24 w-24 overflow-hidden rounded-lg bg-section">
      <img src={image} alt={name} className="h-full w-full object-cover object-top" />
    </div>
    <section className="flex flex-col gap-2">
      <h3 className="text-xl font-semibold">{name}</h3>
      {avgRating > 0 && <Stars variant="secondary" count={avgRating} />}
      <PriceBadge price={pricePerDay} />
    </section>
  </div>
);
