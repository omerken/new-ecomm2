import { NavLink, NavLinkProps } from '@remix-run/react';
import React from 'react';
import { ROUTES } from '~/router/config';

export interface CategoryLinkProps {
    categorySlug: string;
    children: React.ReactNode;
    className?: string | NavLinkProps['className'];
}

export const CategoryLink = ({ categorySlug, children, className }: CategoryLinkProps) => {
    return (
        <NavLink to={ROUTES.products.to(categorySlug)} className={className}>
            {children}
        </NavLink>
    );
};
