import { useState } from 'react';
import classNames from 'classnames';
import { MinusIcon, PlusIcon } from '../icons';
import styles from './quantity-input.module.scss';

type QuantityInputProps = {
    value: number;
    onChange: (value: number) => void;
    id?: string;
    className?: string;
};

export const QuantityInput = ({ value, onChange, id, className }: QuantityInputProps) => {
    const [internalValue, setInternalValue] = useState<string | undefined>();

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const strValue = event.target.value.replace(/\D/g, '');
        const numValue = Number(strValue);
        setInternalValue(strValue);
        if (numValue) onChange(numValue);
    };

    const handleBlur = () => setInternalValue(undefined);
    const increment = () => onChange(Math.max(1, Math.floor(value + 1)));
    const decrement = () => onChange(Math.max(1, Math.ceil(value - 1)));

    return (
        <div className={classNames(styles.root, className)}>
            <button className={styles.button} onClick={decrement} disabled={value <= 1}>
                <MinusIcon className={styles.icon} />
            </button>
            <input
                id={id}
                type="text"
                inputMode="numeric"
                className={classNames(styles.input, className)}
                value={internalValue ?? value}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <button className={styles.button} onClick={increment}>
                <PlusIcon className={styles.icon} />
            </button>
        </div>
    );
};
