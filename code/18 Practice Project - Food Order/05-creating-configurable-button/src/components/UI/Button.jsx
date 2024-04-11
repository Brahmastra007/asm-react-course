// Defining custom 'Button' component
export default function Button({ children, textOnly, className, ...props }) {
  let cssClasses = textOnly ? 'text-button' : 'button';
  cssClasses += ' ' + className;

  return (
    // Spreading all remaining props
    <button className={cssClasses} {...props}>
      {/* Adding all children elements given */}
      {children}
    </button>
  );
}
