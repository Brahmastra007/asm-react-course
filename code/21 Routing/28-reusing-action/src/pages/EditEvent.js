import { useRouteLoaderData } from 'react-router-dom';

import EventForm from '../components/EventForm';

function EditEventPage() {
  const data = useRouteLoaderData('event-detail');

  // Specifying the 'PATCH' method for the edit event submit action
  return <EventForm method="patch" event={data.event} />;
}

export default EditEventPage;
