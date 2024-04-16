import { Outlet } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import classes from './Root.module.css';

function RootLayout() {
  return (
    <>
      <MainNavigation />
      {/* Applying classes through module */}
      <main className={classes.content}>
        {/* Adding an outlet where the child element corresponding to the selected url would be inserted */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
