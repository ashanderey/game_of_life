import React, {useEffect, useState} from 'react';
import Field from "../Field";
import './styles.css'

export enum NODE_STATE {
    DEAD,
    ALIVE
}

export type Node = (NODE_STATE.ALIVE | NODE_STATE.DEAD);

export const getPrePosition = (dimension: number) => (position: number) => (position - 1) >= 0 ? position - 1 : dimension - 1;
export const getPostPosition = (dimension: number) => (position: number) => (position + 1) <= dimension - 1 ? position + 1 : 0;

export const getNodeScore = (field: Node[][], x: number, y: number): number => {
    const length = field.length;
    const getPrePositionWithDimention = getPrePosition(length);
    const getPostPositionWithDimention = getPostPosition(length);

    const preX = getPrePositionWithDimention(x);
    const postX = getPostPositionWithDimention(x);
    const preY = getPrePositionWithDimention(y);
    const postY = getPostPositionWithDimention(y);

    return field[preX][preY] + field[x][preY] + field[postX][preY]
        + field[preX][y] + field[postX][y]
        + field[preX][postY] + field[x][postY] + field[postX][postY];
};

export const getNodeState = (current: Node, score: number): Node =>
    ((current && (score === 2 || score === 3)) || (!current && score === 3))
        ? NODE_STATE.ALIVE
        : NODE_STATE.DEAD;


const GameOfLife: React.FC = () => {

    const [isRunning, setIsRunning] = useState(false);
    const [fieldState, setFieldState] = useState<Node[][]>(Array(50).fill(Array(50).fill(0)));

    const getNextTick = (field: Node[][]) =>
        setFieldState(field.map((row, rowIndex) =>
            row.map((line, lineIndex) =>
                getNodeState(line, getNodeScore(field, rowIndex, lineIndex))
            )
        ));

    const updateNodeValue = (x: number, y: number, newVal: Node): Node[][] =>
        fieldState.reduce((newState: Node[][], row: Node[], rowIndex) => ([
            ...newState,
            rowIndex === x
                ? row.map((item, itemIndex) =>
                    itemIndex === y
                        ? newVal
                        : item)
                : row
        ]), []);

    const toggleNode = (x: number, y: number) =>
        setFieldState(updateNodeValue(x, y, fieldState[x][y] ? NODE_STATE.DEAD : NODE_STATE.ALIVE));

    const startStopToggle = () => setIsRunning(!isRunning);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isRunning && !interval) {
            interval = setInterval(() => getNextTick(fieldState), 100)
        }
        if (!isRunning && interval) {
            clearInterval(interval);
        }
        return () => {
            interval && clearInterval(interval)
        }
    });

    return (
        <main className="App">
            <button onClick={startStopToggle}>{isRunning ? 'Stop!' : 'Start!'}</button>
            <Field fieldState={fieldState} onNodeClick={toggleNode}/>
        </main>
    );
}

export default GameOfLife;
