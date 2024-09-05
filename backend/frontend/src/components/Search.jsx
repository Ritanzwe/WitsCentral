import { useState } from 'react';
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
        // <div className="">
            <Form onSubmit={handleSubmit} className="w-100">
                <InputGroup>
                    <FormControl
                        className='p-3'
                        type="text"
                        placeholder="Search..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Button variant="primary" type="submit" className='px-3'>
                        Search
                    </Button>
                </InputGroup>
            </Form>
        // </div>
    );
};

export default Search;
