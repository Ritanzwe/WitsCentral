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

  useEffect(() => {
    fetch('/api/tutors')
      .then(response => response.json())
      .then(data => setTutors(data))
      .catch(error => console.error('Error fetching tutors:', error));
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter tutors based on their description (bio) or name
  const filteredTutors = tutors.filter(tutor => 
    tutor.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBecomeTutor = () => {
    navigate('/tutorprofile');
  };

  // Handle module click to set the search term to the module title
  const handleModuleClick = (moduleTitle) => {
    setSearchTerm(moduleTitle);
  };

  const greeting = 'Welcome'; // Replace with dynamic data
  const studentName = 'Student'; // Replace with dynamic data

  function cha(image){
    const ll = `${image}`.split("/")[2];
    return ll;
  }

  return (
    <>
      <NavBar />

      {/* Become a Tutor Section */}
      <div style={styles.becomeTutorSection}>
        <h2 style={styles.sectionTitle}>Interested in Becoming a Tutor?</h2>
        <button onClick={handleBecomeTutor} style={styles.becomeTutorButton}>
          Become a Tutor
        </button>
      </div>

      <div style={styles.dashboard}>
        {/* Find a Perfect Tutor Box */}
        <div style={styles.tutorBox}>
          <h2 style={styles.tutorText}>Find a perfect tutor online</h2>
          <input
            type="text"
            placeholder="Search for tutors..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={styles.searchInput}
          />
        </div>

        {searchTerm === '' && (
          <>
            {/* User Profile and Greeting */}
            {/* <div style={styles.header}>
              <h1 style={styles.greeting}>{greeting}, {studentName}!</h1>
            </div> */}

            {/* Browse Modules Section */}
            <div style={styles.modulesSection}>
              <h2 style={styles.sectionTitle}>Browse Modules</h2>
              <div style={styles.modulesContainer}>
                {modules.map((module, index) => (
                  <div 
                    key={index} 
                    style={styles.module} 
                    onClick={() => handleModuleClick(module.title)} // Click handler
                  >
                    <img
                      width="200"
                      height="250"
                      src={module.backgroundImage}
                      alt={module.title}
                      style={styles.moduleImage}
                    />
                    <p style={styles.moduleTitle}>{module.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* All Tutors Section */}
        <div style={styles.tutorsSection}>
          <h2 style={styles.sectionTitle}>All Tutors</h2>
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
                    <div className="card-body" style={{ backgroundColor: '#f8f9fa' }}>
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
              <p style={styles.noTutorsMessage}>No tutors found for {`${searchTerm}`}.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// Styles
const styles = {
  dashboard: {
    padding: '50px',
    fontFamily: `'Poppins', sans-serif`,
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#f7f9fc',
  },
  tutorBox: {
    backgroundColor: '#f1f1f1',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '30px',
    textAlign: 'center',
  },
  tutorText: {
    fontSize: '2em',
    marginBottom: '15px',
  },
  searchInput: {
    width: '100%',
    padding: '15px',
    borderRadius: '10px',
    border: '1px solid #ddd',
    fontSize: '1.2em',
    outline: 'none',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '30px',
  },
  greeting: {
    fontSize: '2.8em',
    color: '#333',
  },
  modulesSection: {
    marginBottom: '40px',
  },
  sectionTitle: {
    fontSize: '2.2em',
    marginBottom: '20px',
  },
  modulesContainer: {
    display: 'flex',
    overflowX: 'scroll',
    gap: '20px',
    cursor: 'pointer', // Make it clear the modules are clickable
  },
  module: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  moduleImage: {
    borderRadius: '10px',
  },
  moduleTitle: {
    fontSize: '1.2em',
    marginTop: '10px',
  },
  tutorsSection: {
    marginTop: '40px',
  },
  noTutorsMessage: {
    fontSize: '1.4em',
    color: '#999',
    textAlign: 'center',
    marginTop: '20px',
  },
  becomeTutorSection: {
    marginBottom: '25px',
    marginTop: '25px',
    textAlign: 'center',
  },
  becomeTutorButton: {
    padding: '15px 30px',
    fontSize: '1.2em',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
  },
};

export default StudentDashboard;
