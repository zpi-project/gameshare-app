// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add("getBySel", (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args);
});

Cypress.Commands.add("findBySel", { prevSubject: "element" }, (subject, selector, ...args) => {
  return cy.wrap(subject).find(`[data-test=${selector}]`, ...args);
});

Cypress.Commands.add("getLink", (path, ...args) => {
  return cy.get(`[href="${path}"]`, ...args);
});

Cypress.Commands.add("findLink", { prevSubject: "element" }, (subject, path, ...args) => {
  return cy.wrap(subject).find(`[href="${path}"]`, ...args);
});

export {};
