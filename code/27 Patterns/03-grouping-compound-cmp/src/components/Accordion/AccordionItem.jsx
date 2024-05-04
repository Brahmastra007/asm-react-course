import { useAccordionContext } from './Accordion.jsx';

export default function AccordionItem({ id, className, title, children }) {
  // Getting the accordion context
  const { openItemId, toggleItem } = useAccordionContext();

  // Determining if this item is open
  const isOpen = openItemId === id;

  return (
    <li className={className}>
      {/* Toggle this item's visibility when it is clicked */}
      <h3 onClick={() => toggleItem(id)}>{title}</h3>
      <div
        // Adding different classes depending on if this item is open
        className={
          isOpen ? 'accordion-item-content open' : 'accordion-item-content'
        }
      >
        {children}
      </div>
    </li>
  );
}
