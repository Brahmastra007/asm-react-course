import { useIsFetching } from '@tanstack/react-query';

export default function Header({ children }) {
  // This hook is used to determine if a request is being sent by Tanstack Query right now anywhere
  // in one of the components. This value is greater than 0 if we are currently sending a request.
  const fetching = useIsFetching();
  return (
    <>
      {/* Showing loader if a request is currently being made */}
      <div id="main-header-loading">{fetching > 0 && <progress />}</div>
      <header id="main-header">
        <div id="header-title">
          <h1>React Events</h1>
        </div>
        <nav>{children}</nav>
      </header>
    </>
  );
}
