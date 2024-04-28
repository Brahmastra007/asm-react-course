import { useLoaderData, json } from 'react-router-dom';

import EventItem from '../components/EventItem';

function EventDetailPage() {
  const data = useLoaderData();

  return (
    // Sending event data received as props
    <EventItem event={data.event} />
  );
}

export default EventDetailPage;

// Adding the loader function for loading specific event data
export async function loader({request, params}) {
  // We can access the params to get the identifier in case of dynamic route
  const id = params.eventId;

  // Sending the request and returning the response
  const response = await fetch('http://localhost:8080/events/' + id);

  if (!response.ok) {
    throw json({message: 'Could not fetch details for selected event.'}, {
      status: 500
    })
  } else {
    return response;
  }
}