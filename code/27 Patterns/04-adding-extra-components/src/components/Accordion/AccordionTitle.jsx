import { useAccordionContext } from './Accordion.jsx';

// Creating a separate customizable accordion title component
export default function AccordionTitle({ id, className, children }) {
  const { toggleItem } = useAccordionContext();
  return (
    <h3 className={className} onClick={() => toggleItem(id)}>
      {children}
    </h3>
  );
}
