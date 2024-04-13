import Cart from './components/Cart.jsx';
import Header from './components/Header.jsx';
import Meals from './components/Meals.jsx';
import { CartContextProvider } from './store/CartContext.jsx';
import { UserProgressContextProvider } from './store/UserProgressContext.jsx';

function App() {
  return (
    // Adding the user progress context provider component
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        {/* Adding the Cart component */}
        <Cart />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
