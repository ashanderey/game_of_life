import React from 'react';
import {render, fireEvent, wait, waitForElement} from '@testing-library/react';
import GameOfLife, {getPrePosition, getPostPosition, getNodeScore, getNodeState, NODE_STATE} from './';

test('limitation testing', () => {
    const field = Array(5).fill(0);
    const getPostPositionWithDimensions = getPostPosition(field.length);
    const getPrePositionWithDimensions = getPrePosition(field.length);

    const postPositions = field.map((e, index) => getPostPositionWithDimensions(index));
    expect(postPositions).toStrictEqual([1, 2, 3, 4, 0]);

    const prePositions = field.map((e, index) => getPrePositionWithDimensions(index));
    expect(prePositions).toStrictEqual([4, 0, 1, 2, 3]);
});

test('counting max', () => {
    const field = Array(5).fill(Array(5).fill(1));
    expect(getNodeScore(field, 3, 3)).toBe(8);
});

test('Check underpopulation rule', () => {
    expect(getNodeState(1, 1)).toBe(NODE_STATE.DEAD)
});

test('Check staying alive rule', () => {
    expect(getNodeState(1, 2)).toBe(NODE_STATE.ALIVE)
});

test('Check staying overpopulation rule', () => {
    expect(getNodeState(1, 4)).toBe(NODE_STATE.DEAD)
});

test('Check reproduction rule', () => {
    expect(getNodeState(0, 3)).toBe(NODE_STATE.ALIVE)
});

test('button text is changed on click', () => {
    const {getByText} = render(<GameOfLife/>);
    const button = getByText(/start/i);

    fireEvent.click(button);
    expect(button.textContent).toBe("Stop!")
});
