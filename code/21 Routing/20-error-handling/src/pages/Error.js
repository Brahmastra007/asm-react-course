import { useRouteError } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

import PageContent from '../components/PageContent';

// Adding an error page to handle the error raised by any route
function ErrorPage() {
  // We can access the object returned when the error was raised using this hook.
  const error = useRouteError();

  let title = 'An error occurred!';
  let message = 'Something went wrong!';

  // Accessing the status of the error
  if (error.status === 500) {
    // We have to JSON parse the data to get the error message
    message = JSON.parse(error.data).message;
  }

  if (error.status === 404) {
    title = 'Not found!';
    message = 'Could not find resource or page.';
  }

  return (
    // Adding some elements including the navigation
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
