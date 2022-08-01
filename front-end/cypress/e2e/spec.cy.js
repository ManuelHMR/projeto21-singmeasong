/// <reference types="cypress" />

import { recommendationFactory } from "./../../../back-end/tests/factories/recomendationsFactory";

const SEED_SIZE = 5;
const recommendation = recommendationFactory();
const recommendationArr = [];
for(let i = 0; i < 4; i++){
  recommendationArr.push(recommendationFactory())
};

describe('register some recommendations', () => {
  it('register a recommendation', () => {
    cy.request("POST", "http://localhost:5000/tests/clear");
    cy.visit("http://localhost:3000");
    cy.get("#name").type(recommendation.name);
    cy.get("#youtubeLink").type(recommendation.youtubeLink);
    cy.intercept("POST", "/recommendations").as("postRecommendation")
    cy.get("#submitButton").click();
    cy.wait("@postRecommendation");
    cy.contains(`${recommendation.name}`)
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
    cy.get("#upArrow").click();
    cy.contains("1");
  });
  it("downvotes a recommendation", () => {
    cy.get("#downArrow").click();
    cy.contains("0");
  });
  it("downvotes until deletes a recommendation", () => {
    for(let i = 0; i < 6; i++){
      cy.get("#downArrow").click();
    }
    cy.contains("No recommendations yet! Create your own :)");
  });
});

describe("tests header buttons", ()=>{
  it("fill some recommendations", ()=>{
    for(let i = 0; i < recommendationArr.length; i++){
      cy.get("#name").type(recommendationArr[i].name);
      cy.get("#youtubeLink").type(recommendationArr[i].youtubeLink);
      cy.intercept("POST", "/recommendations").as("postRecommendation")
      cy.get("#submitButton").click();
      cy.wait("@postRecommendation");
      for(let j = i; j < 5; j++){
        cy.get("#upArrow").click();
      }
    }
  })
  it("tests home button", () =>{
    cy.get("#home").click();
  });
  it("tests top button", () =>{
    cy.get("#top").click();
  });
  it("tests random button", () =>{
    cy.get("#random").click();
  });
  it("reset data base", ()=> {
    cy.request("POST", "http://localhost:5000/tests/clear");
  })
});