import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "./auth/SignIn";
// import SignUp from "./auth/signUp";
import LandingPage from "./auth/LandingPage";
import Home from "./pages/Home";
import "./globals.css";
import Profiles from "./pages/Staff/Profiles";
import RegistrationPage from "./auth/Forms/RegistrationPage";
import Education from "./auth/Forms/Education";
import AddAccount from "./pages/Staff/AddAccount";
import StaffAccounts from "./pages/Staff/StaffAccounts";
import Notifications from "./pages/common/Notifications";
import IndividualPage from "./pages/Staff/IndividualPage";
import Settings from "./pages/common/Settings";
import PasswordChange from "./pages/common/PasswordChange";
import CreateJob from "./pages/Empolyer/CreateJob";
import JobList from "./pages/Empolyer/JobList";
import PaymentPage from "./pages/common/PaymentPage";
import BrowseJobs from "./pages/Professionals/BrowseJobs";
import MatchedJobs from "./pages/Professionals/MatchedJobs";
import JobDetailsPage from "./pages/common/JobDetailsPage";
import CategoryPage from "./pages/common/CategoryPage";
import { useDispatch } from "react-redux";
import { checkAuthenticationAsync } from "./redux/authSlice";
import LoadingSpinner from "./components/LoadingSpinner";
import RegistrationSuccessPage from "./pages/common/RegistrationSuccessPage";
import AllProfiles from "./pages/Staff/AllProfiles";

const App = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
   dispatch(checkAuthenticationAsync());
   //console.log(decode);
  },[dispatch])
  return (
    <>
    <LoadingSpinner/>
    <Routes>
      <Route index element={<LandingPage />} />

      <Route path="/SignIn" element={<SignIn />} />
      {/* <Route path="/SignUp" element={<SignUp />} /> */}
      <Route path="/RegistrationPage" element={<RegistrationPage />} />
      <Route path="/education" element={<Education />} />
      <Route path="/category" element={<CategoryPage />} />
      <Route path="/registration-success" element={<RegistrationSuccessPage/>}/>

      <Route path="/home" element={<Home />}>
        {/* childrens */}
        {/* Staff routes starts here */}
        
        <Route
          path="/home/professionalReviews"
          element={
            <Profiles customerType={"Professional"} viewType={"review"} />
          }
        />
        <Route
          path="/home/employerReviews"
          element={<Profiles customerType={"Employer"} viewType={"review"} />}
        />
        <Route
          path="/home/ProfessionalLists"
          element={<Profiles customerType={"Professional"} viewType={"delete"} />}
        />
        <Route
          path="/home/employerLists"
          element={<Profiles customerType={"Employer"} viewType={"delete"} />}
        />
        <Route
          path="/home/AllCustomer" 
          element={<AllProfiles />}
          />
        <Route path="/home/individual" element={<IndividualPage />} />

        {/* Staff routes end here */}

        {/* Employer routes start here */}
        <Route path="/home/CreateJobs" element={<CreateJob />} />
        <Route path="/home/JobLists" element={<JobList />} />
        
        {/* Employer routes end here */}

        {/* Professional routes start here */}
        <Route path="/home/BrowseJobs" element={<BrowseJobs />} />
        <Route path="/home/MatchedJobs" element={<MatchedJobs />} />
        {/* Professional routes end here */}

        {/* root account routes start here */}
        <Route path="/home/createAccount" element={<AddAccount />} />
        <Route path="/home/staffAccounts" element={<StaffAccounts />} />
        {/* root account routes end here */}

        {/* common routes start here */}
        <Route path="/home/settings" element={<Settings />} />
        <Route path="/home/PasswordChange" element={<PasswordChange />} />
        <Route path="/home/notifications" element={<Notifications />} />
        <Route path="/home/payments" element={<PaymentPage />} />
        <Route path="/home/jobdetails" element={<JobDetailsPage />} />
        {/* common routes end here */}
      </Route>
    </Routes>
    </>
  );
};



export default App;
