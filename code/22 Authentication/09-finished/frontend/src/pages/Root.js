import { useEffect } from 'react';
import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { getTokenDuration } from '../util/auth';

function RootLayout() {
  // Getting the token
  const token = useLoaderData();
  // Using 'useSubmit' hook to programmatically trigger an action
  const submit = useSubmit();
  // const navigation = useNavigation();
  // Using 'useEffect' hook to set timeout for expiring auth token after 1 hour
  useEffect(() => {
    // If there is no token, there is nothing to do
    if (!token) {
      return;
    }

    // If token has already expired, trigger the logout action
    if (token === 'EXPIRED') {
      submit(null, { action: '/logout', method: 'post' });
      return;
    }

    // If token has not yet expired, set the timeout so that the token expires after its current
    // remaining time and logs the user out. This is necessary because without this, reloading the
    // page would set the timeout again to 1 hour instead of the remaining time.
    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);

    setTimeout(() => {
      submit(null, { action: '/logout', method: 'post' });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
