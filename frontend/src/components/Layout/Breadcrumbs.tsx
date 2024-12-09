import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { URLS } from "@/constants/urls";

const TRANSLATED = [
  "games",
  "game-categories",
  "my-reservations",
  "my-profile",
  "profile",
  "game-requests",
];

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(x => x);
  const { t } = useTranslation();

  return (
    <nav aria-label="breadcrumbs" className="my-2 text-xl">
      <ul className="flex space-x-2">
        {pathnames.length > 0 && pathnames[0].length > 1 && (
          <li>
            <Link
              to={URLS.DASHBOARD}
              className="capitalize transition-all hover:text-primary hover:underline"
            >
              {t("urls.home")}
            </Link>
            <span className="ml-2">/</span>
          </li>
        )}

        {pathnames.map((value, index) => {
          const to = `/${pathnames
            .slice(0, index + 1)
            .map(value => (value === "games" ? "game-categories" : value))
            .join("/")}`;
          const isLast = index === pathnames.length - 1;

          const translated = TRANSLATED.find(x => x === decodeURIComponent(value));
          return (
            <li key={to}>
              {isLast ? (
                <span className="capitalize">
                  {translated ? t(`urls.${translated}`) : decodeURIComponent(value)}
                </span>
              ) : (
                <Link
                  to={to}
                  className="capitalize transition-all hover:text-primary hover:underline"
                >
                  {translated ? t(`urls.${translated}`) : decodeURIComponent(value)}
                </Link>
              )}
              {!isLast && <span> / </span>}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
