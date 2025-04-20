import { createSlice } from '@reduxjs/toolkit';

// Create the Redux state slice for the cart
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    // List of items in the cart
    items: [],
    // The total quantity of all the items in the cart
    totalQuantity: 0,
  },
  reducers: {
    // Reducer to add 1 quantity of an item to the cart
    addItemToCart(state, action) {
      const newItem = action.payload;
      // Try to find out if the item is already in the cart
      const existingItem = state.items.find((item) => item.id === newItem.id);
      // Increase the cart total quantity by 1
      state.totalQuantity++;
      if (!existingItem) {
        // If item is not already in the cart, add it to the cart
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title
        });
      } else {
        // Else increase the quantity and total price of the existing item
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    // Reducer to remove 1 quantity of an item from the cart
    removeItemFromCart(state, action) {
      const id = action.payload;
      // Find the item in the cart
      const existingItem = state.items.find(item => item.id === id);
      // Decrease the cart total quantity by 1
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        // If item quantity is 1, remove the item from the cart completely
        state.items = state.items.filter(item => item.id !== id);
      } else {
        // Else decrease the quantity of the item
        existingItem.quantity--;
      }
    },
  },
});

// Export the cart actions
export const cartActions = cartSlice.actions;

export default cartSlice;