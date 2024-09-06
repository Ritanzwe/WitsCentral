import { useState, useEffect } from 'react';
import { Navbar, Nav, Dropdown, Image, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import profileImage from '/dummy.jpg';
import logo from '../assets/onepiece.jpg';

function NavBar() {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState('');
  const { logout } = useLogout();

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem('wits'));
    if (all) {
      setProfilePic(profileImage);
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
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={handleEditProfile}>Edit Profile</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
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
    height: '40px', // Reduced size for better alignment
    width: '40px',
    borderRadius: '50%', // Make the logo circular
    marginRight: '10px',
    transition: 'transform 0.3s ease',
    objectFit: 'cover', // Ensure the image fits properly within the circular shape
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
    width: '35px', // Adjusted size for better proportions
    height: '35px',
    objectFit: 'cover',
    marginLeft: '10px',
    transition: 'transform 0.3s ease',
  },
  icon: {
    fontSize: '30px',
    color: '#ffffff',
  },
};

export default NavBar;
