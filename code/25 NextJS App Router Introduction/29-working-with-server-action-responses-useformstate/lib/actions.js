'use server';

import { redirect } from 'next/navigation';

import { saveMeal } from './meals';

function isInvalidText(text) {
  return !text || text.trim() === '';
}

/* Add a new argument 'prevState' which is passed by the 'useFormState' hook to this function
along with 'formData'. The 'prevState' is either the initial state or one of the previously
generated responses. */
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
    /* If form data is invalid, send an appropriate message. But the shape of this return
    object is entirely up to you. */
    return {
      message: 'Invalid input.',
    };
  }

  await saveMeal(meal);
  redirect('/meals');
}
