import { contains } from "cypress/types/jquery";
import {
  CHANGING_STATE,
  DEFAULT_STATE,
  MODIFIED_STATE,
  INPUT,
  CIRCLE_MAIN,
  REVERSE_BUTTON
} from "../constants";


describe("String algo", function () {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("МБОУ АЛГОСОШ");
    cy.get('[href="/recursion"]').click();
    cy.contains("Строка");
  });

  it("should disable button if input is empty", function () {
    cy.get(INPUT).should("have.value", "");
    cy.contains(REVERSE_BUTTON).should("be.disabled");
  });

  it("should reverse string correctly", function () {
    cy.get(INPUT).should("have.value", "");
    cy.contains(REVERSE_BUTTON).should("be.disabled");

    cy.get(INPUT).type("hello");
    cy.get(INPUT).should("have.value", "hello");
    cy.contains(REVERSE_BUTTON).should("be.enabled").click();

    cy.get(CIRCLE_MAIN).should("have.length", 5);
    cy.clock();
    cy.get(CIRCLE_MAIN).each(($el, index, $divs) => {
      if (index === 0) {
        cy.wrap($el).contains("h");
        cy.wrap($el).should("have.css", "border-color", CHANGING_STATE);
      }
      if (index === 1) {
        cy.wrap($el).contains("e");
        cy.wrap($el).should("have.css", "border-color", DEFAULT_STATE);
      }
      if (index === 2) {
        cy.wrap($el).contains("l");
        cy.wrap($el).should("have.css", "border-color", DEFAULT_STATE);
      }
      if (index === 3) {
        cy.wrap($el).contains("l");
        cy.wrap($el).should("have.css", "border-color", DEFAULT_STATE);
      }
      if (index === 4) {
        cy.wrap($el).contains("o");
        cy.wrap($el).should("have.css", "border-color", CHANGING_STATE);
      }
    });
    cy.tick(500);
    cy.get(CIRCLE_MAIN).each(($el, index, $divs) => {
      if (index === 0) {
        cy.wrap($el).contains("o");
        cy.wrap($el).should("have.css", "border-color", MODIFIED_STATE);
      }
      if (index === 1) {
        cy.wrap($el).contains("e");
        cy.wrap($el).should("have.css", "border-color", CHANGING_STATE);
      }
      if (index === 2) {
        cy.wrap($el).contains("l");
        cy.wrap($el).should("have.css", "border-color", DEFAULT_STATE);
      }
      if (index === 3) {
        cy.wrap($el).contains("l");
        cy.wrap($el).should("have.css", "border-color", CHANGING_STATE);
      }
      if (index === 4) {
        cy.wrap($el).contains("h");
        cy.wrap($el).should("have.css", "border-color", MODIFIED_STATE);
      }
    });
    cy.tick(500);
    cy.get(CIRCLE_MAIN).each(($el, index, $divs) => {
      if (index === 0) {
        cy.wrap($el).contains("o");
        cy.wrap($el).should("have.css", "border-color", MODIFIED_STATE);
      }
      if (index === 1) {
        cy.wrap($el).contains("l");
        cy.wrap($el).should("have.css", "border-color", MODIFIED_STATE);
      }
      if (index === 2) {
        cy.wrap($el).contains("l");
        cy.wrap($el).should("have.css", "border-color", MODIFIED_STATE);
      }
      if (index === 3) {
        cy.wrap($el).contains("e");
        cy.wrap($el).should("have.css", "border-color", MODIFIED_STATE);
      }
      if (index === 4) {
        cy.wrap($el).contains("h");
        cy.wrap($el).should("have.css", "border-color", MODIFIED_STATE);
      }
    });
  });
});
