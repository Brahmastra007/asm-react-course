import { Link, useNavigate } from 'react-router-dom';

function HomePage() {
  // We use 'useNavigate' hook to navigate programatically
  const navigate = useNavigate();

  function navigateHandler() {
    // Navigating to specific url
    navigate('/products');
  }

  return (
    <>
      <h1>My Home Page</h1>
      <p>
        Go to <Link to="/products">the list of products</Link>.
      </p>
      <p>
        {/* Clicking this button will programatically navigate us to products page */}
        <button onClick={navigateHandler}>Navigate</button>
      </p>
    </>
  );
}

export default HomePage;
