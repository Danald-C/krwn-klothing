import { createSelector } from 'reselect'

// Get the different parts of the state. Each called a Slice.
// const getUser = state => state.user;
const getCart = state => state.cart;

// This is what's called a Memorized Selector
// export const getCartItems = createSelector([getUser, getCart], (user, cart) => cart.cartItems) // The different parts/slices will be placed in the arrary in their order, and returned as an object accessible in their order.
export const getCartItems = createSelector([getCart], cart => cart.cartItems)
export const getCartItemsCount = createSelector([getCartItems], cartItems => cartItems.reduce((accumQuant, cartItem) => accumQuant+cartItem.quantity, 0))