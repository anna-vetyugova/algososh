describe("string alog", function () {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("МБОУ АЛГОСОШ");
    cy.get('[href="/recursion"]').click();
    cy.contains("Строка");
  });
  it("should disable button if input is empty", function () {
    cy.get('input[class*="input_input"]').should("have.value", "");
    cy.contains("Развернуть").should("be.disabled");
  });
  it("should reverse string correctly", function () {
    cy.get('input[class*="input_input"]').should("have.value", "");
    cy.contains("Развернуть").should("be.disabled");

    cy.get('input[class*="input_input"]').type("hello");
    cy.get('input[class*="input_input"]').should("have.value", "hello");
    cy.contains("Развернуть").should("be.enabled").click();

    cy.get('div[class*="circle_circle"]').should("have.length", 5);
    cy.clock();
    cy.get('div[class*="circle_circle"]').each(($el, index, $divs) => {
      if (index === 0) {
        cy.wrap($el).contains("h");
        cy.wrap($el).should("have.css", "border-color", "rgb(210, 82, 225)");
      }
      if (index === 1) {
        cy.wrap($el).contains("e");
        cy.wrap($el).should("have.css", "border-color", "rgb(0, 50, 255)");
      }
      if (index === 2) {
        cy.wrap($el).contains("l");
        cy.wrap($el).should("have.css", "border-color", "rgb(0, 50, 255)");
      }
      if (index === 3) {
        cy.wrap($el).contains("l");
        cy.wrap($el).should("have.css", "border-color", "rgb(0, 50, 255)");
      }
      if (index === 4) {
        cy.wrap($el).contains("o");
        cy.wrap($el).should("have.css", "border-color", "rgb(210, 82, 225)");
      }
    });
    cy.tick(500);
    cy.get('div[class*="circle_circle"]').each(($el, index, $divs) => {
      if (index === 0) {
        cy.wrap($el).contains("o");
        cy.wrap($el).should("have.css", "border-color", "rgb(127, 224, 81)");
      }
      if (index === 1) {
        cy.wrap($el).contains("e");
        cy.wrap($el).should("have.css", "border-color", "rgb(210, 82, 225)");
      }
      if (index === 2) {
        cy.wrap($el).contains("l");
        cy.wrap($el).should("have.css", "border-color", "rgb(0, 50, 255)");
      }
      if (index === 3) {
        cy.wrap($el).contains("l");
        cy.wrap($el).should("have.css", "border-color", "rgb(210, 82, 225)");
      }
      if (index === 4) {
        cy.wrap($el).contains("h");
        cy.wrap($el).should("have.css", "border-color", "rgb(127, 224, 81)");
      }
    });
    cy.tick(500);
    cy.get('div[class*="circle_circle"]').each(($el, index, $divs) => {
      if (index === 0) {
        cy.wrap($el).contains("o");
        cy.wrap($el).should("have.css", "border-color", "rgb(127, 224, 81)");
      }
      if (index === 1) {
        cy.wrap($el).contains("l");
        cy.wrap($el).should("have.css", "border-color", "rgb(127, 224, 81)");
      }
      if (index === 2) {
        cy.wrap($el).contains("l");
        cy.wrap($el).should("have.css", "border-color", "rgb(127, 224, 81)");
      }
      if (index === 3) {
        cy.wrap($el).contains("e");
        cy.wrap($el).should("have.css", "border-color", "rgb(127, 224, 81)");
      }
      if (index === 4) {
        cy.wrap($el).contains("h");
        cy.wrap($el).should("have.css", "border-color", "rgb(127, 224, 81)");
      }
    });
  });
});
