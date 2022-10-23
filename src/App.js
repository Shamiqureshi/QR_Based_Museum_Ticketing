import React, {useState} from "react";
import logo from './logo.svg';
import './App.css';
import bootstrap from 'bootstrap';
import { BrowserRouter as Router, Routes, Route,useLocation } from "react-router-dom";
import Adminlogin from './components/admin/Adminlogin';
import Adminprofile from './components/admin/Adminprofile';
import Allusers from './components/admin/Allusers';
import Adminallmuseums from './components/admin/Adminallmuseums';
import Home from './components/home/Home';
import Aboutus from './components/home/Aboutus';
import Contactus from './components/home/Contactus';
import Userlogin from './components/home/Userlogin';
import Userprofile from './components/user/Userprofile';
import Allmuseums from './components/user/Allmuseums';
import Userregister from './components/home/Userregister';
import Reports from "./components/admin/Reports";
import Manageusers from "./components/admin/Manageusers";
import Managemuseums from "./components/admin/Managemuseums";
import Addmuseum from "./components/admin/Addmuseum";
import BookTicket from "./components/user/BookTicket";
import History from "./components/user/History";
import Logout from "./components/home/Logout";
import Prediction from "./components/admin/Prediction";
import ForgetPassword from "./components/home/ForgetPassword";
import IndividualPrediction from "./components/admin/IndividualPrediction";
import ManageStaff from "./components/admin/ManageStaff";
import AddStaff from "./components/admin/AddStaff";
import StaffProfile from "./components/staff/StaffProfile";
import StaffLogin from "./components/staff/StaffLogin";
import AllBookings from "./components/staff/AllBookings";
import VisitedHistory from "./components/staff/VisitedHistory";


function App() {
  const [ user, setLoginUser] = useState({})

  return (
    <div>
      <Router>
        <Routes>        
        <Route path="/adminlogin" element={<Adminlogin/>}></Route>        
        <Route path="/adminprofile" element={<Adminprofile/>}></Route>
         <Route path='/allusers' element={<Allusers />}></Route> 
         <Route path='/adminallmuseums' element={<Adminallmuseums />}></Route>
         <Route path='/reports' element={<Reports />}></Route>
         <Route path='/manageusers' element={<Manageusers />}></Route>
         <Route path='/managemuseums' element={<Managemuseums />}></Route>
         <Route path='/addmuseum' element={<Addmuseum />}></Route>

         
         <Route exact path="/" element={<Home/>}></Route>
         <Route path="/home" element={<Home/>}></Route>  
         <Route path='/aboutus' element={<Aboutus />}></Route>
         <Route path='/contactus' element={<Contactus />}></Route>
         <Route path='/userlogin' element={<Userlogin />}></Route>  
         <Route path='/userregister' element={<Userregister />}></Route>    

         <Route path="/userprofile" element={<Userprofile/>}></Route>
         <Route path='/allmuseums' element={<Allmuseums />}></Route>
         <Route path="/bookticket" element={<BookTicket/>}></Route>
         <Route path="/history" element={<History/>}></Route>
        <Route path="/logout" element={<Logout></Logout>}></Route>
        <Route path="/prediction" element={<Prediction/>}></Route>
        <Route path="forgetpassword" element={<ForgetPassword/>}></Route>
        <Route path="IndividualPrediction" element={<IndividualPrediction/>}></Route>
        <Route path="ManageStaff" element={<ManageStaff/>}></Route>
        <Route path="AddStaff" element={<AddStaff/>}></Route>
        <Route path="StaffLogin" element={<StaffLogin/>}></Route>
        <Route path="StaffProfile" element={<StaffProfile/>}></Route>
        <Route path="AllBookings" element={<AllBookings/>}></Route>
        <Route path="VisitedHistory" element={<VisitedHistory/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
