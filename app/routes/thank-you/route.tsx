import { useLoaderData, json } from '@remix-run/react';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { getEcomApi } from '~/api/ecom-api';
import { CategoryLink } from '~/components/category-link/category-link';
import { OrderSummary } from '~/components/order-summary/order-summary';
import styles from './thank-you.module.scss';

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const orderId = new URL(request.url).searchParams.get('orderId');
    if (!orderId) throw new Error('Order not found');
    const order = await getEcomApi().getOrder(orderId);
    return json({ order });
};

export default function ThankYouPage() {
    const { order } = useLoaderData<typeof loader>();

    return (
        <div className={styles.root}>
            <h1 className="heading4">Thank You!</h1>
            <div className={styles.subtitle}>{`You'll receive a confirmation email soon.`}</div>
            <div className={styles.orderNumber}>Order number: {order.number}</div>

            <OrderSummary order={order} />

            <CategoryLink categorySlug="all-products" className={styles.link}>
                Continue Browsing
            </CategoryLink>
        </div>
    );
}
