import { FC, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { ChevronLeft, ChevronRight, FileUp, X } from "lucide-react";
import { useRecoilValue } from "recoil";
import { z } from "zod";
import { roleState } from "@/state/role";
import { NewGame } from "@/types/Game";
import { cn } from "@/utils/tailwind";
import { CategoryApi } from "@/api/CategoryApi";
import { GameApi } from "@/api/GameApi";
import Spinner from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { TimeBadge, PlayersBadge, AgeBadge } from "./Badge";
import Dropzone from "./Dropzone";
import SelectCategory from "./SelectCategory";
import { Badge } from "./ui/badge";

const MAX_IMAGE_SIZE = 3 * 1024 * 1024;

interface AddGameFormProps {
  close: () => void;
}

const AddGameForm: FC<AddGameFormProps> = ({ close }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageSizeError, setImageSizeError] = useState(false);
  const [imageRequiredError, setImageRequiredError] = useState(false);
  const [step, setStep] = useState(0);

  const { data: categories } = useQuery({
    queryKey: ["categories", { language }],
    queryFn: CategoryApi.getAll,
    select: data => data.map(({ name, id }) => ({ label: name, value: id })),
  });
  const role = useRecoilValue(roleState);

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
        invalid_type_error: t("numberTypeError", { field: t("minPlayers") }),
      })
      .int({
        message: t("intTypeError", { field: t("minPlayers") }),
      })
      .positive({
        message: t("fieldPositive", { field: t("minPlayers") }),
      }),
    maxPlayers: z.coerce
      .number({
        invalid_type_error: t("numberTypeError", { field: t("maxPlayers") }),
      })
      .int({
        message: t("intTypeError", { field: t("maxPlayers") }),
      })
      .positive({
        message: t("fieldPositive", { field: t("maxPlayers") }),
      }),
    playingTime: z.coerce
      .number({
        invalid_type_error: t("numberTypeError", { field: t("playingTime") }),
      })
      .int({
        message: t("intTypeError", { field: t("playingTime") }),
      })
      .positive({
        message: t("fieldPositive", { field: t("playingTime") }),
      }),
    age: z.coerce
      .number({
        invalid_type_error: t("numberTypeError", { field: t("age"), context: "female" }),
      })
      .int({
        message: t("intTypeError", { field: t("age") }),
      })
      .positive({
        message: t("fieldPositive", { field: t("age") }),
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      shortDescription: "",
      minPlayers: 0,
      maxPlayers: 0,
      playingTime: 0,
      age: 0,
      categoriesIDs: [],
    },
  });

  const selectedCategoriesIDs = form.watch("categoriesIDs");

  const selectedCategories = useMemo(() => {
    return categories?.filter(category => selectedCategoriesIDs.includes(category.value)) ?? [];
  }, [categories, selectedCategoriesIDs]);

  const { mutateAsync: addGame, isLoading: isLoadingGame } = useMutation({
    mutationFn: (game: NewGame) => GameApi.create(game),
  });

  const { mutateAsync: addImage, isLoading: isLoadingImage } = useMutation(
    (params: { gameId: number; file: File }) => GameApi.addImage(params.gameId, params.file),
  );

  const handleFormSubmit = async (data: NewGame) => {
    if (!selectedImage) {
      setImageRequiredError(true);
    }
    if (!imageSizeError && selectedImage) {
      try {
        const newGame = await addGame(data);
        toast({
          title: t(role === "admin" ? "successAddingNewGameAdmin" : "successAddingNewGame"),
        });

        try {
          if (selectedImage) {
            await addImage({ gameId: newGame.id, file: selectedImage });
            toast({
              title: t("successAddingSingleImage"),
            });
          }
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
        close();
      } catch (e) {
        if (isAxiosError(e) && e.response?.data?.title === "GameAlreadyExistsException") {
          toast({
            title: t("errorAddingNewGame"),
            description: t("gameAlreadyExists"),
            variant: "destructive",
          });
        } else {
          toast({
            title: t("errorAddingGame"),
            description: t("tryAgain"),
            variant: "destructive",
          });
        }
      }
    }
  };

  const onFileChange = (droppedFiles: FileList | null) => {
    if (!droppedFiles) return;
    Array.from(droppedFiles).map(file => {
      if (file.size > MAX_IMAGE_SIZE) {
        setImageSizeError(true);
      } else {
        setImageSizeError(false);
      }
      setImageRequiredError(false);
      setSelectedImage(file);
    });
  };

  const removeCategory = (id: number) => {
    form.setValue(
      "categoriesIDs",
      selectedCategoriesIDs.filter(categoryID => categoryID !== id),
    );
    form.trigger("categoriesIDs");
  };

  return (
    <DialogContent
      onCloseAutoFocus={() => {
        form.reset();
        setImageSizeError(false);
        setSelectedImage(null);
      }}
    >
      {(isLoadingGame || isLoadingImage) && <Spinner />}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="m-4 rounded-md bg-background p-3"
        >
          <div className="flex h-full w-full flex-row gap-4">
            {step === 0 ? (
              <div className="flex w-full flex-col gap-4">
                <h1 className="mb-2 flex items-center gap-4 text-2xl uppercase text-primary">
                  <div className="h-10 w-10 rounded-full bg-primary p-1 text-center text-white dark:text-black">
                    1
                  </div>
                  <span>{t("filGameDetails")}</span>
                </h1>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormLabel>{t("gameName")} *</FormLabel>
                      <FormControl>
                        <Input
                          className="border-none"
                          spellCheck={false}
                          {...field}
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="categoriesIDs"
                  render={({ field }) => (
                    <FormItem className="mt-1.5 flex flex-col gap-1">
                      <FormLabel>{t("categories")} *</FormLabel>
                      <FormControl>
                        <SelectCategory
                          options={categories ?? []}
                          value={field.value}
                          width="w-full"
                          placeholder={t("chooseCategories")}
                          noResultsInfo={t("noResults")}
                          onChange={(values: number[]) => {
                            form.setValue("categoriesIDs", values);
                            form.trigger("categoriesIDs");
                          }}
                          scroll
                          search
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-wrap gap-1">
                  {selectedCategories.map(({ value, label }) => (
                    <Badge key={value} variant="secondary" className="h-8">
                      <span className="mr-1">{label}</span>
                      <X
                        size={14}
                        strokeWidth={3}
                        className="cursor-pointer transition-all duration-100 hover:text-red-500"
                        onClick={() => removeCategory(value)}
                      />
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-row gap-4">
                  <FormField
                    control={form.control}
                    name="playingTime"
                    render={({ field }) => (
                      <FormItem className="flex-grow">
                        <FormLabel>{t("playingTime")} *</FormLabel>
                        <FormControl>
                          <Input className="border-none" {...field} autoComplete="off" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem className="flex-grow">
                        <FormLabel>{t("age")} *</FormLabel>
                        <FormControl>
                          <Input className="border-none" {...field} autoComplete="off" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-row gap-4">
                  <FormField
                    control={form.control}
                    name="minPlayers"
                    render={({ field }) => (
                      <FormItem className="w-1/2 flex-grow">
                        <FormLabel>{t("minPlayers")} *</FormLabel>
                        <FormControl>
                          <Input className="border-none" {...field} autoComplete="off" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="maxPlayers"
                    render={({ field }) => (
                      <FormItem className="w-1/2 flex-grow">
                        <FormLabel>{t("maxPlayers")} *</FormLabel>
                        <FormControl>
                          <Input className="border-none" {...field} autoComplete="off" />
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
                      <FormLabel>{t("gameDescription")} *</FormLabel>
                      <FormControl>
                        <div className="grid w-full gap-2.5 rounded-lg bg-card p-4">
                          <Textarea
                            placeholder={t("typeHere")}
                            id="message-2"
                            spellCheck={false}
                            className="h-full resize-none"
                            {...field}
                            autoComplete="off"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="ml-auto w-max"
                  onClick={() => form.trigger().then(() => form.formState.isValid && setStep(1))}
                >
                  <span className="mr-4">{t("next")}</span>
                  <ChevronRight size={20} />
                </Button>
              </div>
            ) : step === 1 ? (
              <div className="flex flex-grow flex-col justify-between gap-2">
                <h1 className="mb-2 flex w-full items-center gap-4 text-2xl uppercase text-primary">
                  <div className="h-10 w-10 rounded-full bg-primary p-1 text-center text-white dark:text-black">
                    2
                  </div>
                  <span>{t("uploadGamePhoto")}</span>
                </h1>
                <div className="flex w-full flex-grow flex-col gap-4">
                  <div>
                    <Label
                      htmlFor="picture"
                      className={imageRequiredError ? "text-destructive" : ""}
                    >
                      {t("choosePicture")} *
                    </Label>
                    <Dropzone
                      dropMessage={
                        <div className="flex flex-col items-center justify-center gap-2">
                          <p className="flex flex-col text-center">
                            <span className="mr-1 text-primary underline">
                              {t("clickToUpload")}
                            </span>
                            <span>{t("orDragAndDrop")}</span>
                          </p>
                          <p className="text-sm opacity-60">{t("allowedFormats")}</p>
                        </div>
                      }
                      handleOnDrop={onFileChange}
                      classNameWrapper={cn(
                        "px-2 py-2 mb-12 bg-background",
                        isLoadingImage && "opacity-50 pointer-events-none",
                      )}
                      icon={<FileUp className="mb-1 text-primary" />}
                    />
                    <p className="text-destructive">
                      {imageSizeError && t("maxImgSize", { size: 3 })}
                    </p>
                  </div>
                  <div className="flex flex-grow flex-col gap-4 rounded-lg bg-card p-4">
                    {selectedImage && (
                      <div className="relative h-[380px] w-full overflow-hidden rounded-lg">
                        <img
                          src={URL.createObjectURL(selectedImage)}
                          alt="Selected image"
                          className="h-full w-full object-cover object-top"
                        />
                        <X
                          className="absolute left-0 top-0 h-full w-full bg-none p-32 p-[90px] text-destructive opacity-0 duration-150 hover:bg-background/80 hover:opacity-100"
                          data-test="trash"
                          size={20}
                          onClick={() => setSelectedImage(null)}
                        />
                      </div>
                    )}
                    <div className="mt-auto flex items-center justify-between">
                      <Button onClick={() => setStep(0)}>
                        <ChevronLeft size={20} />
                        <span className="ml-2">{t("back")}</span>
                      </Button>
                      <Button onClick={() => setStep(2)} className="ml-auto mt-auto w-max px-8">
                        {t("next")}
                        <ChevronRight size={20} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-grow flex-col justify-between gap-2">
                <h1 className="mb-2 flex w-full items-center gap-4 text-2xl uppercase text-primary">
                  <div className="h-10 w-10 rounded-full bg-primary p-1 text-center text-white dark:text-black">
                    3
                  </div>
                  <span>{t("summary")}</span>
                </h1>
                <p className="text-xl">{form.getValues("name")}</p>
                <div className="relative h-[380px] w-full overflow-hidden rounded-lg">
                  {selectedImage && (
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Selected image"
                      className="h-full w-full object-cover object-top"
                    />
                  )}
                </div>
                <div className="flex w-full flex-grow flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap gap-1">
                      {selectedCategories.map(({ value, label }) => (
                        <Badge key={value} variant="default" className="h-8">
                          <span className="mr-1">{label}</span>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-row flex-wrap gap-1" data-test="badges">
                      <TimeBadge time={form.getValues("playingTime")} />
                      <PlayersBadge
                        minPlayers={form.getValues("minPlayers")}
                        maxPlayers={form.getValues("maxPlayers")}
                      />
                      <AgeBadge age={Number(form.getValues("age"))} />
                    </div>
                    <p className="my-2">{form.getValues("shortDescription")}</p>
                  </div>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <Button onClick={() => setStep(1)}>
                    <ChevronLeft size={20} />
                    <span className="ml-2">{t("back")}</span>
                  </Button>
                  <Button type="submit" className="ml-auto mt-auto w-max px-8">
                    {t("save")}
                    <ChevronRight size={20} />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};

export default AddGameForm;
