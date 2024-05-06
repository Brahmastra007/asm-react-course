// Accepting a signal parameter (along with the search term) that can abort the request, e.g. when
// we move out of the page before the request is completed.
export async function fetchEvents({ signal, searchTerm }) {
  console.log(searchTerm);
  let url = 'http://localhost:3000/events';

  // Modifying the url if a search term was sent
  if (searchTerm) {
    url += '?search=' + searchTerm;
  }

  // Sending the signal here with the request
  const response = await fetch(url, { signal: signal });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the events');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();

  return events;
}
