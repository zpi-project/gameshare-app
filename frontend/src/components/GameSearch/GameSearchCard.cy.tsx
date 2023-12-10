import { game } from "@cypress/fixtures/game";
import GameSearchCard from "./GameSearchCard";

describe("<GameSearchCard />", () => {
  it("renders correctly", () => {
    cy.mount(<GameSearchCard onClick={cy.stub().as("clickStub")} game={game} />);
    cy.getBySel("game-search-card").should("be.visible");
    cy.getBySel("image").should("be.visible");
    cy.getBySel("badges").should("be.visible");
    cy.getBySel("game-search-card").click();
    cy.get("@clickStub").should("have.been.calledOnce");
  });
});
