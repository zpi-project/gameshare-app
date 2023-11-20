import { FC } from "react";
import { useTranslation } from "react-i18next";
import { GameInstanceDetails } from "@/types/GameInstance";
import { NewReservation } from "@/types/Reservation";
import { PriceBadge } from "@/components/Badge";
import { Stars } from "@/components/Stars";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ReservationFormProps {
  gameInstance: GameInstanceDetails;
  onSubmit: (formValues: NewReservation) => void;
}

const ReservationForm: FC<ReservationFormProps> = ({ gameInstance, onSubmit }) => {
  const { t } = useTranslation();

    
  const formSchema = z.object({
    firstName: z
      .string()
      .trim()
      .min(1, {
        message: t("fieldIsRequired", { field: `${t("firstName")}` }),
      }),
    renterComment: z
      .string()
      .trim()
      .min(1, {
        message: t("fieldIsRequired", { field: `${t("renterComment")}` }),
      }),
  });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    }
 );

  return (
    <div className="w-[364px] min-w-[364px] flex-grow flex flex-col gap-4">
      <h2 className="text-2xl uppercase text-secondary">{t("reservationForm")}</h2>
      <div className="p-4 rounded-lg bg-section flex-grow">
              <GameInstanceSummary gameInstance={gameInstance} />
              <Form {...form}>
                  <form  onSubmit={form.handleSubmit(onSubmit)}>
                      
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
