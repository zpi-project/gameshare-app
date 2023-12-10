import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { Trash2 } from "lucide-react";
import { z } from "zod";
import { Image } from "@/types/Image";
import { GameInstanceApi } from "@/api/GameInstanceApi";
import Spinner from "@/components/ui/Spinner";
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
import { useToast } from "@/components/ui/use-toast";
import { GameSearchCard } from "../GameSearch";

interface GameEditFormProps {
  id: string;
  userId: string;
  onClose: () => void;
}

const MAX_IMAGE_SIZE = 3 * 1024 * 1024;

const GameEditForm: FC<GameEditFormProps> = ({ id, onClose, userId }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { toast } = useToast();
  const [images, setImages] = useState<{ error: boolean; image: File | Image }[]>([]);
  const queryClient = useQueryClient();

  const formSchema = z.object({
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
        message: t("fieldPositive", { field: t("pricePerDay") }),
      })
      .max(200, { message: t("maxPricePerDay") }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const {
    data: gameInstance,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["gameInstance", { id, language }],
    queryFn: () => GameInstanceApi.getOne(id),
    onSuccess: data => {
      setImages(data.images.map(image => ({ image, error: false })));
      form.setValue("description", data.description);
      form.setValue("pricePerDay", data.pricePerDay);
    },
    refetchOnWindowFocus: false,
  });

  console.log(gameInstance);

  const { mutateAsync: editGame, isLoading: isLoadingEditGame } = useMutation(
    (params: { uuid: string; description: string; pricePerDay: number }) =>
      GameInstanceApi.edit(params.uuid, params.description, params.pricePerDay),
  );

  const { mutateAsync: addImage, isLoading: isLoadingAddImage } = useMutation(
    (params: { uuid: string; file: File }) => GameInstanceApi.addImage(params.uuid, params.file),
  );

  const { mutateAsync: deleteImage, isLoading: isLoadingDeleteImage } = useMutation(
    (imageId: number) => GameInstanceApi.deleteImage(imageId),
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filesList = e.target.files;

    if (filesList) {
      setImages(prevImages => {
        const newImages = Array.from(filesList).map(file => ({
          image: file,
          error: file.size > MAX_IMAGE_SIZE,
        }));
        const updatedImages = prevImages ? [...prevImages, ...newImages] : newImages;
        return updatedImages.slice(0, 3);
      });
    }
  };

  const handleAddImage = async (file: File, gameId: string) => {
    try {
      await addImage({ uuid: gameId, file });
      toast({
        title: t("successAddingSingleImage"),
      });
    } catch (e) {
      if (isAxiosError(e) && e.response?.data?.title === "InvalidFileTypeException") {
        toast({
          title: t("errorAddingSingleImage"),
          description: t("incorrectFileType"),
          variant: "destructive",
        });
      } else {
        toast({
          title: t("errorAddingSingleImage"),
          description: t("errorAddingImageDescription"),
          variant: "destructive",
        });
      }
    }
  };

  const handleDeleteImage = async (imageId: number) => {
    try {
      await deleteImage(imageId);
      toast({
        title: t("successDeteletingImage"),
      });
    } catch {
      toast({
        title: t("errorDeletingImage"),
        description: t("tryRefreshing"),
        variant: "destructive",
      });
    }
  };

  const handleFormSubmit = async (data: { description: string; pricePerDay: number }) => {
    if (!images.find(image => image.error)) {
      {
        try {
          if (
            data.description !== gameInstance?.description ||
            data.pricePerDay !== gameInstance.pricePerDay
          ) {
            await editGame({
              uuid: gameInstance?.uuid ?? "",
              description: data.description,
              pricePerDay: data.pricePerDay,
            });
            toast({ title: t("successEditingGameInstance") });
          }

          const imagesToDelete = (gameInstance?.images || []).filter(
            image => !images.find(img => img.image.name === image.name),
          );
          await Promise.all(imagesToDelete.map(image => handleDeleteImage(image.id)));

          const imagesToAdd = images.filter(image => image.image instanceof File);
          await Promise.all(
            imagesToAdd.map(image => handleAddImage(image.image as File, gameInstance?.uuid ?? "")),
          );

          queryClient.invalidateQueries(["user-game-instances", { uuid: userId, language }]);
          queryClient.invalidateQueries(["gameInstance", { id, language }]);
          onClose();
        } catch {
          toast({ title: t("errorEditingGameInstance"), variant: "destructive" });
          onClose();
        }
      }
    }
  };

  return (
    <DialogContent
      className="flex max-w-6xl"
      data-test="edit-dialog"
      onCloseAutoFocus={() => {
        form.setValue("description", gameInstance?.description ?? "");
        form.setValue("pricePerDay", gameInstance?.pricePerDay ?? 0);
        setImages(gameInstance ? gameInstance.images.map(image => ({ image, error: false })) : []);
      }}
    >
      {isError ? (
        <p
          className="fon-bold h-[740px] w-full pt-10 text-center text-2xl tracking-wide text-destructive"
          data-test="details-error-message"
        >
          {t("gameError")}
        </p>
      ) : (
        <Form {...form}>
          {(isLoading || isLoadingAddImage || isLoadingDeleteImage || isLoadingEditGame) && (
            <Spinner />
          )}
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="m-4 w-full rounded-md bg-background p-3"
          >
            <div className="flex h-full w-full flex-row gap-4">
              <div className="flex w-[55%] flex-col gap-2">
                <h1 className="mb-2 w-full text-center text-2xl uppercase text-primary">
                  {t("editGameData")}
                </h1>
                {gameInstance && <GameSearchCard game={gameInstance.game}></GameSearchCard>}
                <FormField
                  control={form.control}
                  name="pricePerDay"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("provideGamePrice")}</FormLabel>
                      <FormControl>
                        <Input
                          data-test="price-per-day"
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
                            data-test="description-game"
                            placeholder={t("typeHere")}
                            id="message-2"
                            spellCheck={false}
                            className="h-full resize-none"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage data-test="error-description" />
                    </FormItem>
                  )}
                />
              </div>
              <Separator orientation="vertical" className="mx-4 h-full rounded-lg bg-primary" />
              <div className="flex flex-grow flex-col justify-between gap-2">
                <h1 className="mb-2 w-full text-center text-2xl uppercase text-primary">
                  {t("updateImages")}
                </h1>
                <div className="flex w-full flex-grow flex-col gap-4">
                  <div>
                    <Label htmlFor="picture">{t("choosePictures")}</Label>
                    <Input
                      data-test="image-input"
                      id="picture"
                      type="file"
                      multiple
                      accept="image/png, image/jpeg, image/jpg"
                      className="w-full min-w-[100%] max-w-[600px] border-none text-transparent"
                      onChange={handleFileChange}
                      disabled={(images && images.length >= 3) ?? false}
                    />
                  </div>
                  <div className="flex-grow rounded-lg bg-card">
                    <ScrollArea className="h-[500px]">
                      {images && (
                        <div className="flex flex-col gap-4 p-4">
                          {images.map((image, idx) => (
                            <div key={idx + "img"}>
                              {images[idx].error && (
                                <p className="font-bold text-destructive" data-test="img-error">
                                  {t("maxImgSize", { size: 3 })}
                                </p>
                              )}
                              <div className="relative h-[250px] w-full overflow-hidden rounded-lg">
                                <img
                                  src={
                                    image.image instanceof File
                                      ? URL.createObjectURL(image.image)
                                      : image.image.link
                                  }
                                  alt={`Selected ${idx + 1}`}
                                  className="h-full w-full object-cover object-top"
                                  data-test="instance-image"
                                />
                                <Trash2
                                  className="absolute left-0 top-0 h-full w-full bg-none p-[90px] text-destructive opacity-0 duration-300 hover:bg-background/80 hover:opacity-100"
                                  data-test="trash"
                                  size={30}
                                  onClick={() =>
                                    setImages(images.filter((_, index) => index !== idx))
                                  }
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </ScrollArea>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="place-self-end px-8"
                  data-test="edit-submit-button"
                >
                  {t("submit")}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      )}
    </DialogContent>
  );
};

export default GameEditForm;
