import { RouteObject } from "react-router-dom";
import Error from "./Error";

describe("Error Component", () => {
  const routes: RouteObject[] = [
    {
      path: "",
      element: <div data-test="home-page">home page</div>,
      errorElement: <Error />,
    },
  ];

  it("renders the error status and message correctly", () => {
    cy.complexRouteWrappedMount(routes, "not-existing-page");

    cy.getBySel("error-code")
      .should("be.visible")
      .and("have.text", "40")
      .findBySel("dice-4")
      .should("be.visible");
    cy.getBySel("error-description").should("be.visible");
  });

  it('navigates to the home page when clicking "Back to Home"', () => {
    cy.complexRouteWrappedMount(routes, "not-existing-page");
    cy.getBySel("home-page").should("not.exist");
    cy.getBySel("back-home").should("be.visible").click();
    cy.getBySel("home-page").should("be.visible");
  });
});
