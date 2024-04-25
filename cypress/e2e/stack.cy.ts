import { contains } from "cypress/types/jquery";
import {
  CHANGING_STATE,
  DEFAULT_STATE,
  INPUT,
  CIRCLE_HEAD,
  CIRCLE_TAIL,
  CIRCLE_MAIN,
  ADD_BUTTON,
  DELETE_BUTTON
} from "../constants";

describe("Stack algo", function () {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("МБОУ АЛГОСОШ");
    cy.get('[href="/stack"]').click();
    cy.contains("Стек");
  });

  it("should disable button if input is empty", function () {
    cy.get(INPUT).should("have.value", "");
    cy.contains(ADD_BUTTON).should("be.disabled");
  });

  it("should add new element to the stack", function () {
    cy.get(INPUT).should("have.value", "");
    cy.contains(ADD_BUTTON).should("be.disabled");
    cy.clock();

    cy.get(INPUT).type("1");
    cy.contains(ADD_BUTTON).should("be.enabled").click();

    cy.get(CIRCLE_MAIN).should('have.length', 1);
    cy.get(CIRCLE_MAIN).should("have.css", "border-color", CHANGING_STATE); 
    cy.get(CIRCLE_HEAD).contains('top');
    cy.get(CIRCLE_TAIL).contains('0');
    cy.tick(1000);

    cy.get(CIRCLE_MAIN).should("have.css", "border-color", DEFAULT_STATE);
    cy.tick(1000);

    cy.get(INPUT).type("2");
    cy.contains(ADD_BUTTON).should("be.enabled").click();
    cy.get(CIRCLE_MAIN).should('have.length', 2);

    cy.get(CIRCLE_MAIN).each(($el, index)=>{
      cy.get(CIRCLE_MAIN).its('length').then(count => {
        // cy.log(`count: ${count}`);
        // cy.log(`index: ${index}`);
        if(count === index + 1) {
          cy.wrap($el).should("have.css", "border-color", CHANGING_STATE); 
          cy.wrap($el).get(CIRCLE_HEAD).contains('top');
          cy.wrap($el).get(CIRCLE_TAIL).contains('1');

          cy.tick(1000);
          cy.wrap($el).get(CIRCLE_MAIN).should("have.css", "border-color", DEFAULT_STATE);
        }       
      });
    })
  });

  it("should delete element from the stack", function () {
    cy.get(INPUT).type("1");
    cy.contains(ADD_BUTTON).should("be.enabled").click();
    cy.get(CIRCLE_MAIN).should('have.length', 1);

    cy.clock();
    cy.contains(DELETE_BUTTON).should("be.enabled").click();
    cy.get(CIRCLE_MAIN).should("have.css", "border-color", CHANGING_STATE);
    cy.tick(1000);
    cy.get('ul[class*="stack-page_circles"]').should('not.be.visible');
    cy.contains(DELETE_BUTTON).should("be.disabled")
    
    cy.get(INPUT).type("1");
    cy.contains(ADD_BUTTON).should("be.enabled").click();
    cy.get(CIRCLE_MAIN).should('have.length', 1);
    cy.tick(1000);

    cy.get(INPUT).type("2");
    cy.contains(ADD_BUTTON).should("be.enabled").click();
    cy.get(CIRCLE_MAIN).should('have.length', 2);
    cy.tick(1000);


    cy.contains(DELETE_BUTTON).should("be.enabled").click();
    cy.get(CIRCLE_MAIN).each(($el, index)=>{
      cy.get(CIRCLE_MAIN).its('length').then(count => {
        // cy.log(`count: ${count}`);
        cy.log(`index: ${index}`);
        if(index === count - 1) {
          cy.wrap($el).should("have.css", "border-color", CHANGING_STATE); 
          cy.wrap($el).get(CIRCLE_TAIL).contains('1');

          cy.tick(1000);
          cy.wrap($el).get(CIRCLE_MAIN).should("have.css", "border-color", DEFAULT_STATE);
          cy.wrap($el).get(CIRCLE_HEAD).contains('top');
          cy.wrap($el).get(CIRCLE_TAIL).contains('0');
        }       
      });
    })


  });
});
