describe("fibonacci alog", function () {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("МБОУ АЛГОСОШ");
    cy.get('[href="/fibonacci"]').click();
    cy.contains("Последовательность Фибоначчи");
  });
  it("should disable button if input is empty", function () {
    cy.get('input[class*="input_input"]').should("have.value", "");
    cy.contains("Развернуть").should("be.disabled");
  });
  it("should generate numbers correct", function () {
    cy.get('input[class*="input_input"]').should("have.value", "");
    cy.contains("Развернуть").should("be.disabled");
    
    cy.get('input[class*="input_input"]').type('3');
    cy.get('input[class*="input_input"]').should("have.value", '3');
    
    cy.contains("Развернуть").should("be.enabled").click();
    cy.clock();
    
    cy.get('div[class*="circle_circle"]').should("have.length", 1).each(($el, index, $divs) => {
      if(index === 0) {
        cy.wrap($el).contains("1");
        cy.get('p[class*="circle_index"]').contains(0);
      }
    });
    cy.tick(500);
    cy.get('div[class*="circle_circle"]').should("have.length", 2).each(($el, index, $divs) => {
      if(index === 1) {
        cy.wrap($el).contains("1");
        cy.get('p[class*="circle_index"]').contains(1);
      }
    });
    cy.tick(500);
    cy.get('div[class*="circle_circle"]').should("have.length", 3).each(($el, index, $divs) => {
      if(index === 2) {
        cy.wrap($el).contains("2");
        cy.get('p[class*="circle_index"]').contains(2);
      }
    });
    cy.tick(500);
    cy.get('div[class*="circle_circle"]').should("have.length", 4).each(($el, index, $divs) => {
      if(index === 3) {
        cy.wrap($el).contains("3");
        cy.get('p[class*="circle_index"]').contains(3);
      }
    });
  });
});
