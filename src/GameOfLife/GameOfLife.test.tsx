import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import GameOfLife, {getPrePosition, getPostPosition} from './';

test('limitation testing', () => {
    const field = Array(5).fill(0);
    const getPostPositionWithDimensions = getPostPosition(field.length);
    const getPrePositionWithDimensions = getPrePosition(field.length);

    const postPositions = field.map((e, index) => getPostPositionWithDimensions(index));
    expect(postPositions).toStrictEqual([1, 2, 3, 4, 0])

    const prePositions = field.map((e, index) => getPrePositionWithDimensions(index));
    expect(prePositions).toStrictEqual([4, 0, 1, 2, 3])
});


test('button text is changed on click', () => {
    const {getByText} = render(<GameOfLife/>);
    const button = getByText(/start/i);

    fireEvent.click(button);
    expect(button.textContent).toBe("Stop!")
});
