import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setEvents(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  function cha(image){
    const ll = `${image}`.split("/")[2];
    return ll;
  }

  return (
    <div className="container mt-3">
      <h2 className="mb-4">Upcoming Events</h2>
      <div className="row">
        {events.map((event) => (
          <Link
            to={`/event/${event._id}`}
            style={{ cursor: 'pointer', textDecoration: 'none' }}
            key={event._id}
            className="col-md-6 col-lg-4 col-xl-3 mb-4"
          >
            <div className="card shadow-sm">
              <img
                src={event.image ? `http://localhost:5000/uploads/${cha(event.image)}` : 'https://placehold.jp/150x150.png'}
                className="card-img-top"
                alt={event.title}
                style={{ height: '250px', objectFit: 'cover' }}
              />
              <div className="card-body" style={{ backgroundColor: '#f8f9fa' }}>
                <h5 className="card-title text-primary">
                  {event.title}
                </h5>
                <p className="card-text text-muted">
                  {event.date} | {event.location}
                </p>
                <p className="card-text" style={{ maxHeight: '60px', overflow: 'hidden' }}>
                  {event.description.length > 65
                    ? event.description.slice(0, 65) + '...'
                    : event.description}
                </p>
                <p className="card-text">
                  <strong>Availability:</strong> {event.price}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllEvents;
