import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <>
      <h1>My Home Page</h1>
      <p>
        {/* Adding a link to redirect to a different url */}
        Go to <Link to="/products">the list of products</Link>.
      </p>
    </>
  );
}

export default HomePage;
