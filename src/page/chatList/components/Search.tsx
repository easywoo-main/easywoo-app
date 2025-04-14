import React from 'react';

type SearchProps = {
    query: string;
    onSearch: (query: string) => void;
};

const Search: React.FC<SearchProps> = ({ query, onSearch }) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
    };

    return (
        <div className="mb-4">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search chats..."
                className="px-4 py-2 border border-gray-300 rounded-lg w-full"
            />
        </div>
    );
};

export default Search;
