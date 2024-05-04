import { useState } from 'react';

export default function SearchableList({ items }) {
  // Maintaining state for the search term typed in the input
  const [searchTerm, setSearchTerm] = useState('');

  // Logic for filtering items according to the search term
  const searchResults = items.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleChange(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <div className="searchable-list">
      <input type="search" placeholder="Search" onChange={handleChange} />
      <ul>
        {/* Displaying the search results */}
        {searchResults.map((item, index) => (
          <li key={index}>{item.toString()}</li>
        ))}
      </ul>
    </div>
  );
}
