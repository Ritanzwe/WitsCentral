import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure you have react-router-dom installed

const AllServices = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');

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

  const handleButtonClick = (service) => {
    // Navigate to the page corresponding to the service
    if(service.includes("Student")){
      navigate(`/service/student-market`);
    }
    else{
      navigate(`/service/${service.toLowerCase()}`);
    }
  };

  return (
    <div className='text-center mt-1'>
      <h2 className='pb-3'>Explore</h2>
      <div className="d-flex justify-content-center mb-4 flex-wrap gap-3">
        {services.map(service => (
          <button
            key={service._id}
            onClick={() => handleButtonClick(service.service)}
            className={`btn btn-lg ${selectedCategory === service.service ? 'btn-primary' : 'btn-outline-secondary'}`}
          >
            {service.service}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllServices;
