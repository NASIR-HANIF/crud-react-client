// SearchContext.js
import React, { createContext, useState, useEffect } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (searchQuery.trim() !== '') {
        try {
          const response = await fetch(`/search?query=${searchQuery}`);
          const data = await response.json();
          setSearchResults(data);
        } catch (error) {
          console.error('Error fetching search results:', error);
          setSearchResults([]); // Reset on error
        }
      } else {
        setSearchResults([]); // Reset if query is empty
      }
    };

    fetchData();
  }, [searchQuery]); // Fetch results whenever searchQuery changes

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, searchResults }}>
      {children}
    </SearchContext.Provider>
  );
};
