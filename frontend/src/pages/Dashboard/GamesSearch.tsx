import { Dispatch, FC, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { GameInstanceSearchParams } from "@/types/GameInstance";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";

interface GamesSearchProps {
  onSubmit: Dispatch<SetStateAction<GameInstanceSearchParams>>;
}

const GamesSearch: FC<GamesSearchProps> = ({ onSubmit }) => {
  const formSchema = z.object({
    searchName: z.string(),
    categoryId: z.number(),
    maxPricePerDay: z.number(),
    playersNumber: z.number(),
    age: z.number(),
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
      <form onSubmit={form.handleSubmit(onFormSubmit)} className=""></form>
    </Form>
  );
};

export default GamesSearch;
