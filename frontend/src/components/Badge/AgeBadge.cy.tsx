import AgeBadge from "./AgeBadge";

describe("<AgeBadge />", () => {
  it("should render correctly", () => {
    cy.mount(<AgeBadge age={10} />);
    cy.getBySel("age-badge").should("be.visible");
    cy.getBySel("baby-icon").should("be.visible");
    cy.getBySel("age").should("have.text", "+10");
  });
});
