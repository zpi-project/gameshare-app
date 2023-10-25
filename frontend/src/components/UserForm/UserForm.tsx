import { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { isValidPhoneNumber } from "libphonenumber-js";
import { useRecoilValue } from "recoil";
import { z } from "zod";
import { locationState } from "@/state/location";
import { NewUser } from "@/types/User";
import { Map, LocationMarker, LocationButton } from "@/components/Map";
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
import "./UserForm.css";

interface UserFormProps {
  onSubmit: (user: NewUser) => void;
}

const UserForm: FC<UserFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation();
  const location = useRecoilValue(locationState) as number[];

  const formSchema = z.object({
    firstName: z.string().min(1, {
      message: t("fieldIsRequired", { field: `${t("firstName")}` }),
    }),
    lastName: z.string().min(1, {
      message: t("fieldIsRequired", { field: `${t("lastName")}` }),
    }),
    phoneNumber: z.string().refine(phoneNumber => isValidPhoneNumber("+" + phoneNumber), {
      message: t("phoneNumberIsInvalid"),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
  });

  function onFormSubmit(values: z.infer<typeof formSchema>) {
    onSubmit({
      ...values,
      phoneNumber: `+${values.phoneNumber}`,
      locationLatitude: location[0],
      locationLongitude: location[1],
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onFormSubmit)}
        className="m-4 flex min-h-[500px] flex-row gap-10 rounded-md bg-background p-6 shadow-lg"
      >
        <section className="border-r border-primary pr-10">
          <h2 className="text-2xl uppercase tracking-wider text-primary">
            {t("fillInPersonalData")}
          </h2>
          <div className="my-10 flex flex-col gap-3">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="h-[80px]">
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
                <FormItem className="h-[80px]">
                  <FormLabel>{t("lastName")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("lastName")}
                      {...field}
                      autoComplete="false"
                      className="border-0 bg-section"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="h-[80px]">
                  <FormLabel>{t("phoneNumber")}</FormLabel>
                  <FormControl>
                    <PhoneInput country={"pl"} {...field} />
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
              <LocationButton />
            </Map>
          </div>
          <Button type="submit" className="float-right mt-4">
            {t("submit")}
          </Button>
        </section>
      </form>
    </Form>
  );
};

export default UserForm;
