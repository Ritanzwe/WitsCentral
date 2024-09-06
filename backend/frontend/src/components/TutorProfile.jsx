import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { useParams } from 'react-router-dom'; // Import useParams hook

const TutorProfile = () => {
  const { id } = useParams(); // Get the tutor ID from URL params
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  function cha(image) {
    const ll = `${image}`.split("/")[2];
    return ll;
  }

  return (
    <div>
      <NavBar />
      <div style={styles.container}>
        <h2 style={styles.title}>Tutor Profile</h2>
        <div style={styles.profile}>
          <img
            src={tutorData.profileImage ? `http://localhost:5000/uploads/${cha(tutorData.profileImage)}` : ''}
            alt="Profile"
            style={styles.profileImage}
          />
          <h3 style={styles.subject}>{tutorData.subject}</h3>
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

// Styles for Tutor Profile Page
const styles = {
  container: {
    padding: '40px',
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    fontSize: '2em',
    marginBottom: '30px',
    color: '#333',
  },
  profile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  profileImage: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '20px',
  },
  subject: {
    fontSize: '1.5em',
    margin: '10px 0',
  },
  description: {
    fontSize: '1em',
    margin: '20px 0',
    color: '#555',
  },
  contactContainer: {
    marginTop: '20px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
  contactTitle: {
    fontSize: '1.2em',
    marginBottom: '10px',
    color: '#333',
  },
  contactInfo: {
    fontSize: '1em',
    color: '#555',
    whiteSpace: 'pre-wrap', // Preserves formatting for new lines
  },
};

export default TutorProfile;
