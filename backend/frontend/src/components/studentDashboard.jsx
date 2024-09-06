import { useState, useEffect } from 'react';
import NavBar from './NavBar';
import Maths from '../assets/maths.png';
import dsa from '../assets/dsa.png';
import physics from '../assets/physics.png';
import Econ from '../assets/Econ.png';
import stats from '../assets/stats.png';
import python from '../assets/python.png';
import { Link, useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [tutors, setTutors] = useState([]);

  const [modules] = useState([
    { title: 'Mathematics', backgroundImage: Maths },
    { title: 'Physics', backgroundImage: dsa },
    { title: 'Chemistry', backgroundImage: physics },
    { title: 'Biology', backgroundImage: Econ },
    { title: 'Computer Science', backgroundImage: stats },
    { title: 'Python', backgroundImage: python },
  ]);

  // Fetch tutors on component mount
  useEffect(() => {
    fetch('/api/tutors')
      .then(response => response.json())
      .then(data => setTutors(data))
      .catch(error => console.error('Error fetching tutors:', error));
  }, []);

  // Handle input search changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter tutors by their subject matching the search term
  const filteredTutors = tutors.filter(tutor => 
    tutor.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Navigate to the "Become a Tutor" profile page
  const handleBecomeTutor = () => {
    navigate('/tutorprofile');
  };

  // Set the search term to the clicked module title
  const handleModuleClick = (moduleTitle) => {
    setSearchTerm(moduleTitle);
  };

  // Extract the filename from image URL
  function cha(image) {
    const ll = `${image}`.split("/")[2];
    return ll;
  }

  return (
    <>
      <NavBar />

      {/* Become a Tutor Section */}
      <div className="text-center my-5">
        <h2>Interested in Becoming a Tutor?</h2>
        <button 
          onClick={handleBecomeTutor} 
          className="btn btn-primary btn-lg mt-3"
        >
          Become a Tutor
        </button>
      </div>

      <div className="container">
        {/* Find a Perfect Tutor Box */}
        <div className="p-4 mb-5 bg-light rounded text-center">
          <h2 className="mb-4">Find a perfect tutor online</h2>
          <input
            type="text"
            placeholder="Search for tutors..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="form-control form-control-lg"
          />
        </div>

        {/* Display modules if no search term is entered */}
        {searchTerm === '' && (
          <div className="my-5">
            <h2 className="text-center mb-4">Browse Modules</h2>
            <div className="d-flex justify-content-center flex-wrap gap-4">
              {modules.map((module, index) => (
                <div 
                  key={index} 
                  className="text-center"
                  onClick={() => handleModuleClick(module.title)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    width="200"
                    height="250"
                    src={module.backgroundImage}
                    alt={module.title}
                    className="img-fluid rounded"
                  />
                  <p className="mt-2">{module.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Display tutors */}
        <div className="mt-5">
          <h2 className="text-center mb-4">All Tutors</h2>
          <div className="row">
            {filteredTutors.length > 0 ? (
              filteredTutors.map(tutor => (
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
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-body bg-light">
                      <h5 className="card-title text-primary">
                        {tutor.userId.fullname}
                      </h5>
                      <p className="card-text text-muted">
                        {tutor.subject}
                      </p>
                      <p className="card-text" style={{ maxHeight: '60px', overflow: 'hidden' }}>
                        {tutor.description.length > 40
                          ? tutor.description.slice(0, 40) + '...'
                          : tutor.description}
                      </p>
                      <p className="card-text">
                        <strong>Availability:</strong> {tutor.isPaid ? 'Paid' : 'Free'}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center text-muted">
                No tutors found for {`${searchTerm}`}.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
