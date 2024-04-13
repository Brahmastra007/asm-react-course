import { useContext } from 'react';

import Button from './UI/Button.jsx';
import logoImg from '../assets/logo.jpg';
import CartContext from '../store/CartContext.jsx';

export default function Header() {
  // Getting cart context
  const cartCtx = useContext(CartContext);

  // Getting the total number of items in the cart
  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restaurant" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
}
