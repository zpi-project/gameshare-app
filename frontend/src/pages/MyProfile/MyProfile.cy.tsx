import { paginatedOpinions } from "@cypress/fixtures/opinion";
import { user } from "@cypress/fixtures/user";
import { UserApi } from "@/api/UserApi";
import MyProfile from "./MyProfile";

describe("<MyProfile />", () => {
  it("should render correctly", () => {
    cy.stub(UserApi, "get").resolves(user);
    cy.stub(UserApi, "getMyOpinions").resolves(paginatedOpinions);
    cy.mount(<MyProfile />);
    cy.getBySel("opinions-section").should("be.visible");
    cy.getBySel("user-details").should("be.visible");
    cy.getBySel("game-instances").should("be.visible");
  });

  it("should show error message when api call fails", () => {
    cy.stub(UserApi, "get").rejects("Error");
    cy.stub(UserApi, "getMyOpinions").resolves(paginatedOpinions);
    cy.mount(<MyProfile />);
    cy.getBySel("toast").should("be.visible");
  });
});
