//TODO add more of these
describe("Go to reservations page", () => {
  it("passes", () => {
    cy.visit("https://example.cypress.io");
    cy.exec("npm run restore-database");
  });
});
