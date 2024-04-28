import { useEffect } from 'react';
import { useFetcher } from 'react-router-dom';

import classes from './NewsletterSignup.module.css';

function NewsletterSignup() {
  // We can use the 'useFetcher' hook to use the loader or action functions defined for some
  // other route but don't want to redirect to that route which will happen if we just use 'Form'
  const fetcher = useFetcher();
  // We get the data returned and current state of the loader/action
  const { data, state } = fetcher;

  // Using 'useEffect' to show an alert if we have received some message from the loader/action
  useEffect(() => {
    if (state === 'idle' && data && data.message) {
      window.alert(data.message);
    }
  }, [data, state]);

  return (
    // Using 'fetcher.Form' will not redirect to the route specified in the 'action' property
    <fetcher.Form
      method="post"
      action="/newsletter"
      className={classes.newsletter}
    >
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
