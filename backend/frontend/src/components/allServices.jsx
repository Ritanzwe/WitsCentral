import { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Ensure you have react-router-dom installed

const AllServices = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from API
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      }
    };

    fetchServices();
  }, []);

  const handleButtonClick = (serviceId) => {
    // Navigate to the page corresponding to the service
    navigate(`/service/${serviceId}`);
  };

  return (
    <div className='text-center mt-4'>
      <h2>Services</h2>
      <Container className="mt-4 d-flex justify-content-center align-items-center">
        <div className="d-flex flex-wrap justify-content-center">
          {services.map((service) => (
            <Button
              className='m-2 bg-white text-primary border-0 px-4'
              key={service._id}
              variant="primary"
              onClick={() => handleButtonClick(service._id)}
            >
              {service.service}
            </Button>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllServices;
