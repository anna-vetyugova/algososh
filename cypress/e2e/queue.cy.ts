import { contains } from "cypress/types/jquery";
import {
  CHANGING_STATE,
  DEFAULT_STATE,
  INPUT,
  CIRCLE_HEAD,
  CIRCLE_TAIL,
  CIRCLE_MAIN,
  CIRCLE_INDEX,
  ADD_BUTTON,
  DELETE_BUTTON,
  CLEAR_BUTTON
} from "../constants";
import { DELAY_IN_MS } from "../constants";

describe("Queue algo", function () {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("МБОУ АЛГОСОШ");
    cy.get('[href="/queue"]').click();
    cy.contains("Очередь");
  });

  it("should disable button if input is empty", function () {
    cy.get(INPUT).should("have.value", "");
    cy.contains(ADD_BUTTON).should("be.disabled");
  });
  it("should add new element to the queue", function () {
    cy.get(INPUT).should("have.value", "");
    cy.contains(ADD_BUTTON).should("be.disabled");


    cy.get(INPUT).type("1");
    cy.contains(ADD_BUTTON).should("be.enabled").click();
    cy.get(CIRCLE_MAIN).first().should("have.css", "border-color", CHANGING_STATE); 
    
    cy.get(CIRCLE_HEAD).first().should('have.text', "head");
    cy.get(CIRCLE_TAIL).first().should('have.text', "tail");
    cy.get(CIRCLE_INDEX).first().contains(0);
    cy.wait(DELAY_IN_MS);

    cy.get(CIRCLE_MAIN).first().should('have.text', "1");
    cy.get(CIRCLE_MAIN).first().should("have.css", "border-color", DEFAULT_STATE);
    cy.wait(DELAY_IN_MS);

    cy.get(INPUT).type("2");
    cy.contains(ADD_BUTTON).should("be.enabled").click();

    cy.get(CIRCLE_MAIN).each(($el, index)=>{
      if(index === 0) {
        cy.wrap($el).should('have.text', "1");
        cy.wrap($el).get(CIRCLE_TAIL).should('be.empty')
      }
      if(index === 1) {
        cy.wrap($el).should("have.css", "border-color", CHANGING_STATE);
        cy.wrap($el).get(CIRCLE_TAIL).should('have.text', "tail");
        cy.wrap($el).get(CIRCLE_INDEX).contains(1);

        cy.wait(DELAY_IN_MS);
        cy.wrap($el).should('have.text', "2");
        cy.wrap($el).should("have.css", "border-color", DEFAULT_STATE);
      }     
    })
  });

  it("should delete element from the queue", function () {
    cy.get(INPUT).type("1");
    cy.contains(ADD_BUTTON).should("be.enabled").click(); 
    cy.wait(DELAY_IN_MS);
    cy.get(INPUT).type("2");
    cy.contains(ADD_BUTTON).should("be.enabled").click();
    cy.wait(DELAY_IN_MS);

    cy.contains(DELETE_BUTTON).should("be.enabled").click();
  
    cy.get(CIRCLE_MAIN).first().should("have.css", "border-color", CHANGING_STATE);
    cy.wait(DELAY_IN_MS);
    cy.get(CIRCLE_HEAD).first().should('have.text', "");
    cy.get(CIRCLE_TAIL).first().should('have.text', "");
    cy.get(CIRCLE_MAIN).first().should('have.text', "");

    cy.wait(DELAY_IN_MS);
    cy.get(CIRCLE_MAIN).first().should("have.css", "border-color", DEFAULT_STATE);
    cy.get(CIRCLE_MAIN).first().next().get(CIRCLE_HEAD).should('have.text', "head");

  });

  it.only("should clear the queue", function () {
    cy.get(INPUT).type("1");
    cy.contains(ADD_BUTTON).should("be.enabled").click(); 
    cy.wait(DELAY_IN_MS);
    cy.get(INPUT).type("2");
    cy.contains(ADD_BUTTON).should("be.enabled").click();
    cy.wait(DELAY_IN_MS);
    cy.get(INPUT).type("3");
    cy.contains(ADD_BUTTON).should("be.enabled").click();
    cy.wait(DELAY_IN_MS);

    cy.contains(CLEAR_BUTTON).should("be.enabled").click();
    cy.wait(DELAY_IN_MS);

    cy.get(CIRCLE_MAIN).each(($el, index)=>{
      if(index === 0) cy.wrap($el).get(CIRCLE_HEAD).should('be.empty');
      if(index === 2) cy.wrap($el).get(CIRCLE_TAIL).should('be.empty');
      cy.get(CIRCLE_MAIN).should('have.text', "");
    })
  });
});