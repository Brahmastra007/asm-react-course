import { createContext, useReducer } from 'react';

// Creating context to manage cart data from different components
// An initial context can be optionally added
const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

// Defining reducer function to make changes to the context state
function cartReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    // Find index of the item
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    // Define another variable to store the items as we should not mutate the state directly
    const updatedItems = [...state.items];

    // If item already exists then increase quantity by 1
    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    // Else push new item with quantity 1
    else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    // Return the old state combined with the updated items
    return { ...state, items: updatedItems };
  }

  if (action.type === 'REMOVE_ITEM') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    const updatedItems = [...state.items];

    // If quantity is 1, delete the item itself
    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } 
    // Else if quantity is > 1, then decrease the quantity by 1
    else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }

  return state;
}

// Defining a wrapper component which can be wrapped around components in which we
// want to access the cart context
export function CartContextProvider({ children }) {
  // Getting a cart state and action dispatcher
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  // Defining functions for adding and deleting an item
  function addItem(item) {
    dispatchCartAction({ type: 'ADD_ITEM', item });
  }

  function removeItem(id) {
    dispatchCartAction({ type: 'REMOVE_ITEM', id });
  }

  // Defining the cart context which can be accessed in other components
  const cartContext = {
    items: cart.items,
    addItem,
    removeItem
  };

  // Providing cart context as prop 'value' to the Context Provider component
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
