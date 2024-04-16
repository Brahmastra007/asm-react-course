import { NavLink } from 'react-router-dom';

import classes from './MainNavigation.module.css';

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            {/* Using 'Navlink' to get functionality based on if links are active or not */}
            <NavLink
              to="/"
              // Adding a function in 'className' which will apply different classes based on if
              // the link is active or not
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              // We can do the same for styling
              // style={({ isActive }) => ({
              //   textAlign: isActive ? 'center' : 'left',
              // })}

              // This keyword determines if the end of current url should also match this url
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
