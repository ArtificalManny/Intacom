// src/components/SearchBar.js

import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';

const SearchBar = () => {
    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    // Handles the change in input and updates searchInput state
    const handleChange = (e) => {
        setSearchInput(e.target.value);
    };

    useEffect(() => {
        if (searchInput.length > 0) {
            // Fetch search results only when search input has content
            const fetchResults = async () => {
                try {
                    const response = await axios.get(`/api/search?query=${searchInput}`);
                    setSearchResults(response.data.results); // Assuming backend returns { results: [...] }
                } catch (error) {
                    console.error("Error fetching search results:", error);
                }
            };
            fetchResults();
        } else {
            setSearchResults([]); // Clear results when input is cleared
        }
    }, [searchInput]);

    return (
        <div className="input-wrapper" style={{ position: 'relative', width: '300px' }}>
            <FaSearch id="search-icon" style={{ marginRight: '8px', cursor: 'pointer' }} />
            <input
                type="text"
                placeholder="Find a project..."
                value={searchInput}
                onChange={handleChange}
                style={{ padding: '8px', width: '100%' }}
            />
            {searchInput && searchResults.length > 0 && (
                <ul style={{
                    position: 'absolute',
                    top: '100%',
                    left: '0',
                    width: '100%',
                    border: '1px solid #ddd',
                    backgroundColor: 'white',
                    maxHeight: '200px',
                    overflowY: 'auto',
                    padding: '0',
                    margin: '5px 0 0 0',
                    listStyle: 'none'
                }}>
                    {searchResults.map((result, index) => (
                        <li
                            key={index}
                            style={{
                                padding: '8px',
                                cursor: 'pointer',
                                borderBottom: '1px solid #ddd'
                            }}
                            onClick={() => window.location.href = `/project/${result.id}`} // Redirect to project page
                        >
                            {result.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
