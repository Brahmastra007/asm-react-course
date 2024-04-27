import { Outlet, useNavigation } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';

function RootLayout() {
  // We can use the 'useNavigation' hook to get the current navigation state, e.g. if we are
  // loading or not loading any route.
  // const navigation = useNavigation();

  return (
    <>
      <MainNavigation />
      <main>
        {/* If we are currently in the loading navigation state and have not actually navigated
        to the selected route, we can show a loading message. */}
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
