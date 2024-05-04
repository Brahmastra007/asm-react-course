import { useAccordionContext } from './Accordion.jsx';
import { useAccordionItemContext } from './AccordionItem.jsx';

export default function AccordionTitle({ className, children }) {
  const { toggleItem } = useAccordionContext();
  // Getting id from context
  const id = useAccordionItemContext();
  return (
    <h3 className={className} onClick={() => toggleItem(id)}>
      {children}
    </h3>
  );
}
