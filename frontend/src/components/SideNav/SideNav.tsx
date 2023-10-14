import { FC } from "react";
import { Home, CalendarDays, Search, Dices } from "lucide-react";
import { useRecoilValue } from "recoil";
import { roleState } from "@/state/role";
import { URLS } from "@/constants/urls";
import UserItem from "./UserItem";

const ALL_LINKS = [
  {
    path: URLS.DASHBOARD,
    icon: <Home />,
  },
  {
    path: URLS.SEARCH_GAMES,
    icon: <Search />,
  },
];

const USER_LINKS = [
  {
    path: URLS.RESRVATIONS,
    icon: <CalendarDays />,
  },
  {
    path: URLS.GAMES,
    icon: <Dices />,
  },
];

const SideNav: FC = () => {
  const role = useRecoilValue(roleState);
  return (
    <div className="flex h-full flex-col gap-2 rounded-lg bg-section px-3 py-4 text-section-foreground">
      <img src="logo.png" className="h-16 w-16 rounded-lg" alt="GameShare logo" />

      <UserItem />
    </div>
  );
};

export default SideNav;
