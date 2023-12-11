import PlayersBadge from "./PlayersBadge";

describe("<PlayersBadge />", () => {
  it("should render correctly with equal minPlayers and maxPlayers", () => {
    const players = 5;

    cy.mount(<PlayersBadge minPlayers={players} maxPlayers={players} />);

    cy.getBySel("user-icon").should("be.visible");
    cy.getBySel("players-amount").should("be.visible").and("have.text", players.toString());
    cy.getBySel("players-interval").should("not.exist");
  });

  it("should render correctly with different minPlayers and maxPlayers", () => {
    const minPlayers = 3;
    const maxPlayers = 8;

    cy.mount(<PlayersBadge minPlayers={minPlayers} maxPlayers={maxPlayers} />);

    cy.getBySel("user-icon").should("be.visible");
    cy.getBySel("players-amount").should("not.exist");
    cy.getBySel("players-interval")
      .should("be.visible")
      .and("have.text", `${minPlayers}-${maxPlayers}`);
  });
});
