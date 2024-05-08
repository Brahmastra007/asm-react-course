import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { fetchEvent, updateEvent, queryClient } from '../../util/http.js';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
  const navigate = useNavigate();
  // Getting the params
  const params = useParams();

  // Fetching the event data
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
  });

  const { mutate } = useMutation({
    mutationFn: updateEvent,
    // This function gets called immediately after we call 'mutate'. We also get the data passed in the
    // 'mutate' function.
    onMutate: async (data) => {
      const newEvent = data.event;

      // Cancelling any ongoing queries to fetch this event as it could fetch outdated data if this
      // request completes before the event update request is completed.
      await queryClient.cancelQueries({ queryKey: ['events', params.id] });

      // Storing the previous event data in case the update request fails.
      const previousEvent = queryClient.getQueryData(['events', params.id]);

      // Here we implement optimistic updating by setting the cached data for this event as the submitted
      // data.
      queryClient.setQueryData(['events', params.id], newEvent);

      // Returning the previous event data
      return { previousEvent };
    },
    // If we get an error in the update request, we reset the event data to its previous value.
    onError: (error, data, context) => {
      // The context is the value returned by the above 'onMutate' function.
      queryClient.setQueryData(['events', params.id], context.previousEvent);
    },
    // This function is called after this update request finished, irrespective of whether it succeeded
    // or failed.
    onSettled: () => {
      // Invalidating this event's query data to ensure that the front-end data is synced up correctly
      // to the back-end.
      queryClient.invalidateQueries(['events', params.id]);
    }
  });

  // Function for when we submit the form
  function handleSubmit(formData) {
    mutate({ id: params.id, event: formData });
    // We are implementing optimistic updating here, so we navigate to the event page immediately after
    // sending the request for updating the event. There we show the updated data for the event even
    // before the update request completes.
    navigate('../');
  }

  function handleClose() {
    navigate('../');
  }

  let content;

  // Showing loading spinner while request is executed
  if (isPending) {
    content = (
      <div className="center">
        <LoadingIndicator />
      </div>
    );
  }

  // Showing error if request for fetching event data failed
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
        {/* Adding link to go to previous page */}
        <div className="form-actions">
          <Link to="../" className="button">
            Okay
          </Link>
        </div>
      </>
    );
  }

  // Displaying the form with prepopulated event data if the request succeeded
  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}
