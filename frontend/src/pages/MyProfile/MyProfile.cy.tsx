import { RouteObject } from "react-router-dom";
import { gameInstanceDetails, paginatedGameInstances } from "@cypress/fixtures/gameInstance";
import { paginatedOpinions } from "@cypress/fixtures/opinion";
import { user } from "@cypress/fixtures/user";
import { GameInstanceApi } from "@/api/GameInstanceApi";
import { UserApi } from "@/api/UserApi";
import MyProfile from "./MyProfile";

describe("<MyProfile />", () => {
  const routes: RouteObject[] = [
    {
      path: "/",
      element: <div data-test="dashboard">dashboard</div>,
    },
    {
      path: "/my-profile",
      element: <MyProfile />,
    },
  ];

  it("should render correctly", () => {
    cy.stub(UserApi, "get").resolves(user);
    cy.stub(UserApi, "getMyOpinions").resolves(paginatedOpinions);
    cy.stub(GameInstanceApi, "getAll").resolves(paginatedGameInstances);
    cy.mount(<MyProfile />);
    cy.getBySel("opinions-section").should("be.visible");
    cy.getBySel("user-details").should("be.visible");
    cy.getBySel("game-instances").should("be.visible");
    cy.getBySel("add-game-button").click();
  });

  it("should show error message when api call fails and redirect to dashboard", () => {
    cy.stub(UserApi, "get").rejects(new Error("error"));
    cy.stub(GameInstanceApi, "getAll").resolves(paginatedGameInstances);
    cy.stub(UserApi, "getMyOpinions").resolves(paginatedOpinions);
    cy.complexRouteWrappedMount(routes, "/my-profile");
    cy.getBySel("toast").should("be.visible");
    cy.getBySel("dashboard").should("be.visible");
  });

  describe("Edit game form", () => {
    it("correctly edits a game", () => {
      cy.stub(UserApi, "get").resolves(user);
      cy.stub(GameInstanceApi, "getAll").resolves(paginatedGameInstances);
      cy.stub(UserApi, "getMyOpinions").resolves(paginatedOpinions);
      cy.stub(GameInstanceApi, "getOne").resolves(gameInstanceDetails);
      cy.stub(GameInstanceApi, "edit").resolves("");
      cy.mount(<MyProfile />);
      cy.getBySel("edit-button").first().click();
      cy.getBySel("edit-dialog").should("be.visible");
      cy.getBySel("price-per-day").clear().type("17");
      cy.getBySel("description-game").clear().type("description test");
      cy.getBySel("edit-submit-button").click();
      cy.getBySel("toast").should("be.visible");
      cy.getBySel("edit-dialog").should("not.exist");
    });

    it("shows error message when fetching game instance details fails", () => {
      cy.stub(UserApi, "get").resolves(user);
      cy.stub(GameInstanceApi, "getAll").resolves(paginatedGameInstances);
      cy.stub(UserApi, "getMyOpinions").resolves(paginatedOpinions);
      cy.stub(GameInstanceApi, "getOne").rejects(new Error("Error"));
      cy.mount(<MyProfile />);
      cy.getBySel("edit-button").first().click();
      cy.getBySel("edit-dialog").should("be.visible");
      cy.getBySel("details-error-message").should("be.visible");
    });

    it("correctly adds an image", () => {
      cy.stub(UserApi, "get").resolves(user);
      cy.stub(GameInstanceApi, "getAll").resolves(paginatedGameInstances);
      cy.stub(UserApi, "getMyOpinions").resolves(paginatedOpinions);
      cy.stub(GameInstanceApi, "getOne").resolves(gameInstanceDetails);
      cy.stub(GameInstanceApi, "addImage").resolves("");
      cy.mount(<MyProfile />);
      cy.getBySel("edit-button").first().click();
      cy.getBySel("image-input").selectFile("cypress/fixtures/logo.png", { force: true });
      cy.getBySel("edit-submit-button").click();
      cy.getBySel("toast").should("be.visible");
      cy.getBySel("edit-dialog").should("not.exist");
    });

    it("shows error message when an image is too big", () => {
      cy.stub(UserApi, "get").resolves(user);
      cy.stub(GameInstanceApi, "getAll").resolves(paginatedGameInstances);
      cy.stub(UserApi, "getMyOpinions").resolves(paginatedOpinions);
      cy.stub(GameInstanceApi, "getOne").resolves(gameInstanceDetails);
      cy.stub(GameInstanceApi, "addImage").resolves("");
      cy.mount(<MyProfile />);
      cy.getBySel("edit-button").first().click();
      cy.getBySel("image-input").selectFile("cypress/fixtures/to-big-img.jpg", { force: true });
      cy.getBySel("img-error");
    });

    it("shows an error message when adding an image fails", () => {
      cy.stub(UserApi, "get").resolves(user);
      cy.stub(GameInstanceApi, "getAll").resolves(paginatedGameInstances);
      cy.stub(UserApi, "getMyOpinions").resolves(paginatedOpinions);
      cy.stub(GameInstanceApi, "getOne").resolves(gameInstanceDetails);
      cy.stub(GameInstanceApi, "addImage").rejects(new Error("error"));
      cy.mount(<MyProfile />);
      cy.getBySel("edit-button").first().click();
      cy.getBySel("image-input").selectFile("cypress/fixtures/logo.png", { force: true });
      cy.getBySel("edit-submit-button").click();
      cy.getBySel("toast").should("be.visible");
      cy.getBySel("edit-dialog").should("not.exist");
    });

    it("correctly deletes a game image", () => {
      cy.stub(UserApi, "get").resolves(user);
      cy.stub(GameInstanceApi, "getAll").resolves(paginatedGameInstances);
      cy.stub(UserApi, "getMyOpinions").resolves(paginatedOpinions);
      cy.stub(GameInstanceApi, "getOne").resolves(gameInstanceDetails);
      cy.stub(GameInstanceApi, "edit").resolves("");
      cy.stub(GameInstanceApi, "deleteImage").resolves("");
      cy.mount(<MyProfile />);
      cy.getBySel("edit-button").first().click();

      cy.getBySel("edit-dialog").should("be.visible");
      cy.getBySel("price-per-day").clear().type("17");
      cy.getBySel("trash").first().click();
      cy.getBySel("edit-submit-button").click();
      cy.getBySel("toast").should("be.visible");
      cy.getBySel("edit-dialog").should("not.exist");
    });

    it("shows error message when deleteing an image fails", () => {
      cy.stub(UserApi, "get").resolves(user);
      cy.stub(GameInstanceApi, "getAll").resolves(paginatedGameInstances);
      cy.stub(UserApi, "getMyOpinions").resolves(paginatedOpinions);
      cy.stub(GameInstanceApi, "getOne").resolves(gameInstanceDetails);
      cy.stub(GameInstanceApi, "deleteImage").rejects(new Error());
      cy.mount(<MyProfile />);
      cy.getBySel("edit-button").first().click();
      cy.getBySel("edit-dialog").should("be.visible");
      cy.getBySel("trash").first().click();
      cy.getBySel("edit-submit-button").click();
      cy.getBySel("toast").should("be.visible");
      cy.getBySel("edit-dialog").should("not.exist");
    });

    it("shows error message when editing a game fails", () => {
      cy.stub(UserApi, "get").resolves(user);
      cy.stub(GameInstanceApi, "getAll").resolves(paginatedGameInstances);
      cy.stub(UserApi, "getMyOpinions").resolves(paginatedOpinions);
      cy.stub(GameInstanceApi, "getOne").resolves(gameInstanceDetails);
      cy.stub(GameInstanceApi, "edit").rejects(new Error());
      cy.stub(GameInstanceApi, "deleteImage").rejects(new Error());
      cy.mount(<MyProfile />);
      cy.getBySel("edit-button").first().click();
      cy.getBySel("edit-dialog").should("be.visible");
      cy.getBySel("price-per-day").clear().type("22");
      cy.getBySel("description-game").clear().type("description test test");
      cy.getBySel("trash").first().click();
      cy.getBySel("edit-submit-button").click();
      cy.getBySel("edit-dialog").should("not.exist");
    });

    it("shows validation messages when form is invalid", () => {
      cy.stub(UserApi, "get").resolves(user);
      cy.stub(GameInstanceApi, "getAll").resolves(paginatedGameInstances);
      cy.stub(UserApi, "getMyOpinions").resolves(paginatedOpinions);
      cy.stub(GameInstanceApi, "getOne").resolves(gameInstanceDetails);
      cy.mount(<MyProfile />);
      cy.getBySel("edit-button").first().click();
      cy.getBySel("edit-dialog").should("be.visible");
      cy.getBySel("price-per-day").clear();
      cy.getBySel("description-game").clear();
      cy.getBySel("edit-submit-button").click();
      cy.getBySel("toast").should("not.exist");
      cy.getBySel("error-description").should("be.visible");
    });
  });
});
