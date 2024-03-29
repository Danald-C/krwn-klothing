export const filterCartItems = (cartItems, newCartItem) => {
    const findItem = cartItems.find(cartItem => cartItem.id === newCartItem.id)

    if(findItem){
        return cartItems.map(cartItem => cartItem.id === newCartItem.id ? {...cartItem, quantity: cartItem.quantity+1} : cartItem)
    }

    return [...cartItems, {...newCartItem, quantity: 1}]
}