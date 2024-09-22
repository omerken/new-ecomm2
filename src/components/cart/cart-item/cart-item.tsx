import { cart } from '@wix/ecom';
import { useRemoveItemFromCart, useUpdateCartItemQuantity } from '~/api/api-hooks';
import { media } from '@wix/sdk';
import { QuantityInput } from '~/components/quantity-input/quantity-input';
import { TrashIcon, ImagePlaceholderIcon } from '~/components/icons';
import { Spinner } from '~/components/spinner/spinner';
import classNames from 'classnames';
import debounce from 'lodash.debounce';
import styles from './cart-item.module.scss';
import { useMemo, useState } from 'react';

export interface CartItemProps {
    item: cart.LineItem;
    priceBreakdown?: cart.LineItemPricesData;
}

export const CartItem = ({ item, priceBreakdown }: CartItemProps) => {
    const productName = item.productName?.translated ?? '';

    const { trigger: removeItem, isMutating: isRemovingItem } = useRemoveItemFromCart();
    const { trigger: updateItemQuantity, isMutating: isUpdatingItemQuantity } =
        useUpdateCartItemQuantity();

    const [quantity, setQuantity] = useState(item.quantity!);

    const updateItemQuantityDebounced = useMemo(
        () => debounce(updateItemQuantity, 300),
        [updateItemQuantity]
    );

    const handleRemove = () => {
        removeItem(item._id!);
    };

    const handleQuantityChange = (value: number) => {
        setQuantity(value);
        if (value > 0) {
            updateItemQuantityDebounced({ id: item._id!, quantity: value });
        }
    };

    const image = item.image ? media.getImageUrl(item.image) : undefined;
    const isUpdatingItem = isRemovingItem || isUpdatingItemQuantity;

    return (
        <div className={classNames(styles.root, { [styles.loading]: isUpdatingItem })}>
            {image ? (
                <div className={styles.imageWrapper}>
                    <img src={image.url} alt={image.altText ?? productName} />
                </div>
            ) : (
                <div className={styles.imagePlaceholder}>
                    <ImagePlaceholderIcon className={styles.imagePlaceholderIcon} />
                </div>
            )}

            <div>
                <div className={styles.header}>
                    <span>{productName}</span>
                    <button className={styles.removeButton} onClick={handleRemove}>
                        <TrashIcon />
                    </button>
                </div>

                {item.price && (
                    <span className="paragraph3">{item.price.formattedConvertedAmount}</span>
                )}

                <div className={styles.quantityAndPrice}>
                    <QuantityInput
                        value={quantity}
                        onChange={handleQuantityChange}
                        className={styles.quantityInput}
                    />

                    {priceBreakdown?.lineItemPrice && (
                        <span>{priceBreakdown.lineItemPrice.formattedConvertedAmount}</span>
                    )}
                </div>
            </div>

            {isUpdatingItem && (
                <div className={styles.spinner}>
                    <Spinner size={50} />
                </div>
            )}
        </div>
    );
};
