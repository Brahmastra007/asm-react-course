import Link from 'next/link';
import Image from 'next/image';

import logoImg from '@/assets/logo.png';
import classes from './main-header.module.css';

export default function MainHeader() {
  return (
    <header className={classes.header}>
      <Link className={classes.logo} href="/">
        {/* Using 'Image' component from Next.js for getting features like lazy loading for image
        so that it gets loaded only when it's visible on the screen. Here we add the attribute
        'priority' so that we always load the image as we know it will always be visible. */}
        <Image src={logoImg} alt="A plate with food on it" priority />
        NextLevel Food
      </Link>

      <nav className={classes.nav}>
        <ul>
          <li>
            <Link href="/meals">Browse Meals</Link>
          </li>
          <li>
            <Link href="/community">Foodies Community</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
