import React from 'react';
import { useLocation, useMatches } from '@remix-run/react';
import { RouteMatch } from '~/router/types';
import styles from './breadcrumbs.module.scss';
import { ChevronRightIcon } from '~/components/icons';

export const Breadcrumbs = () => {
    const matches = useMatches() as RouteMatch[];
    const location = useLocation();

    return (
        <div className={styles.breadcrumbs}>
            {matches
                .flatMap((match) => match.handle?.breadcrumb?.(match, location) ?? [])
                .map((breadcrumb, index, arr) => (
                    <React.Fragment key={index}>
                        {breadcrumb}
                        {index !== arr.length - 1 && (
                            <ChevronRightIcon className={styles.separatorIcon} />
                        )}
                    </React.Fragment>
                ))}
        </div>
    );
};
