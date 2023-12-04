import { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { NewOpinion, Opinion } from "@/types/Opinion";
import { UserApi } from "@/api/UserApi";
import { Stars, StarsInput } from "@/components/Stars";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormControl, Form } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

interface OpinionAboutOwnerProps {
  ownerOpinion: Opinion | null;
  canAddOwnerOpinion: boolean;
  ownerUuid: string;
  reservationId: string;
}

const OpinionAboutOwner: FC<OpinionAboutOwnerProps> = ({
  ownerOpinion,
  canAddOwnerOpinion,
  ownerUuid,
  reservationId,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { mutate: addOpinion } = useMutation({
    mutationFn: (opinion: NewOpinion) => UserApi.addOpinion(opinion),
    onError: () => {
      toast({
        title: t("opinionErrorTitle"),
        description: t("tryRefreshing"),
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        description: t("opinionSuccessDescription"),
      });
      queryClient.invalidateQueries(["reservation", { id: reservationId }]);
    },
  });

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
    ratedUserUUID: z.string(),
    reservationId: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reservationId,
      ratedUserUUID: ownerUuid,
    },
  });

  return (
    <div className="flex flex-grow flex-col gap-4 rounded-lg bg-section p-4 pb-1">
      {ownerOpinion ? (
        <>
          <div className="flex flex-row flex-wrap justify-between gap-4">
            <h3 className="text-xl uppercase">{t("reservationDetails.renter.ownerOpinion")}</h3>
            <Stars count={ownerOpinion.stars} />
          </div>
          <div className=" flex h-full w-full flex-grow pb-3">
            <p className="flex-grow break-all rounded-lg bg-card p-3 italic">
              {ownerOpinion.description}
            </p>
          </div>
        </>
      ) : canAddOwnerOpinion ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(data => addOpinion(data))}>
            <div className="flex h-full w-full flex-col gap-1.5">
              <div className="flex flex-row justify-between p-1">
                <h3 className="text-xl uppercase">{t("reservationDetails.renter.ownerOpinion")}</h3>
                <FormField
                  control={form.control}
                  name="stars"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <StarsInput
                          onChange={(stars: number) => {
                            field.onChange(stars);
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex h-full w-full gap-1">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Textarea
                          placeholder={t("typeHere")}
                          id="message-2"
                          spellCheck={false}
                          className="h-full resize-none"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end p-1">
                <Button className="w-40" type="submit">
                  {t("saveOpinion")}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      ) : (
        <>
          <h3 className="text-xl uppercase">{t("reservationDetails.renter.ownerOpinion")}</h3>
          <p className="flex-grow break-all rounded-lg bg-card p-4 italic">
            {t("cannotAddOpinionAboutOwner")}
          </p>
        </>
      )}
    </div>
  );
};

export default OpinionAboutOwner;
