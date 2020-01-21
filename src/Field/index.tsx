import React, {memo} from 'react';
import './styles.css';

export interface FieldProps {
    fieldState: number[][];
    onNodeClick: (x: number, y: number) => void
}

export const Field: React.FC<FieldProps> = memo(({fieldState, onNodeClick}) =>
    <section
        data-testid={'field'}
        className={'field'}
    >
        {fieldState.map((row, rowIndex) =>
            row.map((item, itemIndex) =>
                <div
                    data-testid={`${rowIndex}-${itemIndex}`}
                    key={`${rowIndex}-${itemIndex}`}
                    className={item ? 'alive' : 'dead'}
                    onClick={() => onNodeClick(rowIndex, itemIndex)}
                />)
        )}
    </section>)

export default Field
