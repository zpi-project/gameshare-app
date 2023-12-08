import { useSetRecoilState } from "recoil";
import { roleState } from "@/state/role";
import { RoleType } from "@/types/Role";
import UserItem from "./UserItem";

describe("<UserItem />", () => {
  const UserItemCy = (role: RoleType) => {
    const setRole = useSetRecoilState(roleState);
    setRole(role);
    return <UserItem />;
  };

    it("should render correctly for logged in user", () => {
      cy.mount(<UserItemCy />)
  });

  it("should render correctly for guest user", () => {});
});
