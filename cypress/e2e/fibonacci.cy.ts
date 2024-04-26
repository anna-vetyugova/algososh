import { contains } from "cypress/types/jquery";
import {
  INPUT_NUMBER,
  CIRCLE_MAIN,
  CIRCLE_INDEX,
  REVERSE_BUTTON
} from "../constants";
import { DELAY_IN_MS } from "../constants";

describe("Fibonacci algo", function () {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("МБОУ АЛГОСОШ");
    cy.get('[href="/fibonacci"]').click();
    cy.contains("Последовательность Фибоначчи");
  });
  it("should disable button if input is empty", function () {
    cy.get(INPUT_NUMBER).should("have.value", "");
    cy.contains(REVERSE_BUTTON).should("be.disabled");
  });
  it("should generate numbers correct", function () {
    cy.get(INPUT_NUMBER).should("have.value", "");
    cy.contains(REVERSE_BUTTON).should("be.disabled");
    
    cy.get(INPUT_NUMBER).type('3');
    cy.get(INPUT_NUMBER).should("have.value", '3');
    
    cy.contains(REVERSE_BUTTON).should("be.enabled").click();
    
    cy.get(CIRCLE_MAIN).should("have.length", 1).each(($el, index, $divs) => {
      if(index === 0) {
        cy.wrap($el).contains("1");
        cy.get(CIRCLE_INDEX).contains(0);
      }
    });
    cy.wait(DELAY_IN_MS);
    cy.get(CIRCLE_MAIN).should("have.length", 2).each(($el, index, $divs) => {
      if(index === 1) {
        cy.wrap($el).contains("1");
        cy.get(CIRCLE_INDEX).contains(1);
      }
    });
    cy.wait(DELAY_IN_MS);
    cy.get(CIRCLE_MAIN).should("have.length", 3).each(($el, index, $divs) => {
      if(index === 2) {
        cy.wrap($el).contains("2");
        cy.get(CIRCLE_INDEX).contains(2);
      }
    });
    cy.wait(DELAY_IN_MS);
    cy.get(CIRCLE_MAIN).should("have.length", 4).each(($el, index, $divs) => {
      if(index === 3) {
        cy.wrap($el).contains("3");
        cy.get(CIRCLE_INDEX).contains(3);
      }
    });
  });
});
