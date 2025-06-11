import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { getDoc , doc, setDoc } from 'firebase/firestore';
import { db } from "../../../Config/Config";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Leftbar({ isOpen }) {
  const navigate = useNavigate()

const handleLogout =()=>{
  if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("user");
      navigate("/login"); 
    }

};

const [data , Setdata]=useState({})

  useEffect(()=>{
    
const user =  JSON.parse(localStorage.getItem("user"));
const user_id = user.user.uid


if(user_id){
const useRef =  doc(db,"users",user_id)

getDoc(useRef).then((doc)=>{
  if(doc.exists()){
    // console.log("here is the data",doc.data())

    const p =  doc.data()

    Setdata(p)
   

  
   
  }
  else{
    console.log("no data")
  }
}).catch((err)=>{
console.log("error akhil",err)
})
}else{
  console.log("error in left line 24")
}


  },[])

  



  return (
    <div
      className={` bg-black flex flex-col h-full transition-all duration-300 ease-in-out ${
        isOpen ? "p-6" : "p-4 items-center"
      }`}
    >
    
      <div className="flex flex-col items-center space-y-2">
        <div className="text-3xl p-3 bg-white text-black rounded-full shadow-md">
          <FaUserAlt />
        </div>  
        {isOpen && (
          <>
            <h2 className="text-lg font-semibold text-white">{data.name}</h2>
            <h3 className="text-sm text-gray-400">{data.email}</h3>
          </>
        )}
      </div>

      
    <nav className="mt-10 flex flex-col space-y-4 w-full">
  <Link
    to="Goals"
    className={`text-md font-medium py-3 px-50 rounded transition text-white hover:bg-white hover:text-black ${
      isOpen
        ? "flex items-center px-3 justify-start"
        : "flex items-center justify-center"
    }`}
  >
    🎯 {isOpen && <span className="ml-2">Goals</span>}
  </Link>

  <button
    className={`text-md font-medium py-3  px-50 rounded transition text-white hover:bg-white hover:text-black ${
      isOpen
        ? "flex items-center px-3 justify-start"
        : "flex items-center justify-center"
    }`}
   onClick={handleLogout}
  >
    🚪 {isOpen && <span className="ml-2">Logout</span>}
  </button>
</nav>

    </div>
  );
}

export default Leftbar;
