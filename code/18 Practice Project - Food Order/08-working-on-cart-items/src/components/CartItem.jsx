import { currencyFormatter } from '../util/formatting.js';

// Defining a component for individual items in the cart
export default function CartItem({
  name,
  quantity,
  price,
  onIncrease,
  onDecrease,
}) {
  // Defining different elements including the buttons for increasing or decreasing the
  // quantity of the item
  return (
    <li className="cart-item">
      <p>
        {name} - {quantity} x {currencyFormatter.format(price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <span>{quantity}</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
}
