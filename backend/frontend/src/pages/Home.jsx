import { useState, useEffect } from 'react';
import { Navbar, Nav, Dropdown, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';

const Home = () => {
    const navigate = useNavigate();
    const [profilePic, setProfilePic] = useState('');
    const {logout} = useLogout();

    // Fetch the profile pic from localStorage
    useEffect(() => {
        const storedProfilePic = localStorage.getItem('profilePic');
        if (storedProfilePic) {
            setProfilePic(storedProfilePic);
        }
    }, []);

    // Handle logout logic
    const handleLogout = async() => {
        localStorage.clear();  // Clear all user-related data from localStorage
        await logout();
        navigate('/login'); // Redirect to login page
    };

    // Handle edit profile logic
    const handleEditProfile = () => {
        navigate('/edit-profile');  // Redirect to edit profile page
    };

    return (
        <div>
            {/* Navbar */}
            <Navbar bg="light" expand="lg" className="px-4">
                <Navbar.Brand href="/" className="mr-auto">
                    <img
                        src="https://example.com/logo.png" // Replace with your logo URL
                        alt="Logo"
                        style={{ height: '40px' }}
                    />
                </Navbar.Brand>
                <Nav>
                    {/* Profile Icon with Dropdown */}
                    <Dropdown align="end">
                        <Dropdown.Toggle
                            variant="light"
                            id="dropdown-basic"
                            className="d-flex align-items-center"
                        >
                            {profilePic ? (
                                <Image
                                    src={profilePic}
                                    roundedCircle
                                    style={{ width: '40px', height: '40px' }}
                                />
                            ) : (
                                <i className="bi bi-person-circle" style={{ fontSize: '30px' }}></i>
                            )}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleEditProfile}>Edit Profile</Dropdown.Item>
                            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Navbar>

            {/* Content */}
            <div className="container mt-5">
                <h1>Welcome to Your Dashboard!</h1>
                <p>This is your home page after successfully logging in. Feel free to explore the platform.</p>
            </div>
        </div>
    );
};

export default Home;
