import { useRouteLoaderData } from 'react-router-dom';

import EventForm from '../components/EventForm';

function EditEventPage() {
  // To use the loader data from a parent route, we have to use this hook and provide the id
  // of the parent route
  const data = useRouteLoaderData('event-detail');

  // Sending the fetched event data to the edit form
  return <EventForm event={data.event} />;
}

export default EditEventPage;
