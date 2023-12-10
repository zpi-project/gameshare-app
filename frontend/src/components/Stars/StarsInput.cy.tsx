import StarsInput from "./StarsInput";

describe("<StarsInput />", () => {
  it("renders correctly", () => {
    cy.mount(<StarsInput />);
    cy.getBySel("star").should("have.length", 5);
    cy.getBySel("star").eq(3).click();
  });

  it("renders correctly in secondary variant", () => {
    cy.mount(<StarsInput variant="secondary" />);
    cy.getBySel("star").should("have.length", 5);
    cy.getBySel("star").eq(4).click();
    cy.getBySel("star").eq(2).click();
  });
});
