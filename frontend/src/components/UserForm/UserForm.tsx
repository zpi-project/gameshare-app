import { FC } from "react";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { LatLng } from "leaflet";
import { isValidPhoneNumber } from "libphonenumber-js";
import { useRecoilValue } from "recoil";
import { z } from "zod";
import { locationState } from "@/state/location";
import { NewUser } from "@/types/User";
import { cn } from "@/utils/tailwind";
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
  type: "register" | "update";
  formClassName?: string;
  user?: NewUser;
}

const UserForm: FC<UserFormProps> = ({ onSubmit, type, formClassName, user }) => {
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
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      phoneNumber: user?.phoneNumber ?? "",
    },
  });

  function onFormSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
        className={cn(
          `m-4 rounded-md bg-background p-6  ${type === "register" ? "shadow-lg xl:w-[70%]" : ""}`,
          formClassName,
        )}
      >
        {type === "register" && (
          <>
            <h1 className="mb-4 text-3xl uppercase text-primary">{t("welcomeHeader")}</h1>
            <p className="mb-8 max-w-[900px] text-xl italic">{t("welcomeDescription")}</p>
          </>
        )}
        <div className="flex min-h-[500px] w-full flex-row gap-10">
          <section className="max-w-[500px] flex-grow border-r border-primary pr-10">
            <h2 className="text-2xl uppercase tracking-wider text-primary">
              {type === "register" ? t("fillInPersonalData") : t("editPersonalData")}
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
              <Controller
                name="phoneNumber"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="h-[80px]">
                    <FormLabel
                      className={`${
                        form.formState.errors.phoneNumber?.message ? "text-destructive" : ""
                      }`}
                    >
                      {t("phoneNumber")}
                    </FormLabel>
                    <FormControl>
                      <PhoneInput country={"pl"} value={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage>{form.formState.errors.phoneNumber?.message ?? ""}</FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </section>
          <section className="flex-grow">
            <h2 className="text-2xl uppercase tracking-wider text-primary">
              {type === "register" ? t("markLocation") : t("editLocation")}
            </h2>
            <div className="mt-10 h-[500px] w-full overflow-hidden rounded-md border">
              <Map
                location={[
                  user?.locationLatitude ?? location[0],
                  user?.locationLongitude ?? location[1],
                ]}
              >
                <LocationMarker />
                <LocationButton />
              </Map>
            </div>
            <Button type="submit" className="float-right mt-4">
              {t("submit")}
            </Button>
          </section>
        </div>
      </form>
    </Form>
  );
};

export default UserForm;
