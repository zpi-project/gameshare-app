import { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";


const UserForm: FC = () => {
  const { t } = useTranslation();
  const formSchema = z.object({
    firstName: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-row gap-10 rounded-md bg-section p-4 shadow-lg"
      >
        <section className="border-r border-primary pr-10">
          <h2 className="text-2xl uppercase tracking-wider text-primary">
            {t("fillInPersonalData")}
          </h2>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
        <section>
          <h2 className="text-2xl uppercase tracking-wider text-primary">{t("markLocation")}</h2>
          <Button type="submit">Submit</Button>
        </section>
      </form>
    </Form>
  );
};

export default UserForm;