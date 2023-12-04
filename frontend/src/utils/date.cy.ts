import {
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getFirstDayOfLastMonth,
  getFirstDayOfNextMonth,
  getDaysInMonth,
} from "./date";

describe("Date functions", () => {
  const currentDate = new Date(2023, 11, 15);

  it("getFirstDayOfMonth should return the first day of the month", () => {
    cy.wrap(getFirstDayOfMonth(currentDate)).should("deep.equal", new Date(2023, 11, 1));
  });

  it("getLastDayOfMonth should return the last day of the month", () => {
    cy.wrap(getLastDayOfMonth(currentDate)).should("deep.equal", new Date(2023, 11, 31));
  });

  it("getFirstDayOfLastMonth should return the first day of the last month", () => {
    cy.wrap(getFirstDayOfLastMonth(currentDate)).should("deep.equal", new Date(2023, 10, 1));
  });

  it("getFirstDayOfNextMonth should return the first day of the next month", () => {
    cy.wrap(getFirstDayOfNextMonth(currentDate)).should("deep.equal", new Date(2024, 0, 1));
  });

  it("getDaysInMonth should return the number of days in the month", () => {
    cy.wrap(getDaysInMonth(currentDate)).should("equal", 31);
  });

  it("getDaysInMonth should handle leap years", () => {
    const leapYearDate = new Date(2024, 1, 15);
    cy.wrap(getDaysInMonth(leapYearDate)).should("equal", 29);
  });

  it("getDaysInMonth should handle months with 30 days", () => {
    const thirtyDaysMonthDate = new Date(2023, 3, 15);
    cy.wrap(getDaysInMonth(thirtyDaysMonthDate)).should("equal", 30);
  });

  it("getDaysInMonth should handle February with 28 days", () => {
    const februaryDate = new Date(2023, 1, 15);
    cy.wrap(getDaysInMonth(februaryDate)).should("equal", 28);
  });
});
