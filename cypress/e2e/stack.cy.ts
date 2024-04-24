describe("stack alog", function () {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("МБОУ АЛГОСОШ");
    cy.get('[href="/stack"]').click();
    cy.contains("Стек");
  });

  it("should disable button if input is empty", function () {
    cy.get('input[class*="input_input"]').should("have.value", "");
    cy.contains("Добавить").should("be.disabled");
  });

  it("should add new element to the stack", function () {
    cy.get('input[class*="input_input"]').should("have.value", "");
    cy.contains("Добавить").should("be.disabled");
  
    cy.get('input[class*="input_input"]').type('1');
    cy.contains("Добавить").should("be.enabled").click();
  
    cy.get('div[class*="circle_circle"]')  
    .should('be.visible')      
    .its('length')           
    .then((count) => {
      cy.get('div[class*="circle_circle"]').each(($el, index, $divs) => {
        cy.clock();
        cy.wrap($el).should("have.css", "border-color", "rgb(210, 82, 225)");
        cy.get('div[class*="circle_head"]').contains('top');
        cy.get('div[class*="circle_tail"]').contains(index);
          if(index === count) {
            cy.tick(500);
            cy.wrap($el).should("have.css", "border-color", "rgb(0, 50, 255)");
          }
        })
      });
  });
  it("should delete element from the stack", function () {
    cy.clock();
    cy.get('ul').then(($container) => {
      const numberOfElements = $container.find('li').length;
      if (numberOfElements === 0) {
        cy.contains("Удалить").should("be.disabled");
      }
      else {
      
        const numberOfElements = $container.find('li').length;
        cy.get('div[class*="circle_circle"]').each(($el, index, $divs) => {
          
            if(index === numberOfElements) {
              cy.wrap($el).should("have.css", "border-color", "rgb(210, 82, 225)");
              cy.contains("Удалить").should("be.enabled").click();
              
            }
            if(index === numberOfElements - 1) {
              cy.wrap($el).should("have.css", "border-color", "rgb(0, 50, 255)");
              cy.get('div[class*="circle_head"]').contains('top');
              cy.get('div[class*="circle_tail"]').contains(index);
            }
            cy.tick(500);
          })
      }
      
    });
  });

});
