import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext.jsx';
import AddService from './components/AddService.jsx';
import EventDashboard from './pages/EventDashBoard.jsx';
import AdminDashboard from './pages/AdminDashboard2.jsx'; // Import the AdminDashboard component
import Events from './pages/Events.jsx'; // Import the AdminDashboard component
import AddCategories from './components/AddCategory.jsx';
import EventDetails from './pages/EventsDetails.jsx';
import StudentDashboard from './components/studentDashboard.jsx';
import CreateTutorProfile from './components/TutorProfileCreation.jsx';
import ShopDashboard from './pages/ShopDashboard.jsx';
import CreateShop from './components/CreateShop.jsx';
import ShopDetails from './components/ShopDetails.jsx';
import CreateProduct from './components/CreateProduct.jsx';
import TutorProfile from './components/TutorProfile.jsx'
import Forum from './pages/Forum.jsx';

function App() {
  const { authUser } = useAuthContext();
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <Signup />} />

        <Route path="/addservices" element={authUser ? <AddService /> : <Navigate to="/" />} />
        <Route path="/addcategories" element={authUser ? <AddCategories /> : <Navigate to="/" />} />
        <Route path="/events" element={authUser ? <EventDashboard /> : <Navigate to="/" />} />
        <Route path="/event/:id" element={authUser ? <EventDetails /> : <Navigate to="/" />} />
        <Route path="/admin" element={authUser ? <AdminDashboard /> : <Navigate to="/" />} />
        <Route path="/event-create" element={authUser ? <Events /> : <Navigate to="/" />} />
        <Route path="/student" element={authUser ? <StudentDashboard /> : <Navigate to="/" />} />
        <Route path="/tutorprofile" element={authUser ? <CreateTutorProfile /> : <Navigate to="/" />} />
        <Route path = "/tutor/:id" element = {authUser? <TutorProfile/> : <Navigate to= '/'/> }/>
        <Route path="/shopownerprofile" element={authUser ? <CreateShop /> : <Navigate to="/" />} />
        <Route path="/shop/:id" element={authUser ? <ShopDetails /> : <Navigate to="/" />} />
        <Route path="/shop/:id/product/new" element={authUser ? <CreateProduct /> : <Navigate to="/" />} />

        <Route path="/service/tutoring" element={authUser ? <StudentDashboard /> : <Navigate to="/" />} />
        <Route path="/service/student-market" element={authUser ? <ShopDashboard /> : <Navigate to="/" />} />
        <Route path="/service/events" element={authUser ? <Navigate to="/events" /> : <Navigate to="/" />} />
        <Route path="/service/forum" element={authUser ? <Forum /> : <Navigate to="/" />} />
        {/* <Route path="/service/CCDU" element={authUser ? <AdminEventPage /> : <Navigate to="/" />} /> */}
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
