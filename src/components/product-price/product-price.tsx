import { products } from '@wix/stores';
import styles from './product-price.module.scss';
import classNames from 'classnames';

interface ProductPriceProps {
    priceData: products.PriceData;
    className?: string;
}

export const ProductPrice = ({ priceData, className }: ProductPriceProps) => {
    if (!priceData.formatted) return null;
    const hasDiscount = priceData.price !== priceData.discountedPrice;
    return (
        <div className={classNames(styles.root, className)}>
            {hasDiscount && (
                <span className={styles.beforeDiscount}>{priceData.formatted.price}</span>
            )}
            <span>
                {hasDiscount ? priceData.formatted.discountedPrice : priceData.formatted.price}
            </span>
        </div>
    );
};
