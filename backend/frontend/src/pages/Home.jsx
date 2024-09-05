import { useState, useEffect } from 'react';
import { Navbar, Nav, Dropdown, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import profileImage from '/dummy.jpg'
import logo from '../assets/onepiece.jpg'
import Search from '../components/Search';
import AllServices from "../components/AllServices";
import AllShops from '../components/AllShops';
import AllTutors from '../components/AllTutors';
import AllEvents from '../components/AllEvents';

const Home = () => {
    const navigate = useNavigate();
    const [profilePic, setProfilePic] = useState('');
    const {logout} = useLogout();

    useEffect(() => {
        const all = JSON.parse(localStorage.getItem('wits'));
        if (all) {
            // const {profilePicture} = all;
            // if(profilePic.includes("dummy")){
              setProfilePic(profileImage);
            // }
            // else{
            //   setProfilePic(profilePicture);
            // }
        }
    }, [profilePic]);

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

    const handleSearch = (query) => {
        console.log('Search query:', query);
        // Implement your search logic here
      };

    return (
        <div>
            {/* Navbar */}
            <Navbar bg="light" expand="lg" className="px-4 flex justify-content-between">
                <Navbar.Brand href="/" className="mr-auto">
                    <img
                        src={logo} // Replace with your logo URL
                        alt="Logo"
                        style={{ height: '40px' }}
                    />
                </Navbar.Brand>
                <Nav>
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

            <div style={{paddingTop: '100px',paddingBottom: '100px'}} className="w-100 d-flex justify-content-center flex-column align-items-center bg-secondary">
                <div className='w-75 px-1'>
                    <Search onSearch={handleSearch} />
                </div>
                <AllServices/>
            </div>
            <div className="container">
                <AllShops/>
                <hr/>
                <AllTutors/>
                <hr/>
                <AllEvents/>
            </div>
        </div>
    );
};

export default Home;
