import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Game } from "@/types/Game";
import { NewGameInstance } from "@/types/GameInstance";
import { Button } from "@/components/ui/button";
import { DialogContent } from "@/components/ui/dialog";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { GameSearchBar, GameSearchCard } from "../GameSearch";

interface GameInstanceFormProps {
  onSubmit: (gameInstance: NewGameInstance) => void;
}

const GameInstanceForm: FC<GameInstanceFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation();

  const formSchema = z.object({
    gameId: z.number(),
    description: z
      .string()
      .min(1, { message: t("fieldIsRequired", { field: t("gameDesctiption"), context: "male" }) })
      .min(2, {
        message: t("gameInstaneDescriptionMin"),
      })
      .max(500, { message: t("gameInstanceDescriptionMax") }),
    pricePerDay: z.coerce
      .number({
        invalid_type_error: t("fieldIsRequired", { field: t("pricePerDay"), context: "female" }),
      })
      .positive({
        message: t("minPricePerDay"),
      })
      .max(200, { message: t("maxPricePerDay") }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleFormSubmit = (data: NewGameInstance) => {
    onSubmit(data);
  };

  const [game, setGame] = useState<Game | null>(null);

  return (
    <DialogContent
      className="flex max-w-7xl"
      onCloseAutoFocus={() => {
        form.reset();
        setGame(null);
      }}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="m-4 w-full rounded-md bg-background p-3 shadow-lg"
        >
          <div className="flex h-full w-full flex-row gap-4">
            <div className="flex w-1/2 flex-col gap-2">
              <h1 className="w-full text-2xl uppercase text-primary">{t("yourGameDetails")}</h1>
              <FormField
                control={form.control}
                name="gameId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("chooseGameTitle")}</FormLabel>
                    <FormControl>
                      <GameSearchBar
                        onGameClick={(game: Game) => {
                          field.onChange(game.id);
                          setGame(game);
                        }}
                        placeholder={t("typeToSearch")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {game && <GameSearchCard game={game}></GameSearchCard>}
              <FormField
                control={form.control}
                name="pricePerDay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("provideGamePrice")}</FormLabel>
                    <FormControl>
                      <Input
                        className="border-none"
                        {...field}
                        onChange={e => {
                          const value = parseFloat(e.target.value);
                          field.onChange(isNaN(value) ? "" : value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                          className="h-full resize-none"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Separator orientation="vertical" className="mx-2 h-full rounded-lg bg-primary" />
            <div className="flex w-1/2 flex-col justify-between">
              <h1 className="w-full text-2xl uppercase text-primary">{t("uploadGamePhotos")}</h1>
              <div className="h-4/5">Place to upload images</div>
              <Button type="submit" className="w-1/5 place-self-end">
                {t("submit")}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};

export default GameInstanceForm;
