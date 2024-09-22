import { products } from '@wix/stores';
import styles from './product-card.module.scss';
import { ProductPrice } from '../product-price/product-price';
import { ImagePlaceholderIcon } from '../icons';

interface ProductCardProps {
    name: string;
    imageUrl?: string;
    priceData?: products.PriceData;
    ribbon?: string;
}

export const ProductCard = ({ name, imageUrl, priceData, ribbon }: ProductCardProps) => {
    return (
        <div>
            <div className={styles.imageWrapper}>
                {imageUrl ? (
                    <img src={imageUrl} alt={name} className={styles.image} />
                ) : (
                    <ImagePlaceholderIcon className={styles.imagePlaceholderIcon} />
                )}

                {ribbon && <span className={styles.ribbon}>{ribbon}</span>}
            </div>

            <p className={styles.name}>{name}</p>
            {priceData && <ProductPrice priceData={priceData} className={styles.price} />}
        </div>
    );
};
