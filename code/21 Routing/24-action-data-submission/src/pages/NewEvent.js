import { json, redirect } from 'react-router-dom';

import EventForm from '../components/EventForm';

// Adding a form to fill in the event data
function NewEventPage() {
  return <EventForm />;
}

export default NewEventPage;

// Defining the action function which will be called when the form is submitted
export async function action({ request, params }) {
  // Awaiting the form data to be returned
  const data = await request.formData();

  // Extracting all the fields data from the form
  const eventData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  };

  // Sending a 'POST' response to the backend to save the new event data
  const response = await fetch('http://localhost:8080/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  });

  // Throwing an error if something goes wrong
  if (!response.ok) {
    throw json({ message: 'Could not save event.' }, { status: 500 });
  }

  // Redirect to all events page if data is submitted successfully
  return redirect('/events');
}
