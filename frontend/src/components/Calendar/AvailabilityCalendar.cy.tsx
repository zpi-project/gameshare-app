import { availabilityCurrMonth, availabilityNextMonth } from "@cypress/fixtures/availability";
import { GameInstanceApi } from "@/api/GameInstanceApi";
import AvailabilityCalendar from "./AvailabilityCalendar";

describe("<AvailabilityCalendar />", () => {
  const AvailabilityCalendarCy = () => (
    <div className="w-[600px]">
      <AvailabilityCalendar gameInstanceUUID="uuid" />
    </div>
  );

  it("renders correctly", () => {
    cy.stub(GameInstanceApi, "getNonAvailability").resolves(availabilityCurrMonth);
    cy.mount(<AvailabilityCalendarCy />);
    cy.getBySel("prev-button").should("be.disabled");
    cy.getBySel("next-button").should("be.enabled");
  });

  it("shows next month availabilty on next button click", () => {
    cy.stub(GameInstanceApi, "getNonAvailability")
      .onFirstCall()
      .resolves(availabilityCurrMonth)
      .onSecondCall()
      .resolves(availabilityNextMonth)
      .onThirdCall()
      .resolves(availabilityCurrMonth);
    cy.mount(<AvailabilityCalendarCy />);
    cy.getBySel("loading-day").should("be.visible");
    cy.getBySel("hidden-day").should("be.visible");
    cy.getBySel("day").should("be.visible");
    cy.getBySel("next-button").click();
    cy.getBySel("prev-button").should("be.enabled").click();
  });

  it("shows error message when fetching availability fails", () => {
    cy.stub(GameInstanceApi, "getNonAvailability").rejects(new Error("error"));
    cy.mount(<AvailabilityCalendarCy />);
    cy.getBySel("error-message").should("be.visible");
  });
});
