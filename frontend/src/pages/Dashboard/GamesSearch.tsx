import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { Search, X } from "lucide-react";
import { z } from "zod";
import { GameInstanceSearchParams } from "@/types/GameInstance";
import { CategoryApi } from "@/api/CategoryApi";
import SelectInput from "@/components/SelectInput";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Form,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AGE_OPTIONS, PLAYERS_OPTIONS, PRICE_PER_DAY_OPTIONS } from "./options";

interface GamesSearchProps {
  onSubmit: Dispatch<SetStateAction<GameInstanceSearchParams>>;
}

const GamesSearch: FC<GamesSearchProps> = ({ onSubmit }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const { data: categories } = useQuery({
    queryKey: ["categories", { language }],
    queryFn: CategoryApi.getAll,
    select: data =>
      data
        .map(({ name, id }) => ({ label: name, value: id }))
        .sort((a, b) => {
          return a.label.toLowerCase().localeCompare(b.label.toLowerCase());
        }),
  });

  const formSchema = z.object({
    searchName: z.string().optional(),
    categoryId: z.number().optional(),
    maxPricePerDay: z.number().optional(),
    playersNumber: z.number().optional(),
    age: z.number().optional(),
  });

  const form = useForm<GameInstanceSearchParams>({
    resolver: zodResolver(formSchema),
  });

  const categoryId = form.watch("categoryId");
  const maxPricePerDay = form.watch("maxPricePerDay");
  const playersNumber = form.watch("playersNumber");
  const age = form.watch("age");
  const name = form.watch("searchName");

  useEffect(() => {
    onSubmit(form.getValues());
  }, [categoryId, maxPricePerDay, playersNumber, age, onSubmit, form]);

  const resetFilters = () => {
    form.setValue("categoryId", undefined);
    form.setValue("maxPricePerDay", undefined);
    form.setValue("playersNumber", undefined);
    form.setValue("age", undefined);
  };

  const showResetFilters = categoryId ?? maxPricePerDay ?? playersNumber ?? age;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div className="flex w-full flex-row gap-3">
          <FormField
            control={form.control}
            name="searchName"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder={t("typeToSearch")}
                      {...field}
                      className="border-0 bg-card"
                      autoComplete="off"
                    />
                    {name && (
                      <Button
                        size="icon"
                        className="absolute right-0 top-0 hover:bg-transparent hover:text-primary"
                        variant="ghost"
                        type="button"
                        onClick={() => {
                          form.setValue("searchName", "");
                          onSubmit(form.getValues());
                        }}
                      >
                        <X size={20} />
                      </Button>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="flex gap-2 bg-card">
            <span>{t("search")}</span>
            <Search size={20} />
          </Button>
        </div>
        <p className="mt-2 text-xl font-bold">{t("filters")}</p>
        <div className="space-between hidden flex-row flex-wrap gap-3 md:flex">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="flex flex-grow flex-col">
                <FormLabel>{t("category")}</FormLabel>
                <FormControl>
                  <SelectInput
                    value={field.value?.toString()}
                    options={categories ?? []}
                    placeholder={t("all")}
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
            name="maxPricePerDay"
            render={({ field }) => (
              <FormItem className="flex flex-grow flex-col">
                <FormLabel>{t("pricePerDay")}</FormLabel>
                <FormControl>
                  <SelectInput
                    value={field.value?.toString()}
                    options={PRICE_PER_DAY_OPTIONS}
                    placeholder={t("any", { context: "female" })}
                    noResultsInfo={t("noResults")}
                    onChange={field.onChange}
                    width="w-[150px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="playersNumber"
            render={({ field }) => (
              <FormItem className="flex flex-grow flex-col">
                <FormLabel>{t("players")}</FormLabel>
                <FormControl>
                  <SelectInput
                    options={PLAYERS_OPTIONS}
                    value={field.value?.toString()}
                    placeholder={t("any", { context: "female" })}
                    noResultsInfo={t("noResults")}
                    onChange={field.onChange}
                    width="w-[150px]"
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
              <FormItem className="flex flex-grow flex-col">
                <FormLabel>{t("age")}</FormLabel>
                <FormControl>
                  <SelectInput
                    options={AGE_OPTIONS}
                    value={field.value?.toString()}
                    placeholder={t("any", { context: "male" })}
                    noResultsInfo={t("noResults")}
                    onChange={field.onChange}
                    width="w-[130px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
      <div className="h-10">
        {showResetFilters && (
          <Button
            type="button"
            className="ml-auto flex w-36 gap-1 px-1 text-sm text-foreground/70 hover:bg-transparent hover:text-primary"
            variant="ghost"
            onClick={resetFilters}
          >
            <span>{t("clearFilters")}</span>
            <X size={16} />
          </Button>
        )}
      </div>
      <p className="text-xl font-bold">{t("results")}</p>
      <Separator className="h-0.5 w-full bg-muted" />
    </Form>
  );
};

export default GamesSearch;
