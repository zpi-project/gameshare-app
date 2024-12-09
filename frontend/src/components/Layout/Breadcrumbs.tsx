import React from "react";
import { Link, useLocation } from "react-router-dom";
import { URLS } from "@/constants/urls";

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(x => x);

  return (
    <nav aria-label="breadcrumbs" className="my-2 text-xl">
      <ul className="flex space-x-2">
        {pathnames.length > 0 && pathnames[0].length > 1 && (
          <li>
            <Link to={URLS.DASHBOARD} className="transition-all hover:text-primary hover:underline">
              Home
            </Link>
            <span className="ml-2">/</span>
          </li>
        )}

        {/* Dynamic breadcrumbs */}
        {pathnames.map((value, index) => {
          const to = `/${pathnames
            .slice(0, index + 1)
            .map(value => (value === "games" ? "game-categories" : value))
            .join("/")}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={to}>
              {isLast ? (
                <span className="capitalize">{decodeURIComponent(value).replace("-", " ")}</span>
              ) : (
                <Link
                  to={to}
                  className="capitalize transition-all hover:text-primary hover:underline"
                >
                  {decodeURIComponent(value).replace("-", " ")}
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
