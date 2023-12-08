import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
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
  onClose: () => void;
}

const GameEditForm: FC<GameEditFormProps> = ({ id, onClose }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { toast } = useToast();
  const [images, setImages] = useState<{ error: boolean; image: File | Image }[]>([]);

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
    onError: () => {
      toast({
        title: t("gameError"),
        description: t("tryRefreshing"),
        variant: "destructive",
      });
      onClose();
    },
    onSuccess: data => {
      setImages(data.images.map(image => ({ image, error: false })));
      form.setValue("description", data.description);
      form.setValue("pricePerDay", data.pricePerDay);
    },
    refetchOnWindowFocus: false,
  });

  const { mutateAsync: editGame, isLoading: isLoadingEditGame } = useMutation(
    (params: { uuid: string; description: string; pricePerDay: number }) =>
      GameInstanceApi.edit(params.uuid, params.description, params.pricePerDay),
  );

  const { mutateAsync: addImage, isLoading: isLoadingAddImage } = useMutation(
    (params: { uuid: string; file: File }) => GameInstanceApi.addImage(params.uuid, params.file),
    {
      onSuccess: () => {
        toast({
          title: "success",
        });
      },
      onError: () => {
        toast({
          title: "error",
        });
      },
    },
  );

  const { mutateAsync: deleteImage, isLoading: isLoadingDeleteImage } = useMutation(
    (uuid: string) => GameInstanceApi.deleteImage(uuid),
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filesList = e.target.files;

    if (filesList) {
      setImages(prevImages => {
        const newImages = Array.from(filesList).map(file => ({ image: file, error: false }));
        const updatedImages = prevImages ? [...prevImages, ...newImages] : newImages;
        return updatedImages.slice(0, 3);
      });
    }
  };

  const handleFormSubmit = async (data: { description: string; pricePerDay: number }) => {
    if (
      data.description !== gameInstance?.description ||
      data.pricePerDay !== gameInstance.pricePerDay
    ) {
      try {
        editGame({
          uuid: gameInstance?.uuid ?? "",
          description: data.description,
          pricePerDay: data.pricePerDay,
        });
      } catch {
        //
      }
    }
    const imagesToDelete = (gameInstance?.images || []).filter(
      image => !images.find(img => img.image.name === image.name),
    );
    console.log("to delete", imagesToDelete);

    const imagesToAdd = images.filter(image => image.image instanceof File);
    console.log("to add", imagesToAdd);
  };

  return (
    <DialogContent
      className="flex max-w-6xl"
      onCloseAutoFocus={() => {
        form.setValue("description", gameInstance?.description ?? "");
        form.setValue("pricePerDay", gameInstance?.pricePerDay ?? 0);
        setImages(gameInstance ? gameInstance.images.map(image => ({ image, error: false })) : []);
      }}
    >
      <Form {...form}>
        {isLoading && <Spinner />}
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="m-4 w-full rounded-md bg-background p-3"
        >
          <div className="flex h-full w-full flex-row gap-4">
            <div className="flex w-[55%] flex-col gap-2">
              <h1 className="mb-2 w-full text-center text-2xl uppercase text-primary">
                {t("yourGameDetails")}
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
                    disabled={(images && images.length >= 3) ?? false}
                  />
                </div>
                <div className="flex-grow rounded-lg bg-card">
                  <ScrollArea className="h-[500px]">
                    {images && (
                      <div className="flex flex-col gap-4 p-4">
                        {images.map((image, idx) => (
                          <div key={idx + "img"}>
                            <p className="font-bold text-destructive">
                              {images[idx].error && t("maxImgSize", { size: 3 })}
                            </p>
                            <div className="relative h-[250px] w-full overflow-hidden rounded-lg">
                              <img
                                src={
                                  image.image instanceof File
                                    ? URL.createObjectURL(image.image)
                                    : image.image.link
                                }
                                alt={`Selected ${idx + 1}`}
                                className="h-full w-full object-cover object-top"
                              />
                              <Trash2
                                className="absolute left-0 top-0 h-full w-full bg-none p-[90px] text-destructive opacity-0 duration-300 hover:bg-background/80 hover:opacity-100"
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

export default GameEditForm;
