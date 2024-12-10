import { FC } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { t } from "i18next";
import { AlignLeft } from "lucide-react";
import { useRecoilValue } from "recoil";
import { roleState } from "@/state/role";
import { tokenState } from "@/state/token";
import { URLS } from "@/constants/urls";
import useIsDesktop from "@/utils/useIsDesktop";
import { UserApi } from "@/api/UserApi";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Help from "./Help";
import LanguageToggle from "./LanguageToggle";
import LoginButton from "./LoginButton";
import { ModeToggle } from "./ModeToggle";
import UserItem from "./UserItem";

const TopNav: FC = () => {
  const role = useRecoilValue(roleState);
  const token = useRecoilValue(tokenState);
  const isDesktop = useIsDesktop();

  const { data: user } = useQuery({
    queryKey: ["user", { token }],
    queryFn: UserApi.get,
    enabled: role !== "guest",
  });

  return (
    <div className="my-2 flex items-center">
      {isDesktop ? (
        <>
          <div className="flex items-center gap-3">
            <Link to={URLS.DASHBOARD}>
              <img src="/logo.png" className="h-12 w-12 rounded-lg" alt="GameShare logo" />
            </Link>
            <Link to={URLS.CATEGORY_GAMES}>
              <Button
                className="flex items-center gap-2 border border-primary px-3 text-primary hover:bg-primary"
                variant="ghost"
              >
                <AlignLeft size={20} strokeWidth={1} />
                <span>{t("catalog")}</span>
              </Button>
            </Link>
          </div>
          <div className="ml-auto flex items-center gap-3">
            {user ? (
              <UserItem user={user} />
            ) : (
              <div className="overflow-hidden rounded-sm border border-[#428ccd] stroke-2">
                <LoginButton />
              </div>
            )}
            <ModeToggle />
            <LanguageToggle />
            <Help />
          </div>
        </>
      ) : (
        <>
          <Link to={URLS.DASHBOARD} className="mr-auto">
            <img src="/logo.png" className="h-12 w-12 rounded-lg" alt="GameShare logo" />
          </Link>
          {user ? (
            <UserItem user={user} includeOptions />
          ) : (
            <div className="flex gap-1">
              <div className="overflow-hidden rounded-sm border border-[#428ccd] stroke-2">
                <LoginButton type="icon" />
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="" size="icon" variant="outline-secondary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-ellipsis-vertical"
                    >
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="12" cy="5" r="1" />
                      <circle cx="12" cy="19" r="1" />
                    </svg>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="end"
                  className="flex w-[180px] justify-end gap-2 bg-section p-3"
                >
                  <ModeToggle />
                  <LanguageToggle />
                  <Help />
                </PopoverContent>
              </Popover>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default TopNav;
