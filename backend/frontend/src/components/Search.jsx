import React, { useState } from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';

const Search = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    // Handle search form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(query);  // Callback to handle search query
        }
    };

    return (
        <div className="d-flex justify-content-center mt-5">
            <Form onSubmit={handleSubmit} className="w-50">
                <InputGroup>
                    <FormControl
                        type="text"
                        placeholder="Search..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Button variant="primary" type="submit">
                        Search
                    </Button>
                </InputGroup>
            </Form>
        </div>
    );
};

export default Search;
