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
// @ts-ignore
Cypress.Commands.add('loginByGoogleApi', () => {
  cy.log('Logging in to Google')
  cy.request({
    method: 'POST',
    url: 'https://www.googleapis.com/oauth2/v4/token',
    body: {
      grant_type: 'authorization_code',
      client_id: Cypress.env('VITE_AUTH_CLIENT_ID'),
      client_secret: Cypress.env('AUTH_SECRET'),
    },
  }).then(({ body }) => {
    const { access_token, id_token } = body

    cy.request({
      method: 'GET',
      url: 'https://www.googleapis.com/oauth2/v3/userinfo',
      headers: { Authorization: `Bearer ${access_token}` },
    }).then(({ body }) => {
      cy.log(body)
      const userItem = {
        token: id_token,
        user: {
          googleId: body.sub,
          email: body.email,
          givenName: body.given_name,
          familyName: body.family_name,
          imageUrl: body.picture,
        },
      }

      window.localStorage.setItem('googleCypress', JSON.stringify(userItem))
      cy.visit('/')
    })
  })
})


export {};
