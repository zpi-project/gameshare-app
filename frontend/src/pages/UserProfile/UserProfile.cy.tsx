import { paginatedOpinions } from "@cypress/fixtures/opinion";
import { user } from "@cypress/fixtures/user";
import { UserApi } from "@/api/UserApi";
import UserProfile from "./UserProfile";


describe("<UserProfile />", () => {
  it("should render correctly", () => {
    cy.stub(UserApi, "getByUUID").resolves(user);
    cy.stub(UserApi, "getAllOpinionsByUUID").resolves(paginatedOpinions);
    cy.mount(<UserProfile />);
    cy.getBySel("opinions-section").should("be.visible");
    cy.getBySel("user-details").should("be.visible");
    cy.getBySel("game-instances").should("be.visible");
  });

  it("should show error message when api call fails", () => {
    cy.stub(UserApi, "getByUUID").rejects("Error");
    cy.stub(UserApi, "getAllOpinionsByUUID").resolves(paginatedOpinions);
    cy.mount(<UserProfile />);
    cy.getBySel("toast").should("be.visible");
  });
});