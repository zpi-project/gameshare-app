import { paginatedGames, paginatedNoGames, paginatedSecondPageGames } from "@cypress/fixtures/game";
import { useSetRecoilState } from "recoil";
import { roleState } from "@/state/role";
import { GameApi } from "@/api/GameApi";
import GameSearchBar from "./GameSearchBar";

describe("<GameSearchBar />", () => {
  it("renders correctly", () => {
    cy.stub(GameApi, "search").resolves(paginatedGames);
    cy.mount(
      <GameSearchBar
        onGameClick={cy.stub().as("onGameClickStub")}
        placeholder="placeholder"
        categories={[]}
      />,
    );
    cy.getBySel("game-search-card").should("not.exist");
    cy.getBySel("input").click();
    cy.getBySel("game-search-card").should("be.visible");
    cy.getBySel("scroller-trigger").should("exist");
  });

  it("loads more games on scroll", () => {
    cy.stub(GameApi, "search")
      .onFirstCall()
      .resolves(paginatedGames)
      .onSecondCall()
      .resolves(paginatedSecondPageGames);

    cy.mount(
      <GameSearchBar
        onGameClick={cy.stub().as("onGameClickStub")}
        placeholder="placeholder"
        categories={[]}
      />,
    );
    cy.getBySel("input").click();
    cy.getBySel("game-search-card").should("be.visible");
    cy.getBySel("scroller-trigger").scrollIntoView();
    cy.getBySel("game-search-card").should("have.length.at.least", 9);
    cy.getBySel("scroller-trigger").should("not.exist");
  });

  it("searches games on input change", () => {
    cy.stub(GameApi, "search")
      .onFirstCall()
      .resolves(paginatedGames)
      .onSecondCall()
      .resolves(paginatedSecondPageGames);

    cy.mount(
      <GameSearchBar
        onGameClick={cy.stub().as("onGameClickStub")}
        placeholder="placeholder"
        categories={[]}
      />,
    );
    cy.getBySel("input").click().type("hello");
    cy.getBySel("game-search-card").should("be.visible");
  });

  it("shows games not found message when games not found", () => {
    cy.stub(GameApi, "search").resolves(paginatedNoGames);
    cy.mount(
      <GameSearchBar
        onGameClick={cy.stub().as("onGameClickStub")}
        placeholder="placeholder"
        categories={[]}
      />,
    );
    cy.getBySel("input").click();
    cy.getBySel("game-search-card").should("not.exist");
    cy.getBySel("no-results").should("be.visible");
    cy.getBySel("add-game").should("not.exist");
  });

  it("for logged in user allows to add new game when games not found", () => {
    const GameSearchBarCy = () => {
      const setRole = useSetRecoilState(roleState);
      setRole("user");
      return (
        <GameSearchBar
          onGameClick={cy.stub().as("onGameClickStub")}
          placeholder="placeholder"
          categories={[]}
        />
      );
    };

    cy.stub(GameApi, "search").resolves(paginatedNoGames);
    cy.mount(<GameSearchBarCy />);
    cy.getBySel("input").click();
    cy.getBySel("no-results").should("be.visible");
    cy.getBySel("add-game").should("be.visible");
  });

  it("shows error message when fetching games from api fails", () => {
    cy.stub(GameApi, "search").rejects(new Error("error"));
    cy.mount(
      <GameSearchBar
        onGameClick={cy.stub().as("onGameClickStub")}
        placeholder="placeholder"
        categories={[]}
      />,
    );
    cy.getBySel("input").click();
    cy.getBySel("error-message").should("be.visible");
  });

  it("closes results popup on game click", () => {
    cy.stub(GameApi, "search").resolves(paginatedGames);
    cy.mount(
      <GameSearchBar
        onGameClick={cy.stub().as("onGameClickStub")}
        placeholder="placeholder"
        categories={[]}
      />,
    );
    cy.getBySel("input").click();
    cy.getBySel("game-search-card").first().click();
    cy.getBySel("game-search-card").should("not.exist");
  });
});
