import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  // Get notification from the Redux state
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    // Define async function to send the 'PUT' request to the firebase backend to update the cart state
    const sendCartData = async () => {
      // Show notification that cart data is being sent
      dispatch(
        uiActions.showNotification({
          status: 'pending',
          title: 'Sending...',
          message: 'Sending cart data!',
        })
      );
      // Send the request to the backend and await response
      const response = await fetch(
        'https://react-http-6b4a6.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),
        }
      );

      // Throw an error if request failed
      if (!response.ok) {
        throw new Error('Sending cart data failed.');
      }

      // Show notification that cart data was sent successfully
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!',
        })
      );
    };

    /* This will prevent the request to the backend the first time this component is mounted. Otherwise the initial empty cart would
    be updated in the backend. */
    if (isInitial) {
      isInitial = false;
      return;
    }

    // Send the request
    sendCartData().catch((error) => {
      // If there is any error, show the appropriate notification
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <Fragment>
      {/* Display the notification conditionally */}
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
