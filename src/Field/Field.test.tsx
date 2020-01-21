import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import Field from './';

describe('renders field component', () => {
    const mockFn = jest.fn();
    const mockField = Array(5).fill(Array(5).fill(0).fill(1, 2, 3));

    const {getByTestId} = render(<Field fieldState={mockField} onNodeClick={mockFn}/>);

    test('check classed and onClick handler', () => {
        const field = getByTestId(/field/i);
        expect(field.className).toBe('field');

        const aliveNode = getByTestId(/2-2/i);
        expect(aliveNode.className).toBe('alive');

        fireEvent.click(aliveNode);
        expect(mockFn).toBeCalled()

        const deadNode = getByTestId(/3-3/i);
        expect(deadNode.className).toBe('dead');
    });
})


