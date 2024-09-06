import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
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
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Upcoming Events</h2>
      <div className="row g-4">
        {events.map((event) => (
          <Link
            to={`/event/${event._id}`}
            style={{ cursor: 'pointer', textDecoration: 'none' }}
            key={event._id}
            className="col-md-6 col-lg-4 col-xl-3"
          >
            <div className="card shadow-sm h-100 border-0">
              <img
                src={event.image ? `http://localhost:5000/uploads/${cha(event.image)}` : 'https://placehold.jp/300x200.png'}
                className="card-img-top"
                alt={event.title}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body" style={{ backgroundColor: '#f8f9fa' }}>
                <h5 className="card-title text-primary mb-2">{event.title}</h5>
                <p className="card-text text-muted">
                  <i className="bi bi-calendar-event"></i> {new Date(event.date).toLocaleDateString()} | <i className="bi bi-geo-alt"></i> {event.location}
                </p>
                <p className="card-text" style={{ maxHeight: '60px', overflow: 'hidden' }}>
                  {event.description.length > 65
                    ? event.description.slice(0, 65) + '...'
                    : event.description}
                </p>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <span className="badge bg-success">{event.price === 'RSVP' ? 'RSVP' : `$${event.price}`}</span>
                  <Link to={`/event/${event._id}`} className="btn btn-outline-primary btn-sm">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllEvents;
