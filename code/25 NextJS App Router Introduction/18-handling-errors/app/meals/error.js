/* We need to use 'use client' directive because Next.js wants to catch all errors in the
server as well as on the client side. */
'use client';

// Error page with the reserved name 'error.js' which will be shown when an error occurs
export default function Error() {
  return (
    <main className="error">
      <h1>An error occurred!</h1>
      <p>Failed to fetch meal data. Please try again later.</p>
    </main>
  );
}
