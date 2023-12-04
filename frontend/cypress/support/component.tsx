import {
  BrowserRouter,
  MemoryRouter,
  Route,
  RouterProvider,
  Routes,
  createMemoryRouter,
} from "react-router-dom";
import "@cypress/code-coverage/support";
import { mount } from "cypress/react18";
import "../../src/index.css";
import "./commands";
import ComponentProviders from "./componentProviders";
import { queryClient } from "./queryClient";

Cypress.Commands.add("mount", (component, options = {}) => {
  const wrapped = (
    <ComponentProviders>
      <BrowserRouter>{component}</BrowserRouter>
    </ComponentProviders>
  );
  queryClient.clear();
  return mount(wrapped, options);
});

Cypress.Commands.add("routeWrappedMount", (WrappedComponent, route, path, options = {}) => {
  window.history.pushState({}, "", route);
  const wrapped = (
    <ComponentProviders>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route element={WrappedComponent} path={path} />
        </Routes>
      </MemoryRouter>
    </ComponentProviders>
  );
  queryClient.clear();
  return mount(wrapped, options);
});

Cypress.Commands.add("complexRouteWrappedMount", (routes, initialRoute, options = {}) => {
  window.history.pushState({}, "", initialRoute);
  const router = createMemoryRouter(routes, { initialEntries: [initialRoute] });
  const wrapped = (
    <ComponentProviders>
      <RouterProvider router={router} />
    </ComponentProviders>
  );
  queryClient.clear();
  return mount(wrapped, options);
});
