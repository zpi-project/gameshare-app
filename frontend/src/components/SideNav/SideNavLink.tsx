import { FC } from "react";
import { Link, useMatch } from "react-router-dom";

interface SideNavLinkProps {
  path: string;
  icon: JSX.Element;
}
const SideNavLink: FC<SideNavLinkProps> = ({ path, icon }) => {
  const match = useMatch(path);

  return (
    <Link
      to={path}
      className={`transtion-all flex items-center justify-center rounded-lg p-1 duration-300 hover:bg-muted ${
        match !== null ? "bg-primary" : ""
      }`}
    >
      {icon}
    </Link>
  );
};
export default SideNavLink;
