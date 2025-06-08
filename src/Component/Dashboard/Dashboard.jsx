import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Leftbar from "./Leftbar/Leftbar";
import { Outlet } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-white">
      <Navbar />

      <div className="flex flex-1 relative overflow-hidden">

    
       <button
  onClick={() => setSidebarOpen(!sidebarOpen)}
  className={`md:hidden fixed top-20 z-30 p-2 bg-black text-white rounded-md shadow-md transition-all duration-300
    ${sidebarOpen ? "left-[50vw]" : "left-[8vw]"}`}
  aria-label="Toggle Sidebar"
>
  <FiMenu size={20} />
</button>


       
        <div
          className={`absolute md:relative top-0 left-0 h-full z-20 transition-all duration-300 ease-in-out bg-neutral-800 text-white shadow-lg
            ${sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"}
            md:translate-x-0 md:w-64`}
        >
          <Leftbar isOpen={sidebarOpen || window.innerWidth >= 768} />
        </div>

   
        <main className="flex-1 overflow-y-auto p-6 mt-16 md:mt-0 bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
