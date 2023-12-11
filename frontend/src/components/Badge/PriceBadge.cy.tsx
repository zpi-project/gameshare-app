import PriceBadge from "./PriceBadge";

describe("<PriceBadge />", () => {
  it("should render correctly", () => {
    const price = 50;

    cy.mount(<PriceBadge price={price} />);

    cy.getBySel("price-badge").should("be.visible");
    cy.getBySel("coins-icon").should("be.visible");
    cy.getBySel("price-info").should("be.visible").and("contain.text", `${price} /`);
  });
});
