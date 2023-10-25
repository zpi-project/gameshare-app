import { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Map from "../Map";
import LocationMarker from "../Map/LocationMarker";

interface UserFormProps {
  onSubmit: () => void;
}

const UserForm: FC<UserFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation();

  const formSchema = z.object({
    firstName: z.string().min(1, {
      message: t("fieldIsRequired", { field: `${t("firstName")}` }),
    }),
    lastName: z.string().min(1, {
      message: t("fieldIsRequired", { field: `${t("lastName")}` }),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
    },
  });

  function onFormSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    onSubmit();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onFormSubmit)}
        className="flex min-h-[500px] flex-row gap-10 rounded-md bg-background p-6 shadow-lg m-4"
      >
        <section className="border-r border-primary pr-10">
          <h2 className="text-2xl uppercase tracking-wider text-primary">
            {t("fillInPersonalData")}
          </h2>
          <div className="my-10 flex flex-col gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("firstName")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("firstName")}
                      {...field}
                      className="border-0 bg-section"
                      autoComplete="false"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("lastName")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("lastName")} {...field} autoComplete="false"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("lastName")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("lastName")} {...field} autoComplete="false"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>
        <section>
          <h2 className="text-2xl uppercase tracking-wider text-primary">{t("markLocation")}</h2>
          <div className="mt-10 h-[500px] w-full overflow-hidden rounded-md border">
            <Map>
              <LocationMarker />
            </Map>
          </div>
          <Button type="submit" className="mt-4 float-right">
            Submit
          </Button>
        </section>
      </form>
    </Form>
  );
};

export default UserForm;
