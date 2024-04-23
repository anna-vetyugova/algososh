import React from 'react';
import {render, screen} from '@testing-library/react'

import { Button } from './button';
import userEvent from '@testing-library/user-event';

describe( 'Button component', () => {
  it('renders without text', () => {
    // arrange
    render(<Button />);
    const buttonElement = screen.getByRole('button');
    
    // act
    // assert
    expect(buttonElement).toMatchSnapshot();
  });
  it('renders with text', () => {
    render(<Button text={'text'} />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toMatchSnapshot();
  });
  it('renders with disable prop', () => {
    render(<Button disabled={true} />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toMatchSnapshot();
    expect(buttonElement).toBeDisabled();
  });
  it('renders with loader prop', () => {
    render(<Button isLoader={true} />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toMatchSnapshot();
  });
  it('is clicked', () => {
    const click = jest.fn();
    render(<Button onClick={click} />);

    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement);

    expect(click).toHaveBeenCalled();
  });
});