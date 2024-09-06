import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import Maths from "../assets/maths.png";
import dsa from "../assets/dsa.png";
import physics from "../assets/physics.png";
import Econ from "../assets/Econ.png";
import stats from "../assets/stats.png";
import python from "../assets/python.png";
import { useNavigate } from 'react-router-dom';

const StudentDashboard = ({ studentName, studentImage, enrolledCourses }) => {
  const [greeting, setGreeting] = useState('');
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [modules, setModules] = useState([
    { title: 'Mathematics', backgroundImage: Maths },
    { title: 'Physics', backgroundImage: dsa },
    { title: 'Chemistry', backgroundImage: physics },
    { title: 'Biology', backgroundImage: Econ },
    { title: 'Computer Science', backgroundImage: stats },
    { title: 'Python', backgroundImage: python },
  ]);
  const [tutors] = useState([
    { name: 'Tutor A', bio: 'Expert in Math and Physics.', image: '/path/to/tutorA.jpg' },
    { name: 'Tutor B', bio: 'Specializes in Chemistry.', image: '/path/to/tutorB.jpg' },
    { name: 'Tutor C', bio: 'Computer Science tutor.', image: '/path/to/tutorC.jpg' },
  ]);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting('Good Morning');
    } else if (currentHour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleBecomeTutor = () => {
    // Logic for becoming a tutor (e.g., redirect to a tutor application form)
    // alert('Redirecting to the Tutor Application Form...');
    navigate("/tutorprofile");

  };

  return (
    <>
      <NavBar />

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

        {/* User Profile and Greeting */}
        <div style={styles.header}>
          <div style={styles.greetingContainer}>
            <h1 style={styles.greeting}>{greeting}, {studentName}!</h1>
          </div>
        </div>

        {/* Browse Modules Section */}
        <div style={styles.modulesSection}>
          <h2 style={styles.sectionTitle}>Browse Modules</h2>
          <div style={styles.modulesContainer}>
            {modules.map((module, index) => (
              <img
                width={"200"}
                height={"250"}
                key={index}
                src={module.backgroundImage}
                alt={module.title}
              />
            ))}
          </div>
        </div>

        {/* All Tutors Section */}
        <div style={styles.tutorsSection}>
          <h2 style={styles.sectionTitle}>All Tutors</h2>
          <div style={styles.tutorContainer}>
            {tutors.map((tutor, index) => (
              <div key={index} style={styles.tutorCard}>
                <img src={tutor.image} alt={tutor.name} style={styles.tutorImage} />
                <h3 style={styles.tutorName}>{tutor.name}</h3>
                <p style={styles.tutorBio}>{tutor.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Become a Tutor Section */}
        <div style={styles.becomeTutorSection}>
          <h2 style={styles.sectionTitle}>Interested in Becoming a Tutor?</h2>
          <button onClick={handleBecomeTutor} style={styles.becomeTutorButton}>
            Become a Tutor
          </button>
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
  largeProfileImage: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginRight: '20px',
  },
  greetingContainer: {
    textAlign: 'center',
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
  },
  tutorsSection: {
    marginTop: '40px',
  },
  tutorContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
  },
  tutorCard: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    width: '30%',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  tutorImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '10px',
    objectFit: 'cover',
  },
  tutorName: {
    fontSize: '1.5em',
    marginTop: '15px',
  },
  tutorBio: {
    fontSize: '1.2em',
    marginTop: '10px',
    color: '#555',
  },
  becomeTutorSection: {
    marginTop: '40px',
    textAlign: 'center',
  },
  becomeTutorButton: {
    padding: '15px 30px',
    fontSize: '1.2em',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default StudentDashboard;
