export default function AccordionItem({ className, children }) {
  // Moving various elements out of this component as separate components
  return <li className={className}>{children}</li>;
}
