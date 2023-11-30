import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import z from "zod";
import { Game } from "@/types/Game";
import { NewGameInstance } from "@/types/GameInstance";
import { GameInstanceApi } from "@/api/GameInstanceApi";
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
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { GameSearchBar, GameSearchCard } from "../GameSearch";
import { useToast } from "../ui/use-toast";

interface GameInstanceFormProps {
  onSubmit: () => void;
}

const GameInstanceForm: FC<GameInstanceFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [selectedImages, setSelectedImages] = useState<File[] | null>(null);
  const [game, setGame] = useState<Game | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filesList = e.target.files;
    if (filesList) {
      setSelectedImages(prevImages =>
        (prevImages ? [...prevImages, ...Array.from(filesList)] : Array.from(filesList)).slice(
          0,
          3,
        ),
      );
    }
  };

  const formSchema = z.object({
    gameId: z.number({
      required_error: t("fieldIsRequired", { field: t("game"), context: "female" }),
    }),
    description: z
      .string({
        required_error: t("fieldIsRequired", { field: t("gameDescription"), context: "male" }),
      })
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

  const { mutateAsync: addGameInstance } = useMutation({
    mutationFn: (gameInstance: NewGameInstance) => GameInstanceApi.create(gameInstance),
  });

  const { mutateAsync: addImage } = useMutation(
    (params: { uuid: string; file: File }) => GameInstanceApi.addImage(params.uuid, params.file),
    {
      onSuccess: data => {
        console.log("success", data);
      },
    },
  );

  const handleFormSubmit = async (data: NewGameInstance) => {
    try {
      const newGame = await addGameInstance(data);

      toast({
        title: t("gameInstanceAdded"),
      });

      if (selectedImages) {
        for (let idx = 0; idx < (selectedImages.length || 0); idx++) {
          const file = selectedImages[idx];

          try {
            await addImage({ uuid: newGame.uuid, file });
            toast({
              title: t("successAddingImage", { nr: idx + 1 }),
            });
          } catch {
            toast({
              title: t("errorAddingImage", { nr: idx + 1 }),
              description: t("errorAddingImageDescription"),
              variant: "destructive",
            });
          }
        }
      }

      onSubmit();
    } catch {
      toast({
        title: t("errorAddingGame"),
        description: t("tryAgain"),
        variant: "destructive",
      });
    }
  };

  return (
    <DialogContent
      className="flex max-w-6xl"
      onCloseAutoFocus={() => {
        form.reset();
        setGame(null);
        setSelectedImages(null);
      }}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="m-4 w-full rounded-md bg-background p-3"
        >
          <div className="flex h-full w-full flex-row gap-4">
            <div className="flex w-[55%] flex-col gap-2">
              <h1 className="mb-2 w-full text-center text-2xl uppercase text-primary">
                {t("yourGameDetails")}
              </h1>
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
                          spellCheck={false}
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
            <Separator orientation="vertical" className="mx-4 h-full rounded-lg bg-primary" />
            <div className="flex flex-grow flex-col justify-between gap-2">
              <h1 className="mb-2 w-full text-center text-2xl uppercase text-primary">
                {t("uploadGamePhotos")}
              </h1>
              <div className="flex w-full flex-grow flex-col gap-4">
                <div>
                  <Label htmlFor="picture">{t("choosePictures")}</Label>
                  <Input
                    id="picture"
                    type="file"
                    multiple
                    accept="image/png, image/jpeg, image/jpg"
                    className="w-full min-w-[100%] max-w-[600px] border-none text-transparent"
                    onChange={handleFileChange}
                    disabled={(selectedImages && selectedImages.length >= 3) ?? false}
                  />
                </div>
                <div className="flex-grow rounded-lg bg-card">
                  <ScrollArea className="h-[500px]">
                    {selectedImages && (
                      <div className="flex flex-col gap-4 p-4">
                        {selectedImages.map((image, idx) => (
                          <div
                            className="h-[250px] w-full overflow-hidden rounded-lg"
                            key={idx + "img"}
                          >
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Selected ${idx + 1}`}
                              className="h-full w-full object-cover object-top"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </div>
              </div>
              <Button type="submit" className="place-self-end px-8">
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
