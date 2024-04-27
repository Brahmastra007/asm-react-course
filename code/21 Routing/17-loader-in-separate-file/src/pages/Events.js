import { useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
  const events = useLoaderData();

  return <EventsList events={events} />;
}

export default EventsPage;

// Exporting the loader logic in the page component where it will most probably be used
export async function loader() {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // ...
  } else {
    const resData = await response.json();
    return resData.events;
  }
}
