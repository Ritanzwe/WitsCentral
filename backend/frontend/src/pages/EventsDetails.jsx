import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaTag, FaMoneyBillWave } from 'react-icons/fa';

const EventDetails = () => {
  const { id } = useParams();
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

  if (loading) return <p className="text-center">Loading event details...</p>;
  if (error) return <p className="text-center text-danger">Error loading event details.</p>;
  if (!event) return <p className="text-center">Event not found.</p>;

  // Helper to extract the image filename from the full path
  function extractImageFilename(image) {
    const parts = image.split('/');
    return parts[parts.length - 1];
  }

  return (
    <>
      <NavBar />
      <div className="container my-5">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <div className="card shadow-lg">
              <img
                src={event.image ? `http://localhost:5000/uploads/${extractImageFilename(event.image)}` : 'https://via.placeholder.com/800x400?text=No+Image'}
                alt={event.title}
                className="card-img-top"
                style={{ maxHeight: '450px', objectFit: 'cover' }}
              />
              <div className="card-body p-5">
                <h1 className="card-title text-center mb-4 text-uppercase" style={{ letterSpacing: '1.5px', fontWeight: 'bold' }}>
                  {event.title}
                </h1>
                
                <div className="text-center mb-4">
                  <p className="text-muted" style={{ fontSize: '18px' }}>
                    Experience a memorable event! {event.description.length > 150 ? event.description.slice(0, 150) + '...' : event.description}
                  </p>
                </div>

                <div className="d-flex justify-content-between mb-4">
                  <div className="text-primary">
                    <FaCalendarAlt size={20} className="me-2" />
                    <strong>{new Date(event.date).toLocaleDateString()}</strong>
                  </div>
                  <div className="text-muted">
                    <FaClock size={20} className="me-2" />
                    {event.time}
                  </div>
                </div>

                <div className="mb-3">
                  <h5 className="text-info">
                    <FaMapMarkerAlt size={20} className="me-2" />
                    Location:
                  </h5>
                  <p className="fs-5">{event.location}</p>
                </div>

                <div className="mb-3">
                  <h5 className="text-secondary">
                    <FaTag size={20} className="me-2" />
                    Category:
                  </h5>
                  <p className="fs-5">{event.category}</p>
                </div>

                <div className="mb-4">
                  <h5 className="text-dark">
                    <FaMoneyBillWave size={20} className="me-2" />
                    Price:
                  </h5>
                  <p className="fs-4">
                    <strong>
                      <span className={event.price === 'Free' ? 'text-success' : 'text-danger'}>
                        {event.price === 'Free' ? 'Free Admission' : `$${event.price}`}
                      </span>
                    </strong>
                  </p>
                </div>

                {/* Add a placeholder map for the location */}
                <div className="mb-4">
                  <h5 className="text-dark">Event Location Map:</h5>
                  <div className="embed-responsive embed-responsive-16by9">
                    <iframe
                      title="Event Location"
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(event.location)}&output=embed`}
                      width="100%"
                      height="300"
                      style={{ border: '0', borderRadius: '10px' }}
                      allowFullScreen=""
                      loading="lazy"
                    ></iframe>
                  </div>
                </div>

                <div className="text-center">
                  {event.price === 'Free' ? (
                    <button className="btn btn-outline-success btn-lg">
                      RSVP Now
                    </button>
                  ) : (
                    <button className="btn btn-outline-primary btn-lg">
                      Buy Tickets
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetails;
