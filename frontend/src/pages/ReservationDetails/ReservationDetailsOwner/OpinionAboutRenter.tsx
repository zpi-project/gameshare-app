import { FC, useState } from "react";
import { Form, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { t } from "i18next";
import { z } from "zod";
import { NewOpinion, Opinion } from "@/types/Opinion";
import { User } from "@/types/User";
import { UserApi } from "@/api/UserApi";
import { Stars, StarsInput } from "@/components/Stars";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface OpinionAboutRenterProps {
  renterOpinion: Opinion | null;
  canAddRenterOpinion: boolean;
  renterUUID: string;
  reservationId: string;
}

const OpinionAboutRenter: FC<OpinionAboutRenterProps> = ({
  renterOpinion,
  canAddRenterOpinion,
  renterUUID,
  reservationId,
}) => {
  const { t } = useTranslation();
  const { mutateAsync: addOpinion } = useMutation({
    mutationFn: (opinion: NewOpinion) => UserApi.addOpinion(opinion),
  });

  const [stars, setStars] = useState<number>(0);
  // const [description, setDescription] = useState<string>("");

  const formSchema = z.object({
    stars: z.number({
      required_error: t("fieldIsRequired", { field: "stars", context: "female" }),
    }),
    description: z
      .string({
        required_error: t("fieldIsRequired", { field: "opinion description", context: "male" }),
      })
      .min(2, {
        message: t("gameInstaneDescriptionMin"),
      })
      .max(500, { message: t("gameInstanceDescriptionMax") }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <div className="flex h-full  flex-grow flex-col gap-4 rounded-lg bg-section p-4">
      {renterOpinion ? (
        <>
          <div className="flex flex-row flex-wrap justify-between gap-4">
            <h3 className="text-xl uppercase">{t("reservationDetails.owner.renterOpinion")}</h3>
            <Stars count={renterOpinion.stars} />
          </div>
          <p className="flex-grow break-all rounded-lg bg-card p-4 italic">
            {renterOpinion.description}
          </p>
        </>
      ) : canAddRenterOpinion ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(() =>
              addOpinion({
                ratedUserUUID: renterUUID,
                stars: stars,
                description: form.getValues("description"),
                reservationId: reservationId,
              }),
            )}
          >
            <div className="flex h-full w-full flex-col gap-1.5">
              <div className="flex flex-row justify-between p-1">
                <h3 className="text-xl uppercase">{t("reservationDetails.renter.gameOpinion")}</h3>
                <FormField
                  control={form.control}
                  name="stars"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("addGameDesc")}</FormLabel>
                      <FormControl>
                        <div className="grid h-[370px] w-full gap-2.5 rounded-lg bg-card p-4">
                          <StarsInput onChange={setStars} />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex h-full w-full flex-row justify-between gap-1">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("addGameDesc")}</FormLabel>
                      <FormControl>
                        <div className="grid h-[370px] w-full gap-2.5 rounded-lg bg-card p-4">
                          <Textarea
                            placeholder={t("typeHere")}
                            id="message-2"
                            spellCheck={false}
                            className="h-full resize-none"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end p-1">
                <Button className="w-40" type="submit">
                  Save opinion
                </Button>
              </div>
            </div>
          </form>
        </Form>
      ) : (
        <>
          <h3 className="text-xl uppercase">{t("reservationDetails.owner.renterOpinion")}</h3>
          <p className="flex-grow break-all rounded-lg bg-card p-4 italic">
            {t("cannotAddOpinionAboutRenter")}
          </p>
        </>
      )}
    </div>
  );
};

export default OpinionAboutRenter;
