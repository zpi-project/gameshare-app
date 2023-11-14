import { Dispatch, FC, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { z } from "zod";
import { GameInstanceSearchParams } from "@/types/GameInstance";
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

interface GamesSearchProps {
  onSubmit: Dispatch<SetStateAction<GameInstanceSearchParams>>;
}

const GamesSearch: FC<GamesSearchProps> = ({ onSubmit }) => {
  const { t } = useTranslation();

  const formSchema = z.object({
    searchName: z.string(),
    categoryId: z.number().optional(),
    maxPricePerDay: z.number().optional(),
    playersNumber: z.number().optional(),
    age: z.number().optional(),
  });

  const form = useForm<GameInstanceSearchParams>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchName: "",
    },
  });

  function onFormSubmit(values: GameInstanceSearchParams) {
    console.log(values);
    onSubmit(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="flex flex-col gap-3">
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
                    autoComplete="false"
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
        <div className="flex flex-row gap-3">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormLabel>{t("category")}</FormLabel>
                <FormControl>
                  <Input {...field} className="border-0 bg-card" autoComplete="false" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxPricePerDay"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormLabel>{t("pricePerDay")}</FormLabel>
                <FormControl>
                  <Input {...field} className="border-0 bg-card" autoComplete="false" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="playersNumber"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormLabel>{t("players")}</FormLabel>

                <FormControl>
                  <Input {...field} className="border-0 bg-card" autoComplete="false" />
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
                <FormLabel>{t("category")}</FormLabel>

                <FormControl>
                  <Input {...field} className="border-0 bg-card" autoComplete="false" />
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
