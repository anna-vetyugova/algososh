
import React from 'react';
import reverseStringWithSteps from './string-algo';

describe( 'String reverse algorithm', () => {
  it('works with odd amount of letters', () => {
    // arrange
    const testString = 'hello';

    // act
    const result = reverseStringWithSteps(testString);
    const reversedString = result[result.length-1].join('');

    // assert
    expect(reversedString).toEqual('olleh');
  });

  it('works with even amount of letters', () => {
    // arrange
    const testString = 'string';

    // act
    const result = reverseStringWithSteps(testString);
    const reversedString = result[result.length-1].join('');

    // assert
    expect(reversedString).toEqual('gnirts');
  }); 

  it('works with single letter', () => {
    // arrange
    const testString = 's';

    // act
    const result = reverseStringWithSteps(testString);
    const reversedString = result[result.length-1].join('');

    // assert
    expect(reversedString).toEqual('s');
  }); 

  it('works with empty string', () => {
    // arrange
    const testString = '';

    // act
    const result = reverseStringWithSteps(testString);
    const reversedString = result[result.length-1].join('');

    // assert
    expect(reversedString).toEqual('');
  });
});