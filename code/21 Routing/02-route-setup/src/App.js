import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/Home';

// Initializing browser router for routing to specific components when different urls are entered
const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
]);

function App() {
  // Adding the router provider which actually routes to different components
  return <RouterProvider router={router} />;
}

export default App;
