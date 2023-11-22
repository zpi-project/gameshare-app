import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from "lucide-react";
import { URLS } from "@/constants/urls";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Separator } from "@/components/ui/separator";


const errorStatuses = [400, 401, 403, 404, 500, 501, 503, 504];

const Error: FC = () => {
  const error = useRouteError();
  const { t } = useTranslation();
  const isRouteError = isRouteErrorResponse(error);

  const diceComponents: React.ReactNode[] = [
    <></>,
    <Dice1 size={140} strokeWidth={1.2} className="rotate-[16deg]" />,
    <Dice2 size={140} strokeWidth={1.2} className="rotate-[16deg]" />,
    <Dice3 size={140} strokeWidth={1.2} className="rotate-[16deg]" />,
    <Dice4 size={140} strokeWidth={1.2} className="rotate-[16deg]" />,
    <Dice5 size={140} strokeWidth={1.2} className="rotate-[16deg]" />,
    <Dice6 size={140} strokeWidth={1.2} className="rotate-[16deg]" />,
  ];

  return (
    <ThemeProvider storageKey="vite-ui-theme">
      <div className="flex h-screen w-screen bg-background">
        <div
          className="absolute left-8 right-8 top-8 h-1/2 rounded-lg opacity-50 dark:opacity-40"
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgb(133, 43, 130) 100%)`,
          }}
        />
        <div className="m-4 flex flex-grow items-center justify-center rounded-lg bg-section">
          <div className="h-max lg:w-[50%]">
            <div className="flex h-max flex-grow flex-col gap-8 lg:max-w-[70%]">
              {isRouteError ? (
                error.status % 10 > 0 && error.status % 10 <= 6 ? (
                  <h1 className="flex flex-row items-center justify-end gap-1 text-[140px] leading-none text-primary">
                    {error.status.toString().slice(0, 2)}
                    {diceComponents[error.status % 10]}
                  </h1>
                ) : (
                  <h1 className="text-end leading-none text-[80] text-primary lg:text-[140px]">
                    {error.status}
                  </h1>
                )
              ) : (
                <h1 className="text-end text-[140px] leading-none text-primary">{t("error")}</h1>
              )}

              <Separator className="h-2 max-w-[400px] rounded-lg bg-primary xl:max-w-[600px]" />
              <h2 className="text-bold text-3xl">{t("ooops")}</h2>
              <Separator className="h-[3px] max-w-[300px] rounded-lg bg-foreground" />
              <p className="text-2xl">
                {isRouteError
                  ? errorStatuses.includes(error.status)
                    ? t(`errorStatus.${error.status}`)
                    : error.statusText
                  : t("unexpectedError")}
              </p>
              <Link
                to={URLS.DASHBOARD}
                className="w-max rounded-lg bg-primary px-4 py-2 text-xl hover:bg-accent"
              >
                {t("backToHome")}
              </Link>
            </div>
          </div>
        </div>
        <Dice2
          size={50}
          className="absolute bottom-[50%] right-[21%] hidden rotate-[30deg] text-primary md:flex lg:right-[30%] xl:right-[36%]"
        />
        <Dice6
          size={60}
          className="absolute bottom-[47%] right-[12%] hidden rotate-[-20deg] text-primary md:flex lg:right-[20%] xl:right-[32%]"
        />
        <Dice3
          size={65}
          className="absolute bottom-[38%] right-[21%] hidden rotate-[15deg] text-primary md:flex lg:right-[28%] xl:right-[35%]"
        />
        <Dice5
          size={80}
          className="absolute bottom-[34%] right-[11%] hidden rotate-[30deg] text-primary md:flex lg:right-[18%] xl:right-[27%]"
        />
        <Dice4
          size={70}
          className="absolute bottom-[26%] right-[18%] hidden rotate-[20deg] text-primary md:flex lg:right-[22%] xl:right-[30%]"
        />
        <Dice1
          size={85}
          className="absolute bottom-[16%] right-[20%] hidden rotate-[-20deg] text-primary md:flex lg:right-[28%] xl:right-[34%]"
        />
        <Dice6
          size={100}
          className="absolute bottom-[14%] right-[5%] hidden rotate-[-20deg] text-primary md:flex lg:right-[10%] xl:right-[22%]"
        />
      </div>
    </ThemeProvider>
  );
};

export default Error;