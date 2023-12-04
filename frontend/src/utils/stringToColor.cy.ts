import { getRandomLetter, stringToHexColor } from "./stringToColor";

describe("stringToHexColor function", () => {
  it("should return default color for empty or short strings", () => {
    const defaultColor = "#000000";

    cy.wrap(stringToHexColor("")).should("equal", defaultColor);
    cy.wrap(stringToHexColor("ab")).should("equal", defaultColor);
  });

  it("should return a valid hex color for non-empty strings", () => {
    const hexColor = stringToHexColor("test");
    cy.wrap(hexColor).should("match", /^#[0-9a-fA-F]{6}$/);
  });

  it("should return the same color for the same input", () => {
    const word = "test";
    let hexColor: string;
    cy.wrap(() => {
      hexColor = stringToHexColor(word);
    }).should("not.be.undefined");
    cy.wrap(() => {
      const newHexColor = stringToHexColor(word);
      expect(newHexColor).to.equal(hexColor);
    });
  });

  it("should handle lowercase and uppercase letters different way", () => {
    const lowercaseColor = stringToHexColor("test");
    const uppercaseColor = stringToHexColor("TEST");
    cy.wrap(uppercaseColor).should("not.equal", lowercaseColor);
  });

  it("should handle special characters in the word", () => {
    const specialCharacterColor = stringToHexColor("test!@#");
    cy.wrap(specialCharacterColor).should("match", /^#[0-9a-fA-F]{6}$/);
  });

  it("should handle long strings", () => {
    const longStringColor = stringToHexColor("verylongstring");
    cy.wrap(longStringColor).should("match", /^#[0-9a-fA-F]{6}$/);
  });
});

describe("getRandomLetter function", () => {
  it("should return a single random letter from the alphabet", () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    cy.wrap(() => {
      const randomLetter = getRandomLetter();
      expect(alphabet).to.include(randomLetter);
    });
  });

  it("should return a different letter on multiple calls", () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const randomLetters = new Set();

    for (let i = 0; i < 10; i++) {
      const randomLetter = getRandomLetter();
      cy.wrap(randomLetter).should("be.a", "string");
      expect(alphabet).to.include(randomLetter);
      randomLetters.add(randomLetter);
    }

    cy.wrap(randomLetters.size).should("be.greaterThan", 1);
  });
});
