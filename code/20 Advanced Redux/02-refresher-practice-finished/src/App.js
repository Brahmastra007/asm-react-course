import { useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

function App() {
  // Cart is visible or not
  const showCart = useSelector((state) => state.ui.cartIsVisible);

  return (
    <Layout>
      {/* Show cart conditionally */}
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
