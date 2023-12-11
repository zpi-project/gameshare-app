import { user } from "@cypress/fixtures/user";
import { User } from "@/types/User";
import { formatPhoneNumber, getFullname, getName, getNameFirstLetters, hasName } from "./user";

describe("User functions", () => {
  const userWithFirstName: User = { ...user, firstName: "John", lastName: "" };
  const userWithLastName: User = { ...user, firstName: "", lastName: "Doe" };
  const userWithBothNames: User = { ...user, firstName: "John", lastName: "Doe" };
  const userWithNoNames: User = { ...user, firstName: "", lastName: "" };

  it("getFullname should return the full name", () => {
    cy.wrap(getFullname(userWithBothNames)).should("equal", "John Doe");
    cy.wrap(getFullname(userWithFirstName)).should("equal", "John ");
    cy.wrap(getFullname(userWithLastName)).should("equal", " Doe");
    cy.wrap(getFullname(userWithNoNames)).should("equal", " ");
  });

  it("getName should return the first name", () => {
    cy.wrap(getName(user)).should("equal", "Amy");
    cy.wrap(getName(userWithNoNames)).should("equal", "");
  });

  it("getNameFirstLetters should return the first letters of the names", () => {
    cy.wrap(getNameFirstLetters(userWithBothNames)).should("equal", "JD");
    cy.wrap(getNameFirstLetters(userWithLastName)).should("equal", "D");
    cy.wrap(getNameFirstLetters(userWithFirstName)).should("equal", "J");
    cy.wrap(getNameFirstLetters(userWithNoNames)).should("equal", "");
  });

  it("hasName should return true if either first name or last name is present", () => {
    cy.wrap(hasName(userWithFirstName)).should("be.true");
    cy.wrap(hasName(userWithLastName)).should("be.true");
    cy.wrap(hasName(userWithBothNames)).should("be.true");
    cy.wrap(hasName(userWithNoNames)).should("be.false");
  });

  it("formatPhoneNumber should add a '+' if it's missing", () => {
    cy.wrap(formatPhoneNumber("123456789")).should("equal", "+123456789");
    cy.wrap(formatPhoneNumber("+987654321")).should("equal", "+987654321");
  });
});
