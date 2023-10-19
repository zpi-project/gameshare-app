import { FC } from "react";
import { Home, CalendarDays, Search, Dices } from "lucide-react";
import { useRecoilValue } from "recoil";
import { roleState } from "@/state/role";
import { URLS } from "@/constants/urls";
import SideNavLink from "./SideNavLink";
import UserItem from "./UserItem";

const ALL_LINKS = [
  {
    path: URLS.DASHBOARD,
    icon: <Home size={50} strokeWidth={1} />,
  },
  {
    path: URLS.SEARCH_GAMES,
    icon: <Search size={50} strokeWidth={1} />,
  },
];

const USER_LINKS = [
  {
    path: URLS.RESERVATIONS,
    icon: <CalendarDays size={50} strokeWidth={1} />,
  },
  {
    path: URLS.GAMES,
    icon: <Dices size={50} strokeWidth={1} />,
  },
];

const SideNav: FC = () => {
  const role = useRecoilValue(roleState);

  return (
    <div className="flex h-full w-[78px] flex-col justify-between rounded-lg bg-section px-3 py-4 text-section-foreground">
      <div className="flex flex-col items-center gap-3">
        <img src="logo.png" className="h-14 w-14 rounded-lg" alt="GameShare logo" />
        {ALL_LINKS.map(({ icon, path }) => (
          <SideNavLink icon={icon} path={path} key={path} />
        ))}
      </div>

      <div className="flex flex-col items-center gap-3">
        {role !== "guest" &&
          USER_LINKS.map(({ icon, path }) => <SideNavLink icon={icon} path={path} key={path} />)}
        <UserItem />
      </div>
    </div>
  );
};

export default SideNav;
