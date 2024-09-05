import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';

const EventDetails = () => {
  const { id } = useParams(); // Get the event ID from the URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/events/${id}`)
      .then(response => response.json())
      .then(data => {
        setEvent(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching event details:', error);
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-danger">Error loading event details.</p>;
  if (!event) return <p className="text-center">Event not found.</p>;

  function extractImageFilename(image) {
    const parts = image.split('/');
    return parts[parts.length - 1];
  }

  return (
    <>
      <NavBar />
      <div className="container my-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card mb-4 shadow-sm">
              <img
                src={event.image ? `http://localhost:5000/uploads/${extractImageFilename(event.image)}` : 'https://via.placeholder.com/800x400?text=No+Image'}
                alt={event.title}
                className="card-img-top"
                style={{ maxHeight: '400px', objectFit: 'cover' }}
              />
              <hr/>
              <div className="card-body">
                <h1 className="card-title text-center mb-3">{event.title}</h1>
                <h3 className="card-subtitle mb-3 text-primary text-center">{event.date}</h3>
                <p className="card-text"><strong>Time:</strong> {event.time}</p>
                <p className="card-text"><strong>Location:</strong> {event.location}</p>
                <p className="card-text"><strong>Category:</strong> {event.category}</p>
                <p className="card-text">{event.description}</p>
                <p className="card-text">
                  <strong>Price:</strong> 
                  <span style={{ color: event.price === 'Free' ? 'red' : 'green' }}>
                    {event.price}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetails;
