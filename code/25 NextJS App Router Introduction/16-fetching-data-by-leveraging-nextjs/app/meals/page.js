import Link from 'next/link';

import classes from './page.module.css';
import MealsGrid from '@/components/meals/meals-grid';
import { getMeals } from '@/lib/meals';

// Server components can be converted to 'async' functions
export default async function MealsPage() {
  /* Since this is a server component and so the code here runs in the server, we don't have
  to use 'useEffect' here. Instead we can directly fetch the meals from the database.
  We can also use 'async/await' for code that uses promises. */
  const meals = await getMeals();

  return (
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
          <Link href="/meals/share">
            Share Your Favorite Recipe
          </Link>
        </p>
      </header>
      <main className={classes.main}>
        {/* Pass the meals */}
        <MealsGrid meals={meals} />
      </main>
    </>
  );
}
