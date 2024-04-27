import { useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
  // We can get the data returned by loader by using the 'useLoaderData' hook
  // Although the loader returns a promise (since it is an async function), we will get the
  // actual data and not the promise
  const events = useLoaderData();

  return <EventsList events={events} />;
}

export default EventsPage;
