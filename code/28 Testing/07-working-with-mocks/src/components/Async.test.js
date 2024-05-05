import { render, screen } from '@testing-library/react';
import Async from './Async';

describe('Async component', () => {
  test('renders posts if request succeeds', async () => {
    // We can also mock functions such as 'fetch' to allow it to return a mock data instead of
    // actually sending the HTTP response to get the data.
    window.fetch = jest.fn();
    // This will mock the 'fetch' function to resolve to the given value once. We provide a 'json'
    // key which contains an async function as the value which will get resolved and provide the data.
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: 'p1', title: 'First post' }],
    });
    render(<Async />);

    const listItemElements = await screen.findAllByRole('listitem');
    expect(listItemElements).not.toHaveLength(0);
  });
});
