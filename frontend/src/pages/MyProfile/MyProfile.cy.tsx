import { user } from "@cypress/fixtures/user";
import { UserApi } from "@/api/UserApi";
import MyProfile from "./MyProfile";

describe("<MyProfile />", () => {
  it("should render correctly", () => {
    cy.stub(UserApi, "get").resolves(user);
    cy.mount(<MyProfile />);
  });
  it("should show error message when api call fails", () => {
    cy.stub(UserApi, "get").rejects("Error");
    cy.mount(<MyProfile />);
  }),
    it("should render opinions correctly"),
    () => {};
  it("should render games instances correctly", () => {});
  it("should filter game instances", () => {});
});
