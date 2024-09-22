import classNames from 'classnames';
import styles from './button.module.scss';

export const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button {...props} className={classNames(styles.button, props.className)}>
            {props.children}
        </button>
    );
};
