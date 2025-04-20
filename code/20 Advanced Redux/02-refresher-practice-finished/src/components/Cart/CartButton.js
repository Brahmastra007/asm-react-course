import { useDispatch, useSelector } from 'react-redux';

import { uiActions } from '../../store/ui-slice';
import classes from './CartButton.module.css';

const CartButton = (props) => {
  const dispatch = useDispatch();
  // Get total quantity of items in the cart
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

  // Dispatch toggle action to show or hide the cart
  const toggleCartHandler = () => {
    dispatch(uiActions.toggle());
  };

  return (
    // Attach the toggle cart handler
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      {/* Display the total cart quantity */}
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
