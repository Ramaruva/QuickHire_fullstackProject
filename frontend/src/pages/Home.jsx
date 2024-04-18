import React from "react";
import { Outlet } from "react-router-dom";
import SideNavBar from "../components/SideNavBar";
import TopNavBar from "../components/TopNavBar";

const Home = () => {
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
  );
};

export default Home;
