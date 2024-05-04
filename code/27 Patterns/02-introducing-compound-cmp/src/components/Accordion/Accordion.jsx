export default function Accordion({ children, className }) {
  // Forwarding whatever is added between this component's tags in the 'children' prop.
  // Here we are not adding any logic for controlling the accordion by customizing the accordion
  // items to open and close them.
  return <ul className={className}>{children}</ul>;
}
