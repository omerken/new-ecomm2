import { useEffect } from 'react';
import classNames from 'classnames';
import { RemoveScroll } from 'react-remove-scroll';
import styles from './drawer.module.scss';

interface DrawerProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const Drawer = ({ open, onClose, children }: DrawerProps) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        if (open) document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [open, onClose]);

    return (
        <div className={classNames(styles.root, { [styles.open]: open })} onClick={onClose}>
            {/* RemoveScroll disables scroll outside the drawer. */}
            <RemoveScroll enabled={open}>
                <div className={styles.drawer} onClick={(event) => event.stopPropagation()}>
                    {children}
                </div>
            </RemoveScroll>
        </div>
    );
};
