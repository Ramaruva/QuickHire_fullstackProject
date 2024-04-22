import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import SideNavBar from "../components/SideNavBar";
import TopNavBar from "../components/TopNavBar";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  // const isAuth = useSelector((state)=>state.auth.isAuthenticated);
  // const [auth,setAuth] = useState(false);
  // const dispatch = useDispatch();
  // useEffect(()=>{
  //   console.log(isAuth);:(<Navigate to="/SignIn" replace />)
  // },[])

  return (
    <div className="max-h-screen flex flex-col">
      <TopNavBar />
      <main className="flex gap-5">
        <SideNavBar />
        <div className="max-w-5x1 flex-1 mx-auto py-4">
          <Outlet />
        </div>
      </main>
    </div>
  )
};

export default Home;
