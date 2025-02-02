import Link from 'next/link';

import classes from './page.module.css';
import MealsGrid from '@/components/meals/meals-grid';

export default function MealsPage() {
  return (
    // Adding some content
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{' '}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          {/* Link to share the meal */}
          <Link href="/meals/share">
            Share Your Favorite Recipe
          </Link>
        </p>
      </header>
      <main className={classes.main}>
        {/* Adding the meals grid for displaying all meals */}
        <MealsGrid meals={[]} />
      </main>
    </>
  );
}
