import classes from './loading.module.css';

/* We can use this page with the name 'loading.js' to show a loading page while the
actual content is being loaded. */
export default function MealsLoadingPage() {
  return <p className={classes.loading}>Fetching meals...</p>;
}
