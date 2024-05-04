import { useRef, useState } from 'react';

export default function SearchableList({ items, itemKeyFn, children }) {
  // Using this hook to store the last update to be made to the state. This will be used to implement
  // debouncing, i.e. to not search the list for every change made in the input and instead to search
  // only when the user has stopped typing.
  const lastChange = useRef();
  const [searchTerm, setSearchTerm] = useState('');

  const searchResults = items.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleChange(event) {
    // If a timer already exists, clear that timer and set a new one.
    if (lastChange.current) {
      clearTimeout(lastChange.current)
    }

    // Setting the ref to a timeout which will perform the state update 0.5s later and display
    // the new filtered list.
    lastChange.current = setTimeout(() => {
      // Setting ref as null after the timeout has expired
      lastChange.current = null
      setSearchTerm(event.target.value);
    }, 500);
  }

  return (
    <div className="searchable-list">
      <input type="search" placeholder="Search" onChange={handleChange} />
      <ul>
        {searchResults.map((item) => (
          <li key={itemKeyFn(item)}>{children(item)}</li>
        ))}
      </ul>
    </div>
  );
}
