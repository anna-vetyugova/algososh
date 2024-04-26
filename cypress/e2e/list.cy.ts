import { contains } from "cypress/types/jquery";
import { cwd } from "process";
import {
  CHANGING_STATE,
  DEFAULT_STATE,
  INPUT,
  INPUT_NUMBER,
  CIRCLE_HEAD,
  CIRCLE_TAIL,
  CIRCLE_MAIN,
  CIRCLE_INDEX,
  CIRCLE_LETTER,
  CIRCLE_SMALL,
  MODIFIED_STATE
} from "../constants";
import { DELAY_IN_MS } from "../constants";

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
  it("should display list items correctly", function() {
    cy.get(CIRCLE_MAIN).should("exist");
    cy.get(CIRCLE_MAIN).each(($el, index)=>{
      cy.get(CIRCLE_MAIN).its('length').then(count => {
        cy.get(CIRCLE_INDEX).eq(index).contains(`${index}`);
        cy.wrap($el).should('not.be.empty');
        cy.wrap($el).should("have.css", "border-color", DEFAULT_STATE);
        if(index === 0) cy.get(CIRCLE_HEAD).eq(index).contains('head');
        if(index + 1 === count) cy.get(CIRCLE_TAIL).eq(index).contains('tail');
        if (index > 0 && index < count - 1) {
          cy.get(CIRCLE_HEAD).eq(index).should('be.empty')
          cy.get(CIRCLE_TAIL).eq(index).should('be.empty');
        }
      });
    })
  });
  it("should add new item to the head", function() {
    cy.get(CIRCLE_HEAD).first().contains('head');
    cy.get(INPUT).type("1");
    cy.get('button:contains("Добавить в head")').should("be.enabled").click();

    cy.get(CIRCLE_SMALL).first().should("have.css", "border-color", CHANGING_STATE);
    cy.get(CIRCLE_LETTER).first().contains('1');

    cy.wait(DELAY_IN_MS);

    cy.get(CIRCLE_MAIN).first().should("have.css", "border-color", MODIFIED_STATE);
    cy.get(CIRCLE_HEAD).first().contains('head');
    cy.get(CIRCLE_INDEX).first().contains('0');
    
    cy.wait(DELAY_IN_MS);

    cy.get(CIRCLE_MAIN).first().should("have.css", "border-color", DEFAULT_STATE);
  }); 

  it("should add new item to the tail", function() {
    cy.get(CIRCLE_TAIL).last().contains('tail');
    cy.get(INPUT).type("1");
    cy.get('button:contains("Добавить в tail")').should("be.enabled").click();

    cy.get(CIRCLE_SMALL).last().should("have.css", "border-color", CHANGING_STATE);
    cy.get(CIRCLE_SMALL).last().get(CIRCLE_LETTER).contains('1');

    cy.wait(DELAY_IN_MS);

    cy.get(CIRCLE_MAIN).last().should("have.css", "border-color", MODIFIED_STATE);
    cy.get(CIRCLE_TAIL).last().contains('tail');
    
    cy.get(CIRCLE_MAIN).its('length').then((count) => {
      cy.get(CIRCLE_INDEX).last().contains(count - 1);
    });
  
    cy.wait(DELAY_IN_MS);

    cy.get(CIRCLE_MAIN).last().should("have.css", "border-color", DEFAULT_STATE);
  }); 

  it("should add new item by index", function() {
    cy.get(INPUT).type('1');
    cy.get(INPUT_NUMBER).type('1');

    cy.get(CIRCLE_MAIN).its('length').then((count) => {
      cy.get('button:contains("Добавить по индексу")').should("be.enabled").click();
      cy.get(CIRCLE_MAIN).filter((index, element) => !element.className.includes("circle_small")).each(($el, index) => {
        if(index === 0) {
          cy.get(CIRCLE_SMALL).eq(index).should("have.css", "border-color", CHANGING_STATE);
          cy.wrap($el).should("have.css", "border-color", DEFAULT_STATE);
          cy.get(CIRCLE_SMALL).eq(index).contains('1');
          cy.wait(DELAY_IN_MS);
        }
        if(index === 1) {
          cy.get(CIRCLE_SMALL).first().should("have.css", "border-color", CHANGING_STATE);
          cy.get(CIRCLE_MAIN).eq(0).should("have.css", "border-color", CHANGING_STATE);
          cy.wrap($el).should("have.css", "border-color", DEFAULT_STATE);

          cy.get(CIRCLE_SMALL).first().should("have.css", "border-color", CHANGING_STATE);
          cy.get(CIRCLE_SMALL).first().contains('1');
          cy.wrap($el).should('not.have.value');
          cy.wrap($el).should("have.css", "border-color", DEFAULT_STATE);
        }
      });
      cy.wait(DELAY_IN_MS);
      cy.get(CIRCLE_MAIN).eq(1).contains('1');
      cy.get(CIRCLE_MAIN).eq(1).should("have.css", "border-color", MODIFIED_STATE);

      cy.wait(DELAY_IN_MS);

      cy.get(CIRCLE_MAIN).eq(1).should("have.css", "border-color", DEFAULT_STATE);

      cy.get(CIRCLE_MAIN).its('length').then((newCount) => {
        expect(newCount).to.equal(count + 1);
      });
    });
  }); 

  it("should delete item from head", function() {
    cy.get(CIRCLE_MAIN).its('length').then((count) => {
        cy.get(CIRCLE_MAIN).first().then(($firstItem) => {
            if ($firstItem.length > 0) {
                const itemContent = $firstItem.text().trim();
                // cy.log(itemContent);

                cy.get('button:contains("Удалить из head")').should("be.enabled").click();

                cy.get(CIRCLE_MAIN).filter((index, element) => !element.className.includes("circle_small")).eq(0).should('not.have.value');
                cy.get(CIRCLE_SMALL).first().should("have.css", "border-color", CHANGING_STATE);
                cy.get(CIRCLE_SMALL).first().contains(itemContent);

                cy.wait(DELAY_IN_MS);
                cy.get(CIRCLE_MAIN).first().then(($newFirstItem) => {
                    expect($newFirstItem.text().trim()).not.to.equal(itemContent);
                    cy.get(CIRCLE_MAIN).its('length').then((newCount) => {
                        expect(newCount).to.equal(count - 1);
                    });
                });
            } 
        });
    });
  });

  it("should delete item from tail", function() {
    cy.get(CIRCLE_MAIN).its('length').then((count) => {
        cy.get(CIRCLE_MAIN).last().then(($lastItem) => {
            if ($lastItem.length > 0) {
                const itemContent = $lastItem.text().trim();
                
                cy.get('button:contains("Удалить из tail")').should("be.enabled").click();

                cy.get(CIRCLE_MAIN).filter((index, element) => !element.className.includes("circle_small")).eq(count-1).should('not.have.value');

                cy.get(CIRCLE_SMALL).first().should("have.css", "border-color", CHANGING_STATE);
                cy.log(itemContent);
                cy.get(CIRCLE_SMALL).first().contains(itemContent);

                cy.wait(DELAY_IN_MS);
                cy.get(CIRCLE_MAIN).last().then(($newLastItem) => {
                    expect($newLastItem.text().trim()).not.to.equal(itemContent);
                    cy.get(CIRCLE_MAIN).its('length').then((newCount) => {
                        expect(newCount).to.equal(count - 1);
                    });
                });
            } 
        });
    });
  });

  it("should delete item by index", function() {
      cy.get(INPUT_NUMBER).type('1');
  
      cy.get(CIRCLE_MAIN).its('length').then((count) => {
          cy.get(CIRCLE_MAIN).eq(1).then(($item) => {
              if ($item.length > 0) {
                  const itemContent = $item.text().trim();
                  cy.log(itemContent);
  
                  cy.get('button:contains("Удалить по индексу")').should("be.enabled").click();
                  
                  cy.get(CIRCLE_MAIN).filter((index, element) => !element.className.includes("circle_small")).each(($el, index) => {
                    if(index === 0) {
                      cy.wrap($el).should("have.css", "border-color", CHANGING_STATE);
                      cy.wait(DELAY_IN_MS);
                    }
                    if(index === 1) {
                      cy.get(CIRCLE_MAIN).eq(0).should("have.css", "border-color", DEFAULT_STATE);
                      cy.wrap($el).should("have.css", "border-color", CHANGING_STATE);
                      cy.wait(DELAY_IN_MS);

                      cy.get(CIRCLE_SMALL).first().should("have.css", "border-color", CHANGING_STATE);
                      cy.get(CIRCLE_SMALL).first().contains(itemContent);
                      cy.wrap($el).should('not.have.value');
                      cy.wrap($el).should("have.css", "border-color", DEFAULT_STATE);
                    }
                  });
                  cy.wait(DELAY_IN_MS);
                  cy.get(CIRCLE_MAIN).its('length').then((newCount) => {
                    expect(newCount).to.equal(count - 1);
                });
 
              } 
          });
      });
  });
});
