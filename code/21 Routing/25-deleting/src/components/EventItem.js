import { Link, useSubmit } from 'react-router-dom';

import classes from './EventItem.module.css';

function EventItem({ event }) {
  // Using 'useSubmit' hook which can be used to trigger an action programmatically
  const submit = useSubmit();

  function startDeleteHandler() {
    // Confirming if we want to delete the event
    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      // Triggering an action with no data and a 'DELETE' method
      // The action is executed for the current active route, or a different route by specifying
      // the route path through the key 'action'
      submit(null, { method: 'delete' });
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
