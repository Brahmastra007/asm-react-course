import { useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
  const data = useLoaderData();
  // Getting our events data from the data returned by the HTTP request
  const events = data.events;

  return <EventsList events={events} />;
}

export default EventsPage;

export async function loader() {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // ...
  } else {
    // The 'fetch' function returns a 'Promise' of a 'Response' object.
    // React router will first wait for the promise to get resolved after which we will get a
    // 'Response' object. React is also configured to return the data from that response.
    // Hence we can directly return the response and React will automatically get the data from it.
    return response;
  }
}
