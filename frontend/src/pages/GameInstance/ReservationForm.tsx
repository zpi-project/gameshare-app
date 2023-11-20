import { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { GameInstanceDetails } from "@/types/GameInstance";
import { NewReservation } from "@/types/Reservation";
import { PriceBadge } from "@/components/Badge";
import { Stars } from "@/components/Stars";
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
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        gameInstanceUUID: gameInstance.uuid,
        renterComment: "",
    },
  });

  return (
    <div className="flex w-[364px] min-w-[364px] flex-grow flex-col gap-4">
      <h2 className="text-2xl uppercase text-secondary">{t("reservationForm")}</h2>
      <div className="flex flex-grow flex-col gap-8 rounded-lg bg-section p-4">
        <GameInstanceSummary gameInstance={gameInstance} />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-grow flex-col gap-4">
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
                      className="h-[180px] resize-none bg-card p-4"
                      {...field}
                      spellCheck={false}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant="secondary" className="ml-auto mt-auto w-max px-8">
              {t("submit")}
            </Button>
          </form>
        </Form>
      </div>
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
