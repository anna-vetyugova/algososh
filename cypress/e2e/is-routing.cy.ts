describe('app works correctly with routes', function() {
  beforeEach(() => {
    cy.visit('/');
    cy.contains('МБОУ АЛГОСОШ');
  });
  it('should open recursion algo', function() {
    cy.get('[href="/recursion"]').click();
    cy.contains('Строка');
  });
  it('should open fibonacci algo', function() {
    cy.get('[href="/fibonacci"]').click();
    cy.contains('Последовательность Фибоначчи');
  });
  it('should open sorting algo', function() {
    cy.get('[href="/sorting"]').click();
    cy.contains('Сортировка массива');
  });
  it('should open stack algo', function() {
    cy.get('[href="/stack"]').click();
    cy.contains('Стек');
  });
  it('should open queue algo', function() {
    cy.get('[href="/queue"]').click();
    cy.contains('Очередь');
  });

  it('should open list algo', function() {
    cy.get('[href="/list"]').click();
    cy.contains('Связный список');
  });
});