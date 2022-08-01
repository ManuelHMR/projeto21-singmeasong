/// <reference types="cypress" />

import { recommendationFactory } from "./../../../back-end/tests/factories/recomendationsFactory";

const SEED_SIZE = 5;

describe('register some recommendations', () => {
  for(let i = 0; i < SEED_SIZE; i++){
    it('register a recommendation', () => {
      const recommendation = recommendationFactory();
      cy.visit("http://localhost:3000");
      cy.get("#name").type(recommendation.name);
      cy.get("#youtubeLink").type(recommendation.youtubeLink);
      cy.get("#submitButton").click();
    })
  }
});