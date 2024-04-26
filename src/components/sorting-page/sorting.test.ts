import React from "react";
import { selectionSort, bubbleSort } from "./sorting-algo";
import { randomArr } from "./utils";
import { TItem } from "./sorting-page";
import { ElementStates } from "../../types/element-states";

describe("Seclection sort algorithm", () => {
  it("works with empty array", () => {
    const testArray: TItem[] = [];
    const result = selectionSort(testArray, "ascending");
    expect(result).toEqual([]);
  });

  it("works with array of several elements", () => {
    const testArray: TItem[] = [
      { "item": 73, "state": ElementStates.Default },
      { "item": 29, "state": ElementStates.Default }
    ];
    const steps = selectionSort(testArray, "ascending");

    expect(steps.length).toBeGreaterThan(0); 
    steps.forEach(step => {
      expect(step.length).toBe(testArray.length); 
    });

    expect(steps).toEqual([
      [ { item: 73, state: 'changing' }, { item: 29, state: 'default' } ],                                                                                                                                     
      [ { item: 73, state: 'changing' }, { item: 29, state: 'changing' } ],                                                                                                                                    
      [ { item: 29, state: 'changing' }, { item: 73, state: 'changing' } ],                                                                                                                                    
      [ { item: 29, state: 'changing' }, { item: 73, state: 'default' } ],
      [ { item: 29, state: 'modified' }, { item: 73, state: 'default' } ],
      [ { item: 29, state: 'modified' }, { item: 73, state: 'changing' } ],
      [ { item: 29, state: 'modified' }, { item: 73, state: 'modified' } ]
    ]);
  });

  it("works with array of one element", () => {
    const testArray: TItem[] = [
      { "item": 73, "state": ElementStates.Default }
    ];
    const steps = selectionSort(testArray, "ascending");
    console.log(steps)
    expect(steps.length).toBeGreaterThan(0); 

    expect(steps).toEqual([
      [ { item: 73, state: 'changing' } ],                                                                                                                                                                     
      [ { item: 73, state: 'modified' } ] 
    ]);
  });

});


describe("Bubble sort algorithm", () => {
  it("works with empty array", () => {
    const testArray: TItem[] = [];
    const result = bubbleSort(testArray, "ascending");
    expect(result).toEqual([]);
  });

  it("works with array of several elements", () => {
    const testArray: TItem[] = [
      { "item": 73, "state": ElementStates.Default },
      { "item": 29, "state": ElementStates.Default }
    ];
    const steps = bubbleSort(testArray, "ascending");

    expect(steps.length).toBeGreaterThan(0); 
    steps.forEach(step => {
      expect(step.length).toBe(testArray.length); 
    });

    expect(steps).toEqual([
      [ { item: 73, state: 'changing' }, { item: 29, state: 'changing' } ],                                                                                                                                    
      [ { item: 29, state: 'changing' }, { item: 73, state: 'changing' } ],                                                                                                                                    
      [ { item: 29, state: 'default' }, { item: 73, state: 'default' } ],                                                                                                                                      
      [ { item: 29, state: 'default' }, { item: 73, state: 'modified' } ],
      [ { item: 29, state: 'modified' }, { item: 73, state: 'modified' } ]
    ]);
  });

  it("works with array of one element", () => {
    const testArray: TItem[] = [
      { "item": 73, "state": ElementStates.Default }
    ];
    const steps = bubbleSort(testArray, "ascending");
    expect(steps.length).toBeGreaterThan(0); 

    expect(steps).toEqual([
      [ { item: 73, state: 'modified' } ] 
    ]);
  });

});