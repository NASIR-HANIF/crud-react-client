// SearchResults.js
import React, { useContext } from 'react';
import { SearchContext } from './context/SearchContext';

const SearchResults = () => {
  const { searchQuery, searchResults } = useContext(SearchContext);

  return (
    <div className="container mt-4">
      <h2>Search Results for "{searchQuery}"</h2>
      {searchResults.length > 0 ? (
        <ul className="list-group">
          {searchResults.map((user, index) => (
            <li key={index} className="list-group-item">
              <h5>{user.name} - Age: {user.age}</h5>
              <p><strong>Work:</strong> {user.work}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Address:</strong> {user.add}</p>
              <p><strong>Description:</strong> {user.desc}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
