import { useRouteLoaderData, json } from 'react-router-dom';

import EventItem from '../components/EventItem';

function EventDetailPage() {
  // To use the loader data from a parent route, we have to use this hook and provide the id
  // of the parent route
  const data = useRouteLoaderData('event-detail');

  // Sending the event data as prop
  return <EventItem event={data.event} />;
}

export default EventDetailPage;

export async function loader({ request, params }) {
  const id = params.eventId;

  const response = await fetch('http://localhost:8080/events/' + id);

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected event.' },
      {
        status: 500,
      }
    );
  } else {
    return response;
  }
}
