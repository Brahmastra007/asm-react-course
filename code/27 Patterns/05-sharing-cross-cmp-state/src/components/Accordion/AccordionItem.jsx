import { createContext, useContext } from 'react';

// Creating context to pass id to child components
const AccordionItemContext = createContext();

// Function for getting the context
export function useAccordionItemContext() {
  const ctx = useContext(AccordionItemContext);

  // If context is accessed from outside the 'AccordionItem' component, throw an error
  if (!ctx) {
    throw new Error(
      'AccordionItem-related components must be wrapped by <Accordion.Item>.'
    );
  }

  return ctx;
}

export default function AccordionItem({ id, className, children }) {
  return (
    // Providing just the id as the context value
    <AccordionItemContext.Provider value={id}>
      <li className={className}>{children}</li>
    </AccordionItemContext.Provider>
  );
}
