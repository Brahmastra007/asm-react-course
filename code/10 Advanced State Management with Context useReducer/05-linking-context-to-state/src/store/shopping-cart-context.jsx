import { createContext } from 'react';

export const CartContext = createContext({
  items: [],
  // Adding a dummy function
  addItemToCart: () => {},
});

