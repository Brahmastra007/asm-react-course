import { useState } from 'react';

export default function SearchableList({ items, itemKeyFn, children }) {
  const [searchTerm, setSearchTerm] = useState('');

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
        {searchResults.map((item) => (
          // Here we call this function prop to get the key from the item
          <li key={itemKeyFn(item)}>
            {/* Instead of passing some renderable code as prop that will be the same for all items,
            we can customize how each item would be rendered by passing a function which will render
            something depending on the item. That function is called here with the item as the argument. */}
            {children(item)}
          </li>
        ))}
      </ul>
    </div>
  );
}
