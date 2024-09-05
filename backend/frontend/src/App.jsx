import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login  from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Home from './pages/Home'
import {Toaster} from "react-hot-toast";
import {useAuthContext} from "./context/AuthContext.jsx";
import AddService from './components/AddService.jsx'
import EventDashboard from './pages/EventDashBoard.jsx'
import AdminEventPage from './pages/AdminDashboard.jsx'
import AddCategories from './components/AddCategory.jsx'
import StudentDashboard from './components/studentDashboard.jsx'
import CreateTutorProfile from './components/TutorProfileCreation.jsx'

function App() {
  const {authUser} = useAuthContext();
  return (
    <div className='App'>
      <Routes>
        <Route path = "/" element = {authUser? <Home/> : <Navigate to = {"/login"}/>  }/>
        <Route path = "/login" element = {authUser?  <Navigate to= '/'/> : <Login /> }/>
        <Route path = "/signup" element = {authUser? <Navigate to= '/'/> : <Signup /> }/>

{/* ======================================================================================================== */}

        <Route path = "/addservices" element = {authUser? <AddService /> : <Navigate to= '/'/> }/>
        <Route path = "/addcategories" element = {authUser? <AddCategories /> : <Navigate to= '/'/> }/>
        <Route path = "/events" element = {authUser? <EventDashboard /> : <Navigate to= '/'/> }/>
        <Route path = "/admin" element = {authUser? <AdminEventPage/> : <Navigate to= '/'/> }/>
        <Route path = "/student" element = {authUser? <StudentDashboard/> : <Navigate to= '/'/> }/>
        <Route path = "/tutorprofile" element = {authUser? <CreateTutorProfile/> : <Navigate to= '/'/> }/>


        


      </Routes>
      <Toaster/>
    </div>
  )
}

export default App