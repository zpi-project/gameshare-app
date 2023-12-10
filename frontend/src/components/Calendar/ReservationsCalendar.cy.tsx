import { RouteObject } from "react-router-dom";
import {
  reservationsCurrMonth,
  reservationsNextMonth,
  reservationsPrevMonth,
} from "@cypress/fixtures/availability";
import { URLS } from "@/constants/urls";
import { GameInstanceApi } from "@/api/GameInstanceApi";
import ReservationsCalendar from "./ReservationsCalendar";

describe("<ReservationsCalendar />", () => {
  const ReservationsCalendarCy = () => (
    <div className="w-[600px]">
      <ReservationsCalendar gameInstanceUUID="uuid" />
    </div>
  );

  const routes: RouteObject[] = [
    {
      path: `${URLS.MY_RESERVATIONS}/:id`,
      element: <div data-test="reservation-details">reservation details</div>,
    },
    {
      path: "/calendar",
      element: <ReservationsCalendarCy />,
    },
  ];

  it("renders correctly", () => {
    cy.stub(GameInstanceApi, "getReservations").resolves(reservationsCurrMonth);
    cy.mount(<ReservationsCalendarCy />);
    cy.getBySel("next-button").should("be.enabled");
    cy.getBySel("prev-button").should("be.enabled");
  });

  it("displayes next month reservations on next button click", () => {
    cy.stub(GameInstanceApi, "getReservations")
      .onFirstCall()
      .resolves(reservationsCurrMonth)
      .onSecondCall()
      .resolves(reservationsNextMonth);
    cy.mount(<ReservationsCalendarCy />);
    cy.getBySel("next-button").click();
  });

  it("displayes previous month reservations on previous button click", () => {
    cy.stub(GameInstanceApi, "getReservations")
      .onFirstCall()
      .resolves(reservationsCurrMonth)
      .onSecondCall()
      .resolves(reservationsPrevMonth);
    cy.mount(<ReservationsCalendarCy />);
    cy.getBySel("prev-button").click();
  });

  it("navigates to reservation details page on reservation click", () => {
    cy.stub(GameInstanceApi, "getReservations").resolves(reservationsCurrMonth);
    cy.complexRouteWrappedMount(routes, "/calendar");
    cy.getBySel("day").filter("[aria-disabled='false']").first().click();
    cy.getBySel("reservation-details").should("be.visible");
  });

  it("marks days with no reservations as disabled", () => {
    cy.stub(GameInstanceApi, "getReservations").resolves(reservationsCurrMonth);
    cy.mount(<ReservationsCalendarCy />);
    cy.getBySel("day").filter("[aria-disabled='false']").should("be.visible");
    cy.getBySel("day").filter("[aria-disabled='true']").should("be.visible");
  });

  it("displays error message when fetching reservations fails", () => {
    cy.stub(GameInstanceApi, "getReservations").rejects(new Error("error"));
    cy.mount(<ReservationsCalendarCy />);
    cy.getBySel("error-message").should("be.visible");
  });
});
