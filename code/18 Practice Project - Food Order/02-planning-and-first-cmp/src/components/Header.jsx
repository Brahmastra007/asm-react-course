import logoImg from '../assets/logo.jpg';

// We create this 'Header' component for header of website
export default function Header() {
  // We create some HTML elements for basic features like site image and cart
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restaurant" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <button>Cart (0)</button>
      </nav>
    </header>
  );
}
