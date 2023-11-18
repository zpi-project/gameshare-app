import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Game } from "@/types/Game";
import { GameInstance } from "@/types/GameInstance";
import { Button } from "@/components/ui/button";
import { DialogContent } from "@/components/ui/dialog";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import GameSearchBar from "./GameSearchBar";
import GameSearchCard from "./GameSearchCard";
import { Textarea } from "./ui/textarea";

// interface GameInstanceFormProps {
//   onSubmit: (gameInstance: GameInstance) => void;
// }

const formSchema = z.object({
  gameTitle: z.string().min(2),
  description: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function GameInstanceForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gameTitle: "",
      description: "",
    },
  });

  const [game, setGame] = useState<Game | null>(null);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <DialogContent className="flex max-w-7xl">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="m-4 w-full rounded-md bg-background p-3 shadow-lg"
        >
          <div className="flex w-full flex-row gap-4">
            <div className="flex w-1/2 flex-col gap-2">
              <h1 className="w-full text-center text-2xl">YOUR GAME DETAILS</h1>
              <FormField
                control={form.control}
                name="gameTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <GameSearchBar
                        onGameClick={(game: Game) => {
                          field.onChange(game.name), setGame(game);
                        }}
                        placeholder="searchGamePlaceholder"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {game && <GameSearchCard game={game}></GameSearchCard>}

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="grid h-[370px] w-full gap-2.5 rounded-lg bg-card p-4">
                        <h1 className="text-primary">Add game description</h1>
                        <Textarea
                          placeholder="Type your message here."
                          id="message-2"
                          className="h-[300px]"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Separator orientation="vertical" className="h-full w-2 bg-card" />
            <div className="flex w-full flex-col justify-between">
              <h1 className="w-full text-center text-2xl">UPLOAD YOUR GAME PHOTOS</h1>
              <div className="h-4/5">Place to upload images</div>
              <Button type="submit" className="w-1/5 place-self-end">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}
