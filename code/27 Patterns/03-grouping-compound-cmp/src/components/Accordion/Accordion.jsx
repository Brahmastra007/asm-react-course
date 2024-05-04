import { createContext, useContext, useState } from 'react';

import AccordionItem from './AccordionItem.jsx';

// Creating context for the accordion which will determine which item is open
const AccordionContext = createContext();

// Hook to get the accordion context
export function useAccordionContext() {
  const ctx = useContext(AccordionContext);

  // If this context is accessed out of the 'Accordion' component, then we should throw an error.
  if (!ctx) {
    throw new Error(
      'Accordion-related components must be wrapped by <Accordion>.'
    );
  }

  return ctx;
}

export default function Accordion({ children, className }) {
  // State to maintain the id of the open item
  const [openItemId, setOpenItemId] = useState();

  // Function to toggle the open state of an accordion item, i.e. open if it is closed and vice versa
  function toggleItem(id) {
    setOpenItemId((prevId) => (prevId === id ? null : id));
  }

  const contextValue = {
    openItemId,
    toggleItem,
  };

  return (
    // Wrapping the accordion with the context
    <AccordionContext.Provider value={contextValue}>
      <ul className={className}>{children}</ul>
    </AccordionContext.Provider>
  );
}

// We can set the 'Item' property of the 'Accordion' as the 'AccordionItem' component so that it
// clearly indicates that both components are meant to be used together.
Accordion.Item = AccordionItem
