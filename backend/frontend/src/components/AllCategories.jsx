import { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Ensure you have react-router-dom installed

const AllCategories = () => {
  const [categories, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from API
    const fetchCategory = async () => {
      try {
        const response = await fetch('/api/category');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCategory(data);
      } catch (error) {
        console.error('Failed to fetch category:', error);
      }
    };

    fetchCategory();
  }, []);

  const handleButtonClick = (categoryId) => {
    // Navigate to the page corresponding to the service
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className='text-center mt-4'>
      <h2>Categories</h2>
      <Container className="mt-4 d-flex justify-content-center align-items-center">
        <div className="d-flex flex-wrap justify-content-center">
          {categories.map((category) => (
            <Button
              className='m-2 bg-white text-primary border-0 px-4'
              key={category._id}
              variant="primary"
              onClick={() => handleButtonClick(category._id)}
            >
              {category.category}
            </Button>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllCategories;
