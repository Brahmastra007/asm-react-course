// Use this directive which will treat all functions in this file as server actions.
'use server';

// Put the form submission handling logic here
export async function shareMeal(formData) {
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };

  console.log(meal);
}
