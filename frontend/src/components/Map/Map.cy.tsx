import { user } from "@cypress/fixtures/user";
import { UserApi } from "@/api/UserApi";
import { LocationButton, LocationMarker } from ".";
import Map from "./Map";

describe("<Map />", () => {
  it("renders correctly", () => {
    cy.stub(UserApi, "get").rejects("guest");
    cy.mount(
      <div className="h-[500px] w-[500px]">
        <Map location={[17, 51.0]} autolocate={false} />
      </div>,
    );
    cy.getBySel("location-button").should("not.exist");
    cy.getLink("https://www.openstreetmap.org/copyright").should("be.visible");
  });

  it("locates on map click", () => {
    cy.stub(UserApi, "get").resolves(user);
    const setLocationStub = cy.stub().as("setLocationStub");
    cy.mount(
      <div className="h-[500px] w-[500px]" data-test="map">
        <Map location={[17, 51.0]} autolocate={false} setLocation={setLocationStub}>
          <LocationMarker />
          <LocationButton />
        </Map>
      </div>,
    );
    cy.getBySel("map").click();
    cy.get("@setLocationStub").should("have.been.calledOnce");
  });

  it("shows message that location is disabled", () => {
    cy.mount(
      <div className="h-[500px] w-[500px]" data-test="map">
        <Map location={[17, 51.0]} autolocate={true}>
          <LocationMarker />
          <LocationButton />
        </Map>
      </div>,
    );
    cy.getBySel("location-button").focus();
    cy.getBySel("disabled-location").should("be.visible");
    cy.getBySel("location-button").should("be.visible").should("be.disabled");
  });
});
