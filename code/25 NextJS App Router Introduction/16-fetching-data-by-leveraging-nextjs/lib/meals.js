import sql from 'better-sqlite3';

const db = sql('meals.db');

// Function to get all the meals from the database
export async function getMeals() {
  /* Await a promise which introduces an arbitrary delay to simulate an action that takes
  some time. */
  await new Promise((resolve) => setTimeout(resolve, 2000));
  /* Get all the meals through 'all()' function. If there was only one meal, you could
  also use 'get()' here.
  Although the below db command doesn't return a promise, the below result is wrapped in
  a promise as we have converted this function to 'async'. */
  return db.prepare('SELECT * FROM meals').all();
}