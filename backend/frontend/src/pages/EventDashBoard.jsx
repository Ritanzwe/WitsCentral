import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Search from '../components/Search';

const EventDashboard = () => {
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorEvents, setErrorEvents] = useState(null);
  const [errorCategories, setErrorCategories] = useState(null);

  useEffect(() => {
    fetch('/api/categories')
      .then(response => response.json())
      .then(data => {
        setCategories(data);
        setLoadingCategories(false);
      })
      .catch(error => {
        console.error('Error fetching Categories:', error);
        setErrorCategories(error);
        setLoadingCategories(false);
      });
  }, []);

  useEffect(() => {
    fetch('/api/events')
      .then(response => response.json())
      .then(data => {
        setEvents(data);
        setLoadingEvents(false);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
        setErrorEvents(error);
        setLoadingEvents(false);
      });
  }, []);

  const handleCategoryChange = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory('All');
    } else {
      setSelectedCategory(category);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const truncateDescription = (description, length = 100) => {
    return description.length > length ? description.substring(0, length) + '...' : description;
  };

  if (loadingEvents || loadingCategories) return <p>Loading...</p>;
  if (errorEvents || errorCategories) return <p>Error loading data.</p>;

  const filteredEvents = events
    .filter(event => selectedCategory === 'All' || event.category === selectedCategory)
    .filter(event => event.title.toLowerCase().includes(searchTerm.toLowerCase()));

  function cha(image) {
    const ll = `${image}`.split("/")[2];
    return ll;
  }

  return (
    <>
      <NavBar />
      <div className="container my-5">
        <h1 className="text-center mb-4">Discover Campus Events</h1>

        {/* Categories Navigation */}
        <div className="d-flex justify-content-center mb-4 flex-wrap gap-3">
          {categories.map(category => (
            <button
              key={category._id}
              onClick={() => handleCategoryChange(category.category)}
              className={`btn btn-lg ${selectedCategory === category.category ? 'btn-primary' : 'btn-outline-secondary'}`}
            >
              {category.category}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="mb-4 text-center">
          <Search onSearch={handleSearchChange} />
        </div>

        {/* Events Section */}
        <div className="row">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <div key={event._id} className="col-md-6 col-lg-4 mb-4">
                <Link to={`/event/${event._id}`} style={{ textDecoration: 'none' }}>
                  <div className="card h-100 shadow-sm">
                    <img
                      src={event.image ? `http://localhost:5000/uploads/${cha(event.image)}` : ''}
                      alt={event.title}
                      className="card-img-top"
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                      <h5 className="card-title text-center">{event.title}</h5>
                      <p className="card-text text-muted text-center mb-2">
                        {truncateDescription(event.description)}
                      </p>
                      <p className="card-text text-muted text-center">
                        {event.date} | {event.time}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center text-muted">No events found for the selected category and search term.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default EventDashboard;
