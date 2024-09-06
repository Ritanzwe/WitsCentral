import React, { useState } from 'react';
import NavBar from './NavBar';
import toast from 'react-hot-toast';

const CreateTutorProfile = () => {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('description', description);
    formData.append('isPaid', isPaid);
    if(!profileImage){
        toast.error("Image is required");
        return;
    }
    formData.append('image', profileImage); // Ensure this is handled correctly for file uploads

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
      setSubject('');
      setDescription('');
      setIsPaid(false);
      setProfileImage(null);

    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <NavBar />
      <div style={styles.container}>
        <h2 style={styles.title}>Create Tutor Profile</h2>
        <form onSubmit={handleFormSubmit} style={styles.form}>

          {/* Subject */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          {/* Description */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={styles.textarea}
              required
            />
          </div>

          {/* Paid or Free */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Paid</label>
            <div style={styles.radioGroup}>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  value="paid"
                  checked={isPaid}
                  onChange={() => setIsPaid(true)}
                  style={styles.radioInput}
                />{' '}
                Paid
              </label>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  value="free"
                  checked={!isPaid}
                  onChange={() => setIsPaid(false)}
                  style={styles.radioInput}
                />{' '}
                Free
              </label>
            </div>
          </div>

          {/* Image Upload */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={styles.fileInput}
            />
            {profileImage && (
              <img
                src={profileImage}
                alt="Profile Preview"
                style={styles.profilePreview}
              />
            )}
          </div>

          <button type="submit" style={styles.submitButton}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

// Styles
const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '40px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '2em',
    color: '#333',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    marginBottom: '10px',
    fontSize: '1.2em',
    color: '#555',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '1.1em',
    outline: 'none',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '1.1em',
    outline: 'none',
    height: '120px',
    resize: 'vertical',
  },
  radioGroup: {
    display: 'flex',
    gap: '15px',
  },
  radioLabel: {
    fontSize: '1.1em',
    color: '#555',
  },
  radioInput: {
    marginRight: '8px',
  },
  fileInput: {
    width: '100%',
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
    padding: '15px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1.2em',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'background-color 0.3s',
  },
  submitButtonHover: {
    backgroundColor: '#0056b3',
  },
};

export default CreateTutorProfile;
