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
    <Dice1 size={96} />,
    <Dice2 />,
    <Dice3 />,
    <Dice4 size={140} strokeWidth={1.2} className="rotate-[16deg]" />,
    <Dice5 />,
    <Dice6 />,
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
          <div className="flex h-max max-w-[800px] flex-grow flex-col gap-8">
            {isRouteError ? (
              error.status % 10 > 0 && error.status % 10 <= 6 ? (
                <h1 className="flex max-w-[640px] flex-row items-center justify-end gap-1 text-[140px] leading-none text-primary">
                  {error.status.toString().slice(0, 2)}
                  {diceComponents[error.status % 10]}
                </h1>
              ) : (
                <h1 className="flex max-w-[600px] flex-row items-center justify-end gap-1 text-[140px] leading-none text-primary">
                  {error.status}
                </h1>
              )
            ) : (
              <h1 className="flex max-w-[600px] flex-row items-center justify-end gap-1 text-[140px] leading-none text-primary">
                {t("error")}
              </h1>
            )}

            <Separator className="h-2 max-w-[600px] rounded-lg bg-primary" />
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
    </ThemeProvider>
  );
};

export default Error;
