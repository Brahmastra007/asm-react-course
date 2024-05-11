export default function Shop({ children }) {
  return (
    <section id="shop">
      <h2>Elegant Clothing For Everyone</h2>

      {/* Displaying the products through this 'children' prop */}
      <ul id="products">{children}</ul>
    </section>
  );
}
