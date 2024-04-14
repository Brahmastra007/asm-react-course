import { useCallback, useEffect, useState } from 'react';

// Defining function to send the HTTP request to the backend
async function sendHttpRequest(url, config) {
  // Send the request and get the response
  const response = await fetch(url, config);

  const resData = await response.json();

  // If request replies with bad status, throw an error
  if (!response.ok) {
    throw new Error(
      resData.message || 'Something went wrong, failed to send request.'
    );
  }

  return resData;
}

// Defining hook to send HTTP requests
export default function useHttp(url, config, initialData) {
  // Defining all states like data, loading and error
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // Defining a function for sending the request using useCallback hook so that it doesn't get
  // redefined everytime the component is rendered
  const sendRequest = useCallback(
    async function sendRequest() {
      // Set loading to true as we are now sending the request
      setIsLoading(true);
      try {
        // Send request and set data state from the data received
        const resData = await sendHttpRequest(url, config);
        setData(resData);
      } catch (error) {
        // Set the error state with the error message received in the response
        setError(error.message || 'Something went wrong!');
      }
      // Set loading to false as we are finished with the request
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    // We send the request after component renders the first time only if the request type is GET
    // If response type is POST, we will send the request later
    if ((config && (config.method === 'GET' || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    // Sending this function so that we can send request later, e.g. in the case of a POST request
    sendRequest,
  };
}
