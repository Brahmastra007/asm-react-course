/* Suspense is a component provided by React that allows you to handle loading states
and show fallback content until some data or resource has been loaded. */
import { Suspense } from 'react';
import Link from 'next/link';

import classes from './page.module.css';
import MealsGrid from '@/components/meals/meals-grid';
import { getMeals } from '@/lib/meals';

/* Defining a separate component for displaying the meals data so that we can show a loading
state only for this component. This way the header can be displayed independently.
Using a 'loading.js' page would show a loading page in place of both the header and meals
component. */
async function Meals() {
  const meals = await getMeals();

  return <MealsGrid meals={meals} />;
}

export default function MealsPage() {
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
          <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        {/* Add a 'Suspense' component with a fallback so that a loading state can be shown
        while the meals data is being fetched. */}
        <Suspense fallback={<p className={classes.loading}>Fetching meals...</p>}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
