import products from '../data/products';

export const CART_ACTIONS = {
    ADD_PRODUCT: 'add-product',
    REMOVE_PRODUCT: 'remove-product',
    UPDATE_QUANTITY: 'update-quantity',
    CLEAR_CART: 'clear-cart',
};

export const initialCartState = {
    items: [],
};

const validProductIds = new Set(products.map(({ id }) => id));

export const isValidQuantity = (quantity) =>
    Number.isSafeInteger(quantity) && quantity > 0;

const isValidProductId = (productId) => validProductIds.has(productId);

export const cartReducer = (state, action) => {
    const productId = action.payload?.productId;

    switch (action.type) {
        case CART_ACTIONS.ADD_PRODUCT: {
            const requestedQuantity = action.payload?.quantity;
            const quantity = requestedQuantity === undefined ? 1 : requestedQuantity;

            if (!isValidProductId(productId) || !isValidQuantity(quantity)) {
                return state;
            }

            const existingItem = state.items.find(
                (item) => item.productId === productId
            );

            if (!existingItem) {
                return {
                    ...state,
                    items: [...state.items, { productId, quantity }],
                };
            }

            const nextQuantity = existingItem.quantity + quantity;

            if (!isValidQuantity(nextQuantity)) {
                return state;
            }

            return {
                ...state,
                items: state.items.map((item) =>
                    item.productId === productId
                        ? { ...item, quantity: nextQuantity }
                        : item
                ),
            };
        }

        case CART_ACTIONS.REMOVE_PRODUCT:
            if (
                !isValidProductId(productId) ||
                !state.items.some((item) => item.productId === productId)
            ) {
                return state;
            }

            return {
                ...state,
                items: state.items.filter((item) => item.productId !== productId),
            };

        case CART_ACTIONS.UPDATE_QUANTITY: {
            const quantity = action.payload?.quantity;

            if (
                !isValidProductId(productId) ||
                !isValidQuantity(quantity) ||
                !state.items.some((item) => item.productId === productId)
            ) {
                return state;
            }

            return {
                ...state,
                items: state.items.map((item) =>
                    item.productId === productId
                        ? { ...item, quantity }
                        : item
                ),
            };
        }

        case CART_ACTIONS.CLEAR_CART:
            if (state.items.length === 0) {
                return state;
            }

            return {
                ...state,
                items: [],
            };

        default:
            return state;
    }
};

export const calculateTotalQuantity = (items) =>
    items.reduce(
        (total, item) =>
            isValidProductId(item.productId) && isValidQuantity(item.quantity)
                ? total + item.quantity
                : total,
        0
    );

export const calculateSubtotal = (items) => {
    const productPrices = new Map(products.map(({ id, price }) => [id, price]));

    return items.reduce((subtotal, item) => {
        const price = productPrices.get(item.productId);

        return price !== undefined && isValidQuantity(item.quantity)
            ? subtotal + price * item.quantity
            : subtotal;
    }, 0);
};
