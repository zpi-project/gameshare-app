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

import secureLocalStorage from "react-secure-storage";
import { useSetRecoilState } from "recoil";
import { tokenState } from "../../src/state/token";
import { roleState } from "../../src/state/role";
import { roleState } from "@/state/role.ts";
import { useEffect } from "react";

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
      grant_type: 'refresh_token',
      client_id: Cypress.env('googleClientId'),
      client_secret: Cypress.env('googleClientSecret'),
      refresh_token: Cypress.env('googleRefreshToken'),
    },
  }).then(({ body }) => {
    const { access_token, id_token } = body
    // const setToken = useSetRecoilState(tokenState)

    cy.request({
      method: 'GET',
      url: 'https://www.googleapis.com/oauth2/v3/userinfo',
      headers: { Authorization: `Bearer ${access_token}` },
    }).then(({ body }) => {
      cy.log(body.email)
      cy.log(typeof(id_token)) //string
      cy.log(id_token)
      secureLocalStorage.setItem('token', id_token)
      cy.visit('localhost:5173/my-reservations').reload()
    })
  })
})

export {};
