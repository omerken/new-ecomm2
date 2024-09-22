import { isRouteErrorResponse } from '@remix-run/react';
import { isEcomSDKError } from '~/api/ecom-api';

/**
 * It's important to add an appropriate role and a keyboard support
 * for non-interactive HTML elements with click handlers, such as `<div onClick={handler}></div>`.
 * This function returns a basic set of attributes
 * to make the clickable element focusable and handle keyboard events.
 */
export function getClickableElementAttributes(handler: () => void) {
    return {
        role: 'button',
        tabIndex: 0,
        onClick: handler,
        onKeyUp: (event: React.KeyboardEvent) => {
            if (event.code === 'Enter' || event.code === 'Space') {
                handler();
            }
        },
    };
}

export function removeQueryStringFromUrl(url: string) {
    const { origin, pathname } = new URL(url);
    return new URL(pathname, origin).toString();
}

/*
 * Retrieves the message from a thrown error.
 * - Handles Remix ErrorResponse (non-Error instance).
 * - Handles Wix eCom SDK errors (non-Error instance).
 * - Converts plain objects to a JSON string as a measure
 *   to help identify the origin of such improper errors.
 * - Falls back on converting the value to a string.
 */
export function getErrorMessage(value: unknown): string {
    if (value instanceof Error) {
        return value.message;
    }

    if (isRouteErrorResponse(value)) {
        return value.data;
    }

    if (isEcomSDKError(value)) {
        return value.message;
    }

    if (typeof value == 'object' && value !== null) {
        try {
            return JSON.stringify(value);
        } catch {
            // ignore serialization failure
        }
    }

    return String(value);
}
