import { useCart, useCartTotals } from '~/api/api-hooks';
import { useEcomAPI } from '~/api/ecom-api-context-provider';
import { Drawer } from '~/components/drawer/drawer';
import { CartItem } from './cart-item/cart-item';
import { useCartOpen } from './cart-open-context';
import styles from './cart.module.scss';
import { CloseIcon, LockIcon } from '../icons';
import { Button } from '../button/button';
import { cart } from '@wix/ecom';
import { calculateCartItemsCount } from '~/api/cart-helpers';

export const Cart = () => {
    const ecomAPI = useEcomAPI();
    const cartOpener = useCartOpen();
    const cart = useCart();
    const cartTotals = useCartTotals();

    const handleCheckout = async () => {
        const { success, url } = await ecomAPI.checkout();
        if (success && url) {
            window.location.href = url;
        } else {
            alert('Checkout failed.');
        }
    };

    const findLineItemPriceBreakdown = (item: cart.LineItem) => {
        return cartTotals.data?.calculatedLineItems.find(
            (calculatedItem) => calculatedItem.lineItemId === item._id
        )?.pricesBreakdown;
    };

    const itemsCount = cart.data ? calculateCartItemsCount(cart.data) : 0;

    return (
        <Drawer open={cartOpener.isOpen} onClose={() => cartOpener.setIsOpen(false)}>
            <div className={styles.cart}>
                <div className={styles.header}>
                    <span className="heading6">
                        Cart ({itemsCount} {itemsCount === 1 ? 'item' : 'items'})
                    </span>

                    <button
                        className={styles.closeButton}
                        onClick={() => cartOpener.setIsOpen(false)}
                    >
                        <CloseIcon />
                    </button>
                </div>

                {cart.data && cart.data.lineItems.length > 0 ? (
                    <>
                        <div className={styles.cartItems}>
                            {cart.data.lineItems.map((item) => (
                                <CartItem
                                    key={item._id}
                                    item={item}
                                    priceBreakdown={findLineItemPriceBreakdown(item)}
                                />
                            ))}
                        </div>

                        <div className={styles.footer}>
                            {cart.data.subtotal && (
                                <>
                                    <div className={styles.subtotal}>
                                        <span>Subtotal</span>
                                        <span>{cart.data.subtotal.formattedConvertedAmount}</span>
                                    </div>
                                    <div className={styles.subtotalNote}>
                                        Taxes and shipping are calculated at checkout.
                                    </div>
                                </>
                            )}

                            <Button className={styles.checkoutButton} onClick={handleCheckout}>
                                Checkout
                            </Button>

                            <div className={styles.secureCheckout}>
                                <LockIcon width={11} />
                                <span>Secure Checkout</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className={styles.emptyCartMessage}>Your cart is empty.</div>
                )}
            </div>
        </Drawer>
    );
};
