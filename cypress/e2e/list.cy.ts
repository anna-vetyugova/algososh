import { contains } from "cypress/types/jquery";
import {
  CHANGING_STATE,
  DEFAULT_STATE,
  INPUT,
  INPUT_NUMBER,
  CIRCLE_HEAD,
  CIRCLE_TAIL,
  CIRCLE_MAIN,
  CIRCLE_INDEX,
  ADD_BUTTON,
  DELETE_BUTTON,
  CLEAR_BUTTON,
} from "../constants";

describe("List algo", function () {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("МБОУ АЛГОСОШ");
    cy.get('[href="/list"]').click();
    cy.contains("Связный список");
  });

  it("should disable add to head/tail buttons if input is empty", function () {
    cy.get(INPUT).should("have.value", "");
    cy.get('button:contains("Добавить в head")').should("be.disabled");
    cy.get('button:contains("Добавить в tail")').should("be.disabled");
  });
  it("should disable delete button by index if index input is empty", function () {
    cy.get(INPUT_NUMBER).should("have.value", "");
    cy.get('button:contains("Удалить по индексу")').should("be.disabled");
  });
  it("should disable add button by index if index and text inputs are empty", function () {
    cy.get(INPUT_NUMBER).should("have.value", "");
    cy.get(INPUT).should("have.value", "");
    cy.get('button:contains("Добавить по индексу")').should("be.disabled");
  });
  it.only("should display list items correctly", function() {
    cy.get(CIRCLE_MAIN).should("exist");
    
    cy.get(CIRCLE_MAIN).each(($el, index)=>{
      cy.get(CIRCLE_MAIN).its('length').then(count => {
        cy.wrap($el).get(CIRCLE_INDEX).contains(`${index}`);
        cy.wrap($el).should('not.be.empty');
        cy.wrap($el).should("have.css", "border-color", DEFAULT_STATE);
        if(index === 0) cy.wrap($el).get(CIRCLE_HEAD).contains('head');
        if(index + 1 === count) cy.wrap($el).get(CIRCLE_TAIL).contains('tail');
        if (index > 0 && index < count) {
          cy.wrap($el).get(CIRCLE_HEAD).should('be.empty')
          cy.wrap($el).get(CIRCLE_TAIL).should('be.empty');
        }
      });
    })
  });
    

});
