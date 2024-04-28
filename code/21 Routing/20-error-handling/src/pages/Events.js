import { useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
  const data = useLoaderData();

  // We can do error handling manually like this by returning some other JSX when we get an error
  // while navigating to a route.
  // if (data.isError) {
  //   return <p>{data.message}</p>;
  // }
  const events = data.events;

  return <EventsList events={events} />;
}

export default EventsPage;

export async function loader() {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // We can return an error object as the response.
    // return { isError: true, message: 'Could not fetch events.' };
    // Or we can raise an error which would be handled by the router itself and redirect to the
    // error page.
    // Returning a 'Response' object allows us to return data as well as status of the error
    throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
      status: 500,
    });
  } else {
    return response;
  }
}
