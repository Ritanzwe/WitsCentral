import { useState } from 'react';
import NavBar from '../components/NavBar';
import toast from 'react-hot-toast';

const CreateTutorProfile = () => {
  const [profileData, setProfileData] = useState({
    subject: '',
    description: '',
    isPaid: false,
    profileImage: null,
    contact: '', // New state for contact information
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleImageChange = (e) => {
    setProfileData({ ...profileData, profileImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(profileData).forEach((key) => {
      formData.append(key, profileData[key]);
    });

    if (!profileData.profileImage) {
      toast.error('Image is required');
      return;
    }

    try {
      const response = await fetch('/api/tutors', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        toast.error('Network response was not ok');
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      toast.success('Tutor profile created successfully!');

      // Clear form fields
      setProfileData({
        subject: '',
        description: '',
        isPaid: false,
        profileImage: null,
        contact: '', // Clear contact field
      });
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  return (
    <div>
      <NavBar />
      <div style={styles.container}>
        <h2 style={styles.title}>Create Tutor Profile</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={profileData.subject}
            onChange={handleChange}
            style={styles.input}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={profileData.description}
            onChange={handleChange}
            style={styles.textarea}
          />

          {/* New contact field */}
          <input
            type="text"
            name="contact"
            placeholder="Contact Information (e.g., email or phone number)"
            value={profileData.contact}
            onChange={handleChange}
            style={styles.input}
          />

          <div style={styles.radioGroup}>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="isPaid"
                value="true"
                checked={profileData.isPaid}
                onChange={() => setProfileData({ ...profileData, isPaid: true })}
                style={styles.radioInput}
              />
              Paid
            </label>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="isPaid"
                value="false"
                checked={!profileData.isPaid}
                onChange={() => setProfileData({ ...profileData, isPaid: false })}
                style={styles.radioInput}
              />
              Free
            </label>
          </div>

          <input
            type="file"
            name="profileImage"
            onChange={handleImageChange}
            style={styles.fileInput}
          />
          {profileData.profileImage && (
            <img
              src={URL.createObjectURL(profileData.profileImage)}
              alt="Profile Preview"
              style={styles.profilePreview}
            />
          )}

          <button type="submit" style={styles.submitButton}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

// Styles for Create Tutor Profile Page
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
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  input: {
    padding: '12px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '1em',
    outline: 'none',
  },
  textarea: {
    padding: '12px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '1em',
    outline: 'none',
    height: '120px',
    resize: 'vertical',
  },
  radioGroup: {
    display: 'flex',
    gap: '15px',
  },
  radioLabel: {
    fontSize: '1em',
    color: '#555',
  },
  radioInput: {
    marginRight: '8px',
  },
  fileInput: {
    padding: '8px',
    fontSize: '1em',
  },
  profilePreview: {
    marginTop: '15px',
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  submitButton: {
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1.1em',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default CreateTutorProfile;
