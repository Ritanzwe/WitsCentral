import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { useParams } from 'react-router-dom';

const TutorProfile = () => {
  const { id } = useParams();
  const [tutorData, setTutorData] = useState({
    profileImage: '/default-profile.png',
    subject: '',
    description: '',
    contactInfo: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTutorData = async () => {
      try {
        const response = await fetch(`/api/tutors/${id}`);
        const data = await response.json();
        console.log(data);
        setTutorData(data);
      } catch (error) {
        setError('Error fetching tutor data');
      } finally {
        setLoading(false);
      }
    };

    fetchTutorData();
  }, [id]);

  if (loading) return <p style={styles.loading}>Loading...</p>;
  if (error) return <p style={styles.error}>{error}</p>;

  function extractImageName(image) {
    return `${image}`.split("/")[2];
  }

  return (
    <div>
      <NavBar />
      <div style={styles.container}>
        <h2 style={styles.title}>Tutor Profile</h2>
        <div style={styles.profile}>
          <img
            src={tutorData.profileImage ? `http://localhost:5000/uploads/${extractImageName(tutorData.profileImage)}` : ''}
            alt="Profile"
            style={styles.profileImage}
          />
          <h3 style={styles.subject}>{tutorData.userId.fullname}</h3>
          <h4><span className='text-primary'>can tutor:</span> {tutorData.subject}</h4>
          <p style={styles.description}>{tutorData.description}</p>
          
          <div style={styles.contactContainer}>
            <h4 style={styles.contactTitle}>Contact Us</h4>
            <pre style={styles.contactInfo}>{tutorData.contactInfo}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Styles for Tutor Profile Page
const styles = {
  container: {
    padding: '40px',
    maxWidth: '800px',
    margin: '30px auto',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
  },
  title: {
    textAlign: 'center',
    fontSize: '2.5em',
    marginBottom: '20px',
    color: '#3b3b3b',
    fontWeight: '700',
    borderBottom: '3px solid #0d6efd',
    paddingBottom: '10px',
  },
  profile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  profileImage: {
    width: '180px',
    height: '180px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
  },
  subject: {
    fontSize: '1.8em',
    margin: '10px 0',
    color: '#0d6efd',
    fontWeight: '600',
  },
  description: {
    fontSize: '1.1em',
    margin: '20px 0',
    color: '#555',
    lineHeight: '1.6',
  },
  contactContainer: {
    marginTop: '20px',
    padding: '25px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f1f7ff',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  contactTitle: {
    fontSize: '1.4em',
    marginBottom: '10px',
    color: '#333',
    fontWeight: '600',
  },
  contactInfo: {
    fontSize: '1em',
    color: '#444',
    whiteSpace: 'pre-wrap',
  },
  loading: {
    fontSize: '1.2em',
    textAlign: 'center',
    marginTop: '50px',
    color: '#0d6efd',
  },
  error: {
    fontSize: '1.2em',
    textAlign: 'center',
    marginTop: '50px',
    color: '#e63946',
  },
};

export default TutorProfile;
