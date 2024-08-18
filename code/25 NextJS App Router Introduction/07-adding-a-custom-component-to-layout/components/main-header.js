import Link from 'next/link';

import logoImg from '@/assets/logo.png';

export default function MainHeader() {
  return (
    <header>
      {/* Adding a logo image */}
      <Link href="/">
        <img src={logoImg.src} alt="A plate with food on it" />
        NextLevel Food
      </Link>

      {/* Adding navigation with links to different routes */}
      <nav>
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
