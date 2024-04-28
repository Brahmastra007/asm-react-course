import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
  // Destructuring the events data from the data received from loader
  const { events } = useLoaderData();

  return (
    // We can use 'Suspense' to show some fallback JSX before the data arrives
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      {/* 'Await' is used to await loading the component while the events data resolves.
      It takes a function which will render the 'EventsList' component after the data arrives. */}
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

// This function is almost the same as the previous loader function
async function loadEvents() {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });
    throw json(
      { message: 'Could not fetch events.' },
      {
        status: 500,
      }
    );
  } else {
    // Here we just have to return the actual parsed data and not the promise
    const resData = await response.json();
    return resData.events;
  }
}

export function loader() {
  // We can defer the loading of data like this so that we will load other components of the page
  // and fill in the data afterwards when it arrives.
  return defer({
    events: loadEvents(),
  });
}
