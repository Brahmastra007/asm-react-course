export default function AccordionItem({ className, title, children }) {
  return (
    // This accordion item component also forwards whatever we add between its tags as the
    // children 'prop'
    <li className={className}>
      <h3>{title}</h3>
      <div>{children}</div>
    </li>
  );
}
