import {
  Link,
  redirect,
  useNavigate,
  useParams,
  useSubmit,
  useNavigation,
} from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { fetchEvent, updateEvent, queryClient } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
  const navigate = useNavigate();
  // This hook determines what is the current state of the request we have sent
  const { state } = useNavigation();
  // This hook triggers the action
  const submit = useSubmit();
  const params = useParams();

  // Keeping the 'useQuery' data fetching logic here so that we can still use caching of data
  const { data, isError, error } = useQuery({
    queryKey: ['events', params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
    // Adding stale time of 10s so that after fetching data through loader, another redundant fetch
    // request is not sent immediately behind the scenes
    staleTime: 10000
  });

  // const { mutate } = useMutation({
  //   mutationFn: updateEvent,
  //   onMutate: async (data) => {
  //     const newEvent = data.event;

  //     await queryClient.cancelQueries({ queryKey: ['events', params.id] });
  //     const previousEvent = queryClient.getQueryData(['events', params.id]);

  //     queryClient.setQueryData(['events', params.id], newEvent);

  //     return { previousEvent };
  //   },
  //   onError: (error, data, context) => {
  //     queryClient.setQueryData(['events', params.id], context.previousEvent);
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries(['events', params.id]);
  //   },
  // });

  function handleSubmit(formData) {
    // Triggering action with method 'PUT' for handling the submission of form
    submit(formData, { method: 'PUT' });
  }

  function handleClose() {
    navigate('../');
  }

  let content;

  if (isError) {
    content = (
      <>
        <ErrorBlock
          title="Failed to load event"
          message={
            error.info?.message ||
            'Failed to load event. Please check your inputs and try again later.'
          }
        />
        <div className="form-actions">
          <Link to="../" className="button">
            Okay
          </Link>
        </div>
      </>
    );
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        {/* Using the navigation state to show some loading text while the edit event request is being sent */}
        {state === 'submitting' ? (
          <p>Sending data...</p>
        ) : (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Update
            </button>
          </>
        )}
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}

// Adding a loader function to fetch event data
export function loader({ params }) {
  // Using query client's 'fetchQuery' function to fetch the data with same parameters as 'useQuery'
  return queryClient.fetchQuery({
    queryKey: ['events', params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
  });
}

// Adding action for sending the 'POST' request to update the event
export async function action({ request, params }) {
  // Get the form data
  const formData = await request.formData();
  // Convert the data into an object of key-value pairs
  const updatedEventData = Object.fromEntries(formData);
  // Calling the 'updateEvent' function directly for sending the request
  await updateEvent({ id: params.id, event: updatedEventData });
  // Invalidating the queries
  await queryClient.invalidateQueries(['events']);
  // Redirecting to previous page
  return redirect('../');
}
