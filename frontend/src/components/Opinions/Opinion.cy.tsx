import { opinion, opinionLong } from "@cypress/fixtures/opinion";
import { getFullname } from "@/utils/user";
import Opinion from "./Opinion";

describe("<Opinion />", () => {
  it("should render correctly all informations", () => {
    cy.mount(<Opinion opinion={opinion} />);
    cy.getBySel("opinion").should("be.visible");
    cy.getBySel("fullname").should("have.text", getFullname(opinion.ratingUser));
    cy.getBySel("dateformat").should("have.text", "(Dec. 4, 2023)");
    cy.getBySel("description").should("have.text", opinion.description);
    cy.getBySel("ellipsis").should("not.exist");
    cy.getBySel("see-more").should("not.exist");
    cy.getBySel("see-less").should("not.exist");
  });

  it("shows 'see more' option if description is too long", () => {
    cy.mount(<Opinion opinion={opinionLong} />);
    cy.getBySel("ellipsis").should("be.visible");
    cy.getBySel("see-more").should("be.visible");
    cy.getBySel("see-less").should("not.exist");
  });

  it("toggles description on see more and see less button", () => {
    cy.mount(<Opinion opinion={opinionLong} />);
    cy.getBySel("see-more").click();
    cy.getBySel("ellipsis").should("not.exist");
    cy.getBySel("see-less").should("be.visible");
    cy.getBySel("see-more").should("not.exist");
    cy.getBySel("see-less").click();
    cy.getBySel("ellipsis").should("be.visible");
    cy.getBySel("see-more").should("be.visible");
    cy.getBySel("see-less").should("not.exist");
  });
});
