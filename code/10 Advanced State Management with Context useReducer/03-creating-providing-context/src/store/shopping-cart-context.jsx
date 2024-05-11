import { createContext } from 'react';

// Creating cart context to be accessed from multiple components. We can give a default value which
// also gives autocompletion features for this context.
export const CartContext = createContext({
  items: []
});

