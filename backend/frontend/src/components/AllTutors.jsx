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
  function cha(image){
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
            <div className="card shadow-sm">
              <img
                src={tutor.profileImage ? `http://localhost:5000/uploads/${cha(tutor.profileImage)}` : 'https://placehold.jp/150x150.png'}
                className="card-img-top"
                alt={tutor.userId.fullname}
                style={{ height: '250px', objectFit: 'cover' }}
              />
              <div className="card-body" style={{ backgroundColor: '#f8f9fa' }}>
                <h5 className="card-title text-primary">
                  {tutor.userId.fullname}
                </h5>
                <p className="card-text text-muted">
                  {tutor.subject}
                </p>
                <p className="card-text" style={{ maxHeight: '60px', overflow: 'hidden' }}>
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

export default AllTutors;
