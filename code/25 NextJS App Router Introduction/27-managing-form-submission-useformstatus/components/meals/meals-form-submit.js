'use client';

import { useFormStatus } from 'react-dom';

export default function MealsFormSubmit() {
  // Get the status of the form
  const { pending } = useFormStatus();

  return (
    // Disable and change the text of the button when submitting the form
    <button disabled={pending}>
      {pending ? 'Submitting...' : 'Share Meal'}
    </button>
  );
}
