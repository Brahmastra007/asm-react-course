import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetchEvents } from '../../util/http.js';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';

export default function FindEventSection() {
  const searchElement = useRef();
  // Setting an initial search term of 'undefined'
  const [searchTerm, setSearchTerm] = useState();

  // Using 'isLoading' which will be false when the query is disabled, unlike 'isPending' which
  // will be 'true' even when query is disabled
  const { data, isLoading, isError, error } = useQuery({
    // Using a dynamic query key to store data corresponding to a particular search term
    queryKey: ['events', { search: searchTerm }],
    // This query function is passed an object (containing 'signal', 'queryKey') for additional
    // functionality, hence we should attach our search term with that object.
    queryFn: ({ signal }) => fetchEvents({ signal, searchTerm }),
    // We can disable the query to not send a request.
    // Initially this query would be disabled, but would be enabled afterwards for every submission
    // since the search term would be a string (empty or non-empty).
    enabled: searchTerm !== undefined
  });

  function handleSubmit(event) {
    event.preventDefault();
    // Setting the search term state whenever the form is submitted so that the component is
    // re-rendered and the data fetch request is sent again.
    setSearchTerm(searchElement.current.value);
  }

  let content = <p>Please enter a search term and to find events.</p>;

  // Setting 'isLoading' here instead of 'isPending' so that we don't show a loading indicator
  // initially when the query is disabled.
  if (isLoading) {
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
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      {content}
    </section>
  );
}
