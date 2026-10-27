import products from '../data/products';
import { initialCartState, isValidQuantity } from './cartReducer';

export const CART_STORAGE_KEY = 'meteora-cart-v1';

const validProductIds = new Set(products.map(({ id }) => id));

const getLocalStorage = () => {
    if (typeof window === 'undefined') {
        return null;
    }

    try {
        return window.localStorage;
    } catch {
        return null;
    }
};

export const sanitizeCartItems = (items) => {
    if (!Array.isArray(items)) {
        return [];
    }

    const quantitiesByProduct = new Map();

    items.forEach((item) => {
        if (
            !item ||
            typeof item !== 'object' ||
            !validProductIds.has(item.productId) ||
            !isValidQuantity(item.quantity)
        ) {
            return;
        }

        const currentQuantity = quantitiesByProduct.get(item.productId) ?? 0;
        const nextQuantity = currentQuantity + item.quantity;

        if (isValidQuantity(nextQuantity)) {
            quantitiesByProduct.set(item.productId, nextQuantity);
        }
    });

    return Array.from(quantitiesByProduct, ([productId, quantity]) => ({
        productId,
        quantity,
    }));
};

export const loadCartState = (storage = getLocalStorage()) => {
    if (!storage) {
        return initialCartState;
    }

    try {
        const storedValue = storage.getItem(CART_STORAGE_KEY);

        if (storedValue === null) {
            return initialCartState;
        }

        const parsedValue = JSON.parse(storedValue);

        if (
            !parsedValue ||
            typeof parsedValue !== 'object' ||
            Array.isArray(parsedValue) ||
            !Array.isArray(parsedValue.items)
        ) {
            return initialCartState;
        }

        return { items: sanitizeCartItems(parsedValue.items) };
    } catch {
        return initialCartState;
    }
};

export const persistCartState = (items, storage = getLocalStorage()) => {
    if (!storage) {
        return false;
    }

    try {
        storage.setItem(
            CART_STORAGE_KEY,
            JSON.stringify({ items: sanitizeCartItems(items) })
        );
        return true;
    } catch {
        return false;
    }
};
