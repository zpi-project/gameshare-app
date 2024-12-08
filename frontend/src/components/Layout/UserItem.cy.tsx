import { FC } from "react";
import { user } from "@cypress/fixtures/user";
import { useSetRecoilState } from "recoil";
import { roleState } from "@/state/role";
import { tokenState } from "@/state/token";
import { RoleType } from "@/types/Role";
import { UserApi } from "@/api/UserApi";
import UserItem from "./UserItem";

describe("<UserItem />", () => {
  const UserItemCy: FC<{ role: RoleType; token: string | null }> = ({ role, token }) => {
    const setRole = useSetRecoilState(roleState);
    setRole(role);
    const setToken = useSetRecoilState(tokenState);
    setToken(token);

    return <UserItem />;
  };

  it("should render correctly for logged in user", () => {
    cy.stub(UserApi, "get").resolves(user);
    cy.mount(<UserItemCy role="user" token="token" />);
    cy.getBySel("user-image").should("be.visible");
    cy.getBySel("avatar-button").click();
    cy.getBySel("logout-button").should("be.visible");
  });

  it("should render correctly for guest user", () => {
    cy.mount(<UserItemCy role="guest" token={null} />);
    cy.getBySel("guest-image").should("be.visible");
    cy.getBySel("avatar-button").click();
  });

  it("correctly handles mode menu", () => {
    cy.mount(<UserItemCy role="guest" token={null} />);
    cy.getBySel("avatar-button").click();
    cy.getBySel("mode-toggle").should("be.visible").click();
    cy.getBySel("mode").should("have.length", 3);
    cy.getBySel("mode").first().click();
    cy.getBySel("mode").should("not.exist");
    cy.getBySel("mode-toggle").click();
    cy.getBySel("mode").eq(1).click();
    cy.getBySel("mode-toggle").click();
    cy.getBySel("mode").last().click();
  });

  it("correctly shows language menu", () => {
    cy.mount(<UserItemCy role="guest" token={null} />);
    cy.getBySel("avatar-button").click();
    cy.getBySel("language-toggle").should("be.visible").click();
    cy.getBySel("language").should("have.length", 2);
    cy.getBySel("language").first().click();
    cy.getBySel("language").should("not.exist");
  });

  it("logouts the user on logout click", () => {
    cy.stub(UserApi, "get").resolves(user);
    cy.mount(<UserItemCy role="user" token="token" />);
    cy.getBySel("avatar-button").click();
    cy.getBySel("logout-button").should("be.visible").click();
    cy.getBySel("logout-button").should("not.exist");
  });
});
