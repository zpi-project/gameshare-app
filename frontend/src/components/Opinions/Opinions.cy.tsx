import { paginatedOpinions, paginatedNoOpinions } from "@cypress/fixtures/opinion";
import { user } from "@cypress/fixtures/user";
import { UserApi } from "@/api/UserApi";
import Opinions from "./Opinions";

describe("<Opinions />", () => {
  it("displays correcly all opinions for a user", () => {
    cy.stub(UserApi, "getAllOpinionsByUUID").resolves(paginatedOpinions);
    cy.mount(<Opinions user={user} />);
    cy.getBySel("opinions-section").should("be.visible");
    cy.getBySel("opinion").should("have.length", paginatedOpinions.paginationInfo.totalElements);
  });

  it("displays correcly all opinions for a user on his own profile", () => {
    cy.stub(UserApi, "getMyOpinions").resolves(paginatedOpinions);
    cy.mount(<Opinions user={user} isMyPage />);
    cy.getBySel("opinions-section").should("be.visible");
    cy.getBySel("opinion").should("have.length", paginatedOpinions.paginationInfo.totalElements);
  });

  it("correcly shows loading state", () => {
    cy.stub(UserApi, "getAllOpinionsByUUID").resolves(paginatedOpinions);
    cy.mount(<Opinions user={user} />);
    cy.getBySel("loading-opinions").should("be.visible");
    cy.getBySel("opinions-section").should("be.visible");
    cy.getBySel("loading-opinions").should("not.exist");
  });

  it("displays error message when fetching opinions fails", () => {
    cy.stub(UserApi, "getAllOpinionsByUUID").rejects(new Error("error fetching opinions"));
    cy.mount(<Opinions user={user} />);

    cy.getBySel("error-message").should("be.visible");
  });

  it("displays 'no opinions' message when user has no opinions", () => {
    cy.stub(UserApi, "getAllOpinionsByUUID").resolves(paginatedNoOpinions);
    cy.mount(<Opinions user={user} />);

    cy.getBySel("no-opinions").should("be.visible");
  });

  it("displays no opinions if user is not provided", () => {
    cy.mount(<Opinions />);
    cy.getBySel("opinions-section").should("not.exist");
  });
});
