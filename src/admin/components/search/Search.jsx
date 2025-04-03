import React, { useState } from 'react';

const Search = ({ placeholder, onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
    
    const handleSearch = (query) => {
        setSearchQuery(query);
        onSearch(query);
    };
    
    return (
        <div className="ml-1 relative">
            <input
                type="text"
                placeholder={placeholder || "Tìm kiếm..."}
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
            <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
            </svg>
        </div>
    );
};

export default Search;
