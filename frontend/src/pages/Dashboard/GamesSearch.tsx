import { Dispatch, FC, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
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
    select: data => data.map(({ name, id }) => ({ label: name, value: id })),
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
                  <Input
                    placeholder={t("typeToSearch")}
                    {...field}
                    className="border-0 bg-card"
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button size="icon" type="submit" className="bg-card">
            <Search />
          </Button>
        </div>
        <div className="hidden md:flex flex-row flex-wrap space-between gap-3">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="flex-grow flex flex-col">
                <FormLabel>{t("category")}</FormLabel>
                <FormControl>
                  <SelectInput
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
              <FormItem className="flex-grow flex flex-col">
                <FormLabel>{t("pricePerDay")}</FormLabel>
                <FormControl>
                  <SelectInput
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
              <FormItem className="flex-grow flex flex-col">
                <FormLabel>{t("players")}</FormLabel>
                <FormControl>
                  <SelectInput
                    options={PLAYERS_OPTIONS}
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
              <FormItem className="flex-grow flex flex-col">
                <FormLabel>{t("age")}</FormLabel>
                <FormControl>
                  <SelectInput
                    options={AGE_OPTIONS}
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
    </Form>
  );
};

export default GamesSearch;
