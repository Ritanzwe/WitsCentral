import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AllTutors = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch tutors from the backend API
    fetch('/api/tutors')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setTutors(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching tutors:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading tutors: {error.message}</p>;
  }

  function cha(image) {
    const ll = `${image}`.split("/")[2];
    return ll;
  }

  return (
    <div className="container mt-3">
      <h2 className="mb-4">Available Tutors</h2>
      <div className="row">
        {tutors.map((tutor) => (
          <Link
            to={`/tutor/${tutor._id}`}
            key={tutor._id}
            className="col-md-6 col-lg-4 col-xl-3 mb-4"
            style={{ cursor: "pointer", textDecoration: "none" }}
          >
            <div className="card shadow-sm" style={styles.card}>
              <img
                src={tutor.profileImage ? `http://localhost:5000/uploads/${cha(tutor.profileImage)}` : 'https://placehold.jp/150x150.png'}
                className="card-img-top"
                alt={tutor.userId.fullname}
                style={styles.image}
              />
              <div className="card-body" style={styles.cardBody}>
                <h5 className="card-title text-primary" style={styles.title}>
                  {tutor.userId.fullname}
                </h5>
                <p className="card-text text-muted" style={styles.subject}>
                  {tutor.subject}
                </p>
                <p className="card-text" style={styles.description}>
                  {tutor.description.length > 65
                    ? tutor.description.slice(0, 65) + '...'
                    : tutor.description}
                </p>
                <p className="card-text">
                  <strong>Availability:</strong> {tutor.isPaid ? 'Paid' : 'Free'}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// Styles object for the component
const styles = {
  card: {
    height: '400px',  // Fixed height for all cards
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '10px',
  },
  image: {
    height: '200px',  // Fixed height for the image
    objectFit: 'cover',
    borderRadius: '10px 10px 0 0',
  },
  cardBody: {
    backgroundColor: '#f8f9fa',
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: '1.2em',
    fontWeight: 'bold',
  },
  subject: {
    fontSize: '1em',
    marginBottom: '10px',
  },
  description: {
    fontSize: '0.9em',
    maxHeight: '50px',  // To control text overflow
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
};

export default AllTutors;
