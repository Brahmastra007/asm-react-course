import classes from './PageContent.module.css';

// A generic page for displaying some content with a title
function PageContent({ title, children }) {
  return (
    <div className={classes.content}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

export default PageContent;
