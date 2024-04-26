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
import { DELAY_IN_MS } from "../constants";

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

    cy.get(INPUT).type("1");
    cy.contains(ADD_BUTTON).should("be.enabled").click();

    cy.get(CIRCLE_MAIN).should('have.length', 1);
    cy.get(CIRCLE_MAIN).should("have.css", "border-color", CHANGING_STATE); 
    cy.get(CIRCLE_HEAD).contains('top');
    cy.get(CIRCLE_TAIL).contains('0');
    cy.wait(DELAY_IN_MS);

    cy.get(CIRCLE_MAIN).should("have.css", "border-color", DEFAULT_STATE);
    cy.wait(DELAY_IN_MS);

    cy.get(INPUT).type("2");
    cy.get(CIRCLE_MAIN).its('length').then(count => {
      cy.contains(ADD_BUTTON).should("be.enabled").click();
      cy.get(CIRCLE_MAIN).should('have.length', 2);

      cy.get(CIRCLE_MAIN).last().should("have.css", "border-color", CHANGING_STATE); 
      cy.get(CIRCLE_HEAD).last().contains('top');
      cy.get(CIRCLE_TAIL).last().contains('1');

      cy.wait(DELAY_IN_MS);
      cy.get(CIRCLE_MAIN).last().should("have.css", "border-color", DEFAULT_STATE);
      
      cy.get(CIRCLE_MAIN).its('length').then((newCount) => {
        expect(newCount).to.equal(count + 1);
      });
    });
  });

  it.only("should delete element from the stack", function () {
    cy.get(INPUT).type("1");
    cy.contains(ADD_BUTTON).should("be.enabled").click();
    cy.get(CIRCLE_MAIN).should('have.length', 1);

    cy.contains(DELETE_BUTTON).should("be.enabled").click();
    cy.get(CIRCLE_MAIN).should("have.css", "border-color", CHANGING_STATE);
    cy.wait(DELAY_IN_MS);
    
    cy.get(CIRCLE_MAIN).should('not.exist');
    cy.contains(DELETE_BUTTON).should("be.disabled")
    
    cy.get(INPUT).type("1");
    cy.contains(ADD_BUTTON).should("be.enabled").click();
    cy.get(CIRCLE_MAIN).should('have.length', 1);
    cy.wait(DELAY_IN_MS);

    cy.get(INPUT).type("2");
    cy.contains(ADD_BUTTON).should("be.enabled").click();
    cy.get(CIRCLE_MAIN).should('have.length', 2);
    cy.wait(DELAY_IN_MS);

    cy.contains(DELETE_BUTTON).should("be.enabled").click();

    cy.get(CIRCLE_MAIN).its('length').then(count => {
      
      cy.get(CIRCLE_MAIN).last().should("have.css", "border-color", CHANGING_STATE); 
      cy.get(CIRCLE_TAIL).last().contains('1');

      cy.wait(DELAY_IN_MS);
      cy.get(CIRCLE_MAIN).last().should("have.css", "border-color", DEFAULT_STATE);
      cy.get(CIRCLE_HEAD).last().contains('top');
      cy.get(CIRCLE_TAIL).last().contains('0');
       
      cy.get(CIRCLE_MAIN).its('length').then((newCount) => {
        expect(newCount).to.equal(count - 1);
      });
    });

  });
});
