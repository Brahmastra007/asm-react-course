'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classes from './nav-link.module.css';

/* Refactoring the navigation link into this component so that we have to use 'use client'
directive only in this component and the 'MainHeader' component can still be rendered on
the server. */
export default function NavLink({ href, children }) {
  // Using this hook to get the current path name
  const path = usePathname();

  return (
    <Link
      href={href}
      className={
        // Adding the 'active' class to link if it is active
        path.startsWith(href)
          ? `${classes.link} ${classes.active}`
          : classes.link
      }
    >
      {children}
    </Link>
  );
}
