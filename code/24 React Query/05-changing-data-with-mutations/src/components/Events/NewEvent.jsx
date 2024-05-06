import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { createNewEvent } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function NewEvent() {
  const navigate = useNavigate();

  // Using the 'useMutation' hook to send POST requests on demand
  const { mutate, isPending, isError, error } = useMutation({
    // Providing the function used to send the HTTP request
    mutationFn: createNewEvent,
  });

  function handleSubmit(formData) {
    // Using the 'mutate' function to send the POST request with the data
    mutate({ event: formData });
  }

  return (
    <Modal onClose={() => navigate('../')}>
      {/* Showing different elements conditionally based on the loading and error states of the request */}
      <EventForm onSubmit={handleSubmit}>
        {isPending && 'Submitting...'}
        {!isPending && (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Create
            </button>
          </>
        )}
      </EventForm>
      {isError && (
        <ErrorBlock
          title="Failed to create event"
          message={
            error.info?.message ||
            'Failed to create event. Please check your inputs and try again later.'
          }
        />
      )}
    </Modal>
  );
}
