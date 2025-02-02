import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getMeal } from '@/lib/meals';
import classes from './page.module.css';

export default function MealDetailsPage({ params }) {
  // Fetch the meal data through the meal slug
  const meal = getMeal(params.mealSlug);

  /* If meal is not found, show the not found page. This is done using 'notFound()' function
  which stops the component execution and displays the closest not-found or error page. */
  if (!meal) {
    notFound();
  }

  // Replace the meal instructions next-line characters with line breaks.
  meal.instructions = meal.instructions.replace(/\n/g, '<br />');

  return (
    // Display the meal details
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            {/* Anchor tag for mailing the creator */}
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          // Use this property to display instructions as HTML code
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        ></p>
      </main>
    </>
  );
}
