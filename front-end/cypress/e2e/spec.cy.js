/// <reference types="cypress" />

import { recommendationFactory } from "./../../../back-end/tests/factories/recomendationsFactory";

const SEED_SIZE = 5;
const recommendation = recommendationFactory();

describe('register some recommendations', () => {
  it('register a recommendation', () => {
    cy.visit("http://localhost:3000");
    cy.get("#name").type(recommendation.name);
    cy.get("#youtubeLink").type(recommendation.youtubeLink);
    cy.intercept("POST", "/recommendations").as("postRecommendation")
    cy.get("#submitButton").click();
    cy.wait("@postRecommendation");
  });
  it("try to register a recommendation that already exists", () => {
    cy.get("#name").type(recommendation.name);
    cy.get("#youtubeLink").type(recommendation.youtubeLink);
    cy.intercept("POST", "/recommendations").as("postRecommendation")
    cy.get("#submitButton").click();
    cy.wait("@postRecommendation");
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Error creating recommendation!')
    });
  });
});

describe("tests the upvote and downvote", () =>{
  it("upvotes a recommendation", () => {
    cy.intercept("POST", "/recommendations/1/upvote").as("upvote");
    cy.get("#upArrow").click();
    cy.wait("@upvote")
  });
  it("downvotes a recommendation", () => {
    cy.intercept("POST", "/recommendations/1/downvote").as("downvote");
    cy.get("#downArrow").click();
    cy.wait("@downvote")
  });
  it("downvotes until deletes a recommendation", () => {
    cy.get("#downArrow").click();
    cy.get("#downArrow").click();
    cy.get("#downArrow").click();
    cy.get("#downArrow").click();
    cy.get("#downArrow").click();
    cy.get("#downArrow").click();
  });
});

describe("tests top button", ()=>{

})