import { RouteObject } from "react-router-dom";
import { MountOptions, mount } from "cypress/react";

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      routeWrappedMount(
        component: React.ReactNode,
        route: string,
        path: string,
        options?: MountOptions,
      ): Cypress.Chainable<MountReturn>;
      complexRouteWrappedMount(
        routes: RouteObject[],
        initialRoute: string,
        options?: MountOptions,
      ): Cypress.Chainable<MountReturn>;
      /**
       * Select element with data-test attribute that matches the selector.
       * @param selector
       * @example cy.getBySel('login-form')
       **/
      getBySel(selector: string): Chainable<JQuery>;
      /**
       * Select element with data-test attribute that contains the selector.
       * @param selector
       * @example cy.getBySelLike('login-form')
       */
      findBySel(selector: string): Chainable<JQuery>;
      /**
       * Select the descendent element with data-test attribute contains the selector.
       * @param selector
       * @example cy.findBySel('login-form')
       */
      getLink(path: string): Chainable<JQuery>;
      findLink(path: string): Chainable<JQuery>;
      loginByGoogleApi(): void;
    }
  }
}
