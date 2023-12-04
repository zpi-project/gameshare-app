import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { z } from "zod";
import { NewGame } from "@/types/Game";
import { CategoryApi } from "@/api/CategoryApi";
import { GameApi } from "@/api/GameApi";
import { DialogContent } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import SelectMultiple from "../SelectMultiple";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";

const AddGameForm: FC = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const { data: categories } = useQuery({
    queryKey: ["categories", { language }],
    queryFn: CategoryApi.getAll,
    select: data => data.map(({ name, id }) => ({ label: name, value: id })),
  });

  const formSchema = z.object({
    categoriesIDs: z.number().array(),
    name: z
      .string({ required_error: t("fieldIsRequired", { field: t("gameName"), context: "female" }) })
      .trim()
      .min(1, {
        message: t("fieldIsRequired", { field: t("gameName"), context: "female" }),
      })
      .max(200, { message: t("maxCharCount", { field: t("gameName"), length: 200 }) }),
    shortDescription: z
      .string({
        required_error: t("fieldIsRequired", { field: t("gameDescription"), context: "female" }),
      })
      .trim()
      .min(1, {
        message: t("fieldIsRequired", { field: t("gameDescription"), context: "male" }),
      })
      .max(1000, { message: t("maxCharCount", { field: t("gameDescription"), length: 1000 }) }),
    minPlayers: z.coerce
      .number({
        invalid_type_error: t("fieldIsRequired", { field: t("pricePerDay"), context: "female" }),
      })
      .positive({
        message: t("minPricePerDay"),
      }),
    maxPlayers: z.coerce
      .number({
        invalid_type_error: t("fieldIsRequired", { field: t("pricePerDay"), context: "female" }),
      })
      .positive({
        message: t("minPricePerDay"),
      }),
    playingTime: z.coerce
      .number({
        invalid_type_error: t("fieldIsRequired", { field: t("pricePerDay"), context: "female" }),
      })
      .int()
      .positive({
        message: t("minPricePerDay"),
      }),
    age: z.coerce
      .number({
        invalid_type_error: t("fieldIsRequired", { field: t("pricePerDay"), context: "female" }),
      })
      .int()
      .positive({
        message: t("minPricePerDay"),
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { mutateAsync: addGame } = useMutation({
    mutationFn: (game: NewGame) => GameApi.create(game),
  });

  const { mutateAsync: addImage } = useMutation((params: { gameId: number; file: File }) =>
    GameApi.addImage(params.gameId, params.file),
  );

  const handleFormSubmit = async (data: NewGame) => {
    try {
      const newGame = await addGame(data);

      toast({
        title: t("gameAdded"),
      });

      try {
        if (selectedImage) {
          await addImage({ gameId: newGame.id, file: selectedImage });
          toast({
            title: t("successAddingImage"),
          });
        }
      } catch (e) {
        if (isAxiosError(e) && e.response?.data?.title === "InvalidFileTypeException") {
          toast({
            title: t("errorAddingImage"),
            description: t("incorrectFileType"),
            variant: "destructive",
          });
        } else {
          toast({
            title: t("errorAddingImage"),
            description: t("errorAddingImageDescription"),
            variant: "destructive",
          });
        }
      }
    } catch {
      toast({
        title: t("errorAddingGame"),
        description: t("tryAgain"),
        variant: "destructive",
      });
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filesList = e.target.files;
    if (filesList && filesList[0]) {
      setSelectedImage(filesList[0]);
    }
  };

  return (
    <DialogContent
      className="flex max-w-6xl"
      onCloseAutoFocus={() => {
        form.reset();
        setSelectedImage(null);
      }}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="m-4 w-full rounded-md bg-background p-3"
        >
          <div className="flex h-full w-full flex-row gap-4">
            <div className="flex w-[55%] flex-col gap-2">
              <h1 className="mb-2 w-full text-2xl uppercase text-primary">{t("filGameDetails")}</h1>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("gameName")}</FormLabel>
                    <FormControl>
                      <Input className="border-none" spellCheck={false} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row gap-2">
                <FormField
                  control={form.control}
                  name="categoriesIDs"
                  render={({ field }) => (
                    <FormItem className="mt-1.5 flex flex-col gap-1">
                      <FormLabel>{t("categories")}</FormLabel>
                      <FormControl>
                        <SelectMultiple
                          options={categories ?? []}
                          width="w-[280px]"
                          placeholder={t("chooseCategories")}
                          noResultsInfo={t("noResults")}
                          onChange={field.onChange}
                          scroll
                          search
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="playingTime"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormLabel>{t("playingTime")}</FormLabel>
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
              </div>
              <div className="flex flex-row gap-2">
                <FormField
                  control={form.control}
                  name="minPlayers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("minPlayers")}</FormLabel>
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
                  name="maxPlayers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("maxPlayers")}</FormLabel>
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
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("age")}</FormLabel>
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
              </div>
              <FormField
                control={form.control}
                name="shortDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("gameDescription")}</FormLabel>
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
              <h1 className="mb-2 w-full text-2xl uppercase text-primary">
                {t("uploadGamePhoto")}
              </h1>
              <div className="flex w-full flex-grow flex-col gap-4">
                <div>
                  <Label htmlFor="picture">{t("choosePicture")}</Label>
                  <Input
                    id="picture"
                    type="file"
                    multiple
                    accept="image/png, image/jpeg, image/jpg"
                    className="w-full min-w-[100%] max-w-[600px] border-none text-transparent"
                    onChange={onFileChange}
                  />
                </div>
                <div className="flex flex-grow flex-col gap-4 rounded-lg bg-card p-4">
                  {selectedImage && (
                    <div className="h-[380px] w-full overflow-hidden rounded-lg">
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt={`Selected image`}
                        className="h-full w-full object-cover object-top"
                      />
                    </div>
                  )}
                  <Button type="submit" className="ml-auto mt-auto w-max px-8">
                    {t("submit")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};

export default AddGameForm;
