import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Game } from "@/types/Game";
import { NewGameInstance } from "@/types/GameInstance";
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

interface GameInstanceFormProps {
  onSubmit: (gameInstance: NewGameInstance) => void;
}

const formSchema = z.object({
  gameId: z.number(),
  description: z
    .string()
    .min(2, {
      message: "Description must be at least 2 characters.",
    })
    .max(500, { message: "Description must be less then 500 characters." }),
  pricePerDay: z.number(),
});

const GameInstanceForm: FC<GameInstanceFormProps> = ({ onSubmit }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
    },
  });

  const [game, setGame] = useState<Game | null>(null);

  return (
    <DialogContent className="flex max-w-7xl">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="m-4 w-full rounded-md bg-background p-3 shadow-lg"
        >
          <div className="flex h-full w-full flex-row gap-4">
            <div className="flex w-1/2 flex-col gap-2">
              <h1 className="w-full text-center text-2xl">YOUR GAME DETAILS</h1>
              <FormField
                control={form.control}
                name="gameId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <GameSearchBar
                        onGameClick={(game: Game) => {
                          field.onChange(game.id), setGame(game);
                        }}
                        placeholder="Search game title..."
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
                    <FormControl>
                      <Input
                        {...field}
                        onChange={e => {
                          const value = parseFloat(e.target.value); // Convert the string to a floating-point number
                          field.onChange(isNaN(value) ? "" : value); // Check for NaN and update the field value accordingly
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
            <Separator orientation="vertical" className="h-full w-1.5 rounded-lg bg-card" />
            <div className="flex w-1/2 flex-col justify-between">
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
};

export default GameInstanceForm;
