import { useQuery } from '@tanstack/react-query';

import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';
import { fetchEvents } from '../../util/http.js';

export default function NewEventsSection() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
    // This is the amount of time under which a new request will not be sent to fetch the data.
    // This means if we fetched the data at 0s, and then we went to another page and then came back
    // to this page before 5s, the cached data will be shown and a new request would not be sent to
    // fetch the updated data. If we came back after 5s, we will be shown the cached data but a new
    // request would also be sent to fetch the updated data.
    staleTime: 5000,
    // This is the amount of time for which the cached data is stored after which it will be cleared.
    // After this interval, we could show the data only after we fetched it again.
    // gcTime: 1000
  });

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || 'Failed to fetch events.'}
      />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
