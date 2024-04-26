import React from 'react';
import {render, screen} from '@testing-library/react'

import { Circle } from './circle';
import { ElementStates } from '../../../types/element-states';

describe( 'Circle component', () => {
  it('renders without letter', () => {
    render(<Circle letter={''} />);
    const circleElement = screen.getByTestId('circle');
    expect(circleElement).toMatchSnapshot();
  });
  it('renders with letter', () => {
    render(<Circle letter={'letter'} />);
    const circleElement = screen.getByTestId('circle');
    expect(circleElement).toMatchSnapshot();
  });
  it('renders with head', () => {
    render(<Circle head={'head'} />);
    const circleElement = screen.getByTestId('circle');
    expect(circleElement).toMatchSnapshot();
  });
  it('renders with react-element-head', () => {
    render(<Circle head={<Circle />} />);
    const circleElement = screen.getAllByTestId('circle');
    expect(circleElement).toMatchSnapshot();
  });
  it('renders with tail', () => {
    render(<Circle tail={'tail'} />);
    const circleElement = screen.getByTestId('circle');
    expect(circleElement).toMatchSnapshot();
  });
  it('renders with react-element-tail', () => {
    render(<Circle tail={<Circle />} />);
    const circleElement = screen.getAllByTestId('circle');
    expect(circleElement).toMatchSnapshot();
  });
  it('renders with index', () => {
    render(<Circle index={1} />);
    const circleElement = screen.getAllByTestId('circle');
    expect(circleElement).toMatchSnapshot();
  });
  it('renders with isSmall prop', () => {
    render(<Circle isSmall={true} />);
    const circleElement = screen.getByTestId('circle');
    expect(circleElement).toMatchSnapshot();
  });
  it('renders with Default state', () => {
    render(<Circle state = {ElementStates.Default} />);
    const circleElement = screen.getByTestId('circle');
    expect(circleElement).toMatchSnapshot();
  });
  it('renders with Changing state', () => {
    render(<Circle state = {ElementStates.Changing} />);
    const circleElement = screen.getByTestId('circle');
    expect(circleElement).toMatchSnapshot();
  });
  it('renders with Modified state', () => {
    render(<Circle state = {ElementStates.Modified} />);
    const circleElement = screen.getByTestId('circle');
    expect(circleElement).toMatchSnapshot();
  });
});