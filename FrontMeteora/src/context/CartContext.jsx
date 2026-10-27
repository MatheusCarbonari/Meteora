import { createContext, useContext, useEffect, useReducer } from 'react';
import {
    CART_ACTIONS,
    calculateSubtotal,
    calculateTotalQuantity,
    cartReducer,
} from './cartReducer';
import { loadCartState, persistCartState } from './cartStorage';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(
        cartReducer,
        undefined,
        () => loadCartState()
    );

    useEffect(() => {
        persistCartState(state.items);
    }, [state.items]);

    const addProduct = (productId, quantity = 1) => {
        dispatch({
            type: CART_ACTIONS.ADD_PRODUCT,
            payload: { productId, quantity },
        });
    };

    const removeProduct = (productId) => {
        dispatch({
            type: CART_ACTIONS.REMOVE_PRODUCT,
            payload: { productId },
        });
    };

    const updateQuantity = (productId, quantity) => {
        dispatch({
            type: CART_ACTIONS.UPDATE_QUANTITY,
            payload: { productId, quantity },
        });
    };

    const clearCart = () => dispatch({ type: CART_ACTIONS.CLEAR_CART });

    const value = {
        items: state.items,
        totalQuantity: calculateTotalQuantity(state.items),
        subtotal: calculateSubtotal(state.items),
        addProduct,
        removeProduct,
        updateQuantity,
        clearCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCart deve ser utilizado dentro de CartProvider.');
    }

    return context;
};
