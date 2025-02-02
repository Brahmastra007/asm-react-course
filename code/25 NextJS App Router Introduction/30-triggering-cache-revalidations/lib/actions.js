'use server';

import { redirect } from 'next/navigation';

import { saveMeal } from './meals';
import { revalidatePath } from 'next/cache';

function isInvalidText(text) {
  return !text || text.trim() === '';
}

/* If we run 'npm run build' and then 'npm start', we would be starting a production server.
Now if we try to add a meal through the form, we would not see it on the meals page. This is
because NextJS performs some aggressive caching and during the build process, it pre-renders
all the pages of your app that are non-dynamic, e.g. the meals page.
This will enable great user experience as the first user on your website will see the finished
page without having to wait for it to render. But the downside is that it never refetches the
meals and just uses the pre-rendered pages. */

export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: 'Invalid input.',
    };
  }

  await saveMeal(meal);
  /* As we have added a new meal, revalidate the '/meals' path. Revalidate simply means that
  NextJS throws away the cache associated with those pages, e.g. the cached pages themselves.
  This by default only revalidates the '/meals' path and not any nested paths. If we pass a
  second argument as 'layout', then all the nested paths will also be revalidated as the layout
  page wraps those nested pages. */
  revalidatePath('/meals');
  redirect('/meals');
}
