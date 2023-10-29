import { FC } from "react";
import { useTranslation } from "react-i18next";

const Spinner: FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="fixed left-0 top-0 z-[100] h-screen w-screen backdrop-blur-[2px]" />
      <div className="fixed left-1/2 top-1/2 z-[1000] h-12 w-12 -translate-x-1/2 -translate-y-1/2 transform">
        <div
          className="h-full w-full animate-spin rounded-full border-4 border-foreground border-t-transparent duration-700"
          role="status"
          aria-label="loading"
        />
        <div
          className="absolute left-[10px] top-[10px] h-7 w-7 animate-spin rounded-full border-4 border-transparent border-t-primary"
          role="status"
          aria-label="loading"
        />
        <span className="sr-only">{t("loading")}...</span>
      </div>
    </>
  );
};

export default Spinner;
