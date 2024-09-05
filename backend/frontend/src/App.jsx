import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login  from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Home from './pages/Home'
import {Toaster} from "react-hot-toast";
import {useAuthContext} from "./context/AuthContext.jsx";
import AddService from './components/AddService.jsx'

function App() {
  const {authUser} = useAuthContext();
  return (
    <div className='App'>
      <Routes>
        <Route path = "/" element = {authUser? <Home/> : <Navigate to = {"/login"}/>  }/>
        <Route path = "/login" element = {authUser?  <Navigate to= '/'/> : <Login /> }/>
        <Route path = "/signup" element = {authUser? <Navigate to= '/'/> : <Signup /> }/>


        <Route path = "/addservices" element = {authUser? <AddService /> : <Navigate to= '/'/> }/>


      </Routes>
      <Toaster/>
    </div>
  )
}

export default App