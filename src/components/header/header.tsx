import { Link, NavLink } from '@remix-run/react';
import classNames from 'classnames';
import { ROUTES } from '~/router/config';
import styles from './header.module.scss';
import { CartIcon } from '~/components/icons';
import loginIcon from '~/assets/svg/user.svg';
import { CategoryLink } from '../category-link/category-link';
import { useCartOpen } from '../cart/cart-open-context';
import { useCart } from '~/api/api-hooks';
import { calculateCartItemsCount } from '~/api/cart-helpers';

export interface HeaderProps {
    className?: string;
}

export const Header = ({ className }: HeaderProps) => {
    const cart = useCart();
    const cartOpener = useCartOpen();

    const cartItemsCount = cart.data ? calculateCartItemsCount(cart.data) : 0;

    const menuItemStyle = ({ isActive }: { isActive: boolean }) =>
        classNames(styles.menuItem, {
            [styles.active]: isActive,
        });

    return (
        <header className={classNames(styles.root, className)}>
            <section className={styles.topBar}>
                <Link to={ROUTES.home.to()} className={styles.logo}>
                    ReClaim
                </Link>
                <div className={styles.advertisingText}>
                    Free shipping on all intl. orders over $35
                </div>
                <Link className={styles.shopNow} to={ROUTES.products.to('all-products')}>
                    Shop Now
                </Link>
            </section>
            <section className={styles.navigation}>
                <div className={styles.empty} />
                <nav className={styles.menu}>
                    <ul>
                        <li>
                            <CategoryLink categorySlug="all-products" className={menuItemStyle}>
                                Shop All
                            </CategoryLink>
                        </li>
                        <li>
                            <CategoryLink
                                categorySlug="kitchen-essentials"
                                className={menuItemStyle}
                            >
                                Kitchen
                            </CategoryLink>
                        </li>
                        <li>
                            <CategoryLink categorySlug="bath" className={menuItemStyle}>
                                Bath
                            </CategoryLink>
                        </li>
                        <li>
                            <CategoryLink categorySlug="on-the-go" className={menuItemStyle}>
                                On the Go
                            </CategoryLink>
                        </li>
                        <li>
                            <NavLink to={ROUTES.aboutUs.to()} className={menuItemStyle}>
                                About Us
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <div className={styles.actions}>
                    <Link to="/login" className={styles.logInLink}>
                        <img className={styles.loginIcon} src={loginIcon} alt="Login icon" />
                        <span>Log In</span>
                    </Link>
                    <button onClick={() => cartOpener.setIsOpen(true)}>
                        <CartIcon className={styles.cart} count={cartItemsCount} />
                    </button>
                </div>
            </section>
        </header>
    );
};
