'use server';

import { redirect } from 'next/navigation';

import { saveMeal } from './meals';

export async function shareMeal(formData) {
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };

  // Pass the meal data we received from the form to save it
  await saveMeal(meal);
  // After saving the meal details, redirect to the meals page
  redirect('/meals');
}
