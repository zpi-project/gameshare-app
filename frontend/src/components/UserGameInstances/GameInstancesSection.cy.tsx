import {
  paginatedGameInstances,
  paginatedNoGameInstances,
  paginatedNoActiveGameInstances,
} from "@cypress/fixtures/gameInstance";
import { user } from "@cypress/fixtures/user";
import { t } from "i18next";
import { GameInstanceApi } from "@/api/GameInstanceApi";
import GameInstancesSection from "./GameInstancesSection";

describe("<GameInstancesSection />", () => {
  describe("on my profile", () => {
    it("renders correctly my games", () => {
      cy.stub(GameInstanceApi, "getAll").resolves(paginatedGameInstances);
      cy.mount(<GameInstancesSection owner={user} isMyPage />);
      cy.getBySel("header").should("have.text", t("myGames"));
      cy.getBySel("badges").should("be.visible");
      cy.getBySel("availability-button").should("be.visible");
      cy.getBySel("edit-button").should("be.visible");
      cy.getBySel("add-game-button").should("be.visible");
      cy.getBySel("game-instance").should("have.length", 2);
      cy.getBySel("no-opinions").should("be.visible");
      cy.getBySel("opinion-amount").should("be.visible");
    });

    it("filters games on input change", () => {
      cy.stub(GameInstanceApi, "getAll").resolves(paginatedGameInstances);
      cy.mount(<GameInstancesSection owner={user} isMyPage />);
      cy.getBySel("game-instance").should("have.length", 2);

      cy.getBySel("filter-input").type("Brass");
      cy.getBySel("game-instance").should("have.length", 1);
    });

    it("does not show games when user not provided", () => {
      cy.mount(<GameInstancesSection isMyPage />);
      cy.getBySel("game-instances-content").should("not.exist");
    });

    it("shows error message when api call fails", () => {
      cy.stub(GameInstanceApi, "getAll").rejects(new Error("error"));
      cy.mount(<GameInstancesSection owner={user} isMyPage />);
      cy.getBySel("error-message").should("be.visible");
    });

    it("correctly marks no-active game instances", () => {
      cy.stub(GameInstanceApi, "getAll").resolves(paginatedNoActiveGameInstances);
      cy.mount(<GameInstancesSection owner={user} isMyPage />);
      cy.getBySel("activity-badge").should("be.visible");
    });

    it("shows no my games message when games not found", () => {
      cy.stub(GameInstanceApi, "getAll").resolves(paginatedNoGameInstances);
      cy.mount(<GameInstancesSection owner={user} isMyPage />);
      cy.getBySel("game-instance").should("not.exist");
      cy.getBySel("no-games").should("be.visible").should("have.text", t("noGamesMyPage"));
    });
  });

  describe("on other user's profile", () => {
    it("renders correctly other user's games", () => {
      cy.stub(GameInstanceApi, "getAllByUUID").resolves(paginatedGameInstances);
      cy.mount(<GameInstancesSection owner={user} />);
      cy.getBySel("header").should("have.text", `${t("userGames")} Amy`);
      cy.getBySel("availability-button").should("not.exist");
      cy.getBySel("edit-button").should("not.exist");
      cy.getBySel("activity-badge").should("not.exist");
      cy.getBySel("add-game-button").should("not.exist");
      cy.getBySel("badges").should("be.visible");
      cy.getBySel("game-instance").should("have.length", 2);
      cy.getBySel("no-opinions").should("be.visible");
      cy.getBySel("opinion-amount").should("be.visible");
    });

    it("filters games on input change", () => {
      cy.stub(GameInstanceApi, "getAllByUUID").resolves(paginatedGameInstances);
      cy.mount(<GameInstancesSection owner={user} />);
      cy.getBySel("game-instance").should("have.length", 2);

      cy.getBySel("filter-input").type("Brass");
      cy.getBySel("game-instance").should("have.length", 1);
    });

    it("does not show games when user not provided", () => {
      cy.mount(<GameInstancesSection />);
      cy.getBySel("game-instances-content").should("not.exist");
    });

    it("shows error message when api call fails", () => {
      cy.stub(GameInstanceApi, "getAllByUUID").rejects(new Error("error"));
      cy.mount(<GameInstancesSection owner={user} />);
      cy.getBySel("error-message").should("be.visible");
    });

    it("shows no games message for other user when games not found", () => {
      cy.stub(GameInstanceApi, "getAllByUUID").resolves(paginatedNoGameInstances);
      cy.mount(<GameInstancesSection owner={user} />);
      cy.getBySel("game-instance").should("not.exist");
      cy.getBySel("no-games").should("be.visible").should("have.text", t("noGamesUserPage"));
    });
  });
});
