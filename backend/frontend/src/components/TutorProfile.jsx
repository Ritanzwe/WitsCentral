import { useState, useEffect } from 'react';
import { Navbar, Nav, Dropdown, Image, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import profileImage from '/dummy.jpg';
import logo from '../assets/onepiece.jpg';

function NavBar() {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState('');
  const [userName, setUserName] = useState(''); // State for the user's name
  const { logout } = useLogout();

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem('wits'));
    if (all) {
      setProfilePic(profileImage);
      setUserName(all.userId?.fullname || 'User'); // Set the user's name from the stored data
    }
  }, [profilePic]);

  // Handle logout logic
  const handleLogout = async () => {
    localStorage.clear(); // Clear all user-related data from localStorage
    await logout();
    navigate('/login'); // Redirect to login page
  };

  // Handle edit profile logic
  const handleEditProfile = () => {
    navigate('/edit-profile'); // Redirect to edit profile page
  };

  // Handle file upload to Azure Blob Storage
  const handleFileUpload = async (event) => {
    const file = event.target.files[0]; // Get the file from input
    if (!file) return;

    try {
      // Fetch the SAS token from your backend
      const response = await fetch('/api/get-sas-token'); // Replace with your endpoint to get the SAS token
      const { sasToken } = await response.json();
      
      // Construct the Azure Blob Storage URL
      const azureBlobStorageUrl = `https://<your-storage-account>.blob.core.windows.net/<your-container-name>/${file.name}?${sasToken}`; // Replace with your Azure Blob Storage URL

      // Upload the file to Azure Blob Storage using fetch
      const uploadResponse = await fetch(azureBlobStorageUrl, {
        method: 'PUT',
        headers: {
          'x-ms-blob-type': 'BlockBlob',
          'Content-Type': file.type,
        },
        body: file,
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload file');
      }

      setProfilePic(URL.createObjectURL(file)); // Update the profile picture with the new image
      alert('Profile picture updated successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload profile picture. Please try again.');
    }
  };

  return (
    <Navbar expand="lg" style={styles.navbar}>
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <img
            src={logo}
            alt="Logo"
            style={styles.logo}
          />
          <span style={styles.brandText}>WITS CENTRAL</span>
        </Navbar.Brand>
        <Nav className="ms-auto d-flex align-items-center">
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="link"
              id="dropdown-basic"
              className="d-flex align-items-center"
              style={styles.dropdownToggle}
            >
              {profilePic ? (
                <Image
                  src={profilePic}
                  roundedCircle
                  style={styles.profileImage}
                />
              ) : (
                <i className="bi bi-person-circle" style={styles.icon}></i>
              )}
              {/* Display the user's name */}
              <h3 style={styles.userName}>{userName}</h3>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={handleEditProfile}>Edit Profile</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control type="file" onChange={handleFileUpload} />
              </Form.Group>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

// Enhanced Styles
const styles = {
  navbar: {
    backgroundColor: '#0d6efd',
    padding: '10px 20px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    height: '40px',
    width: '40px',
    borderRadius: '50%',
    marginRight: '10px',
    transition: 'transform 0.3s ease',
    objectFit: 'cover',
  },
  brandText: {
    color: '#ffffff',
    fontSize: '1.4em',
    fontWeight: 'bold',
  },
  dropdownToggle: {
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  profileImage: {
    width: '35px',
    height: '35px',
    objectFit: 'cover',
    marginLeft: '10px',
    transition: 'transform 0.3s ease',
  },
  icon: {
    fontSize: '30px',
    color: '#ffffff',
  },
  userName: {
    color: '#ffffff',
    marginLeft: '10px',
    fontSize: '1em',
  },
};

export default NavBar;
