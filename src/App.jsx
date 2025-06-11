import React, { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from './Config/Config'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Signup from './Component/Signup/Signup';
import Login from './Component/Login/Login';
import Dashboard from './Component/Dashboard/Dashboard';
import ForgetPassword from './Component/ForgetPassword/ForgetPassword';
import Goals from './Component/Dashboard/Goals/Goals'
import Main from './Component/Dashboard/Main/Main';
import Shedule from './Component/Dashboard/Shedule/Shedule';
import DetailData from './Component/Dashboard/DetailData/DetailData';



function App() {

  const [data, setData] = useState([])

  useEffect(() => {
    const GettingData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const user_id = user.user.uid;

        const docRef = doc(db, "users", user_id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const docData = docSnap.data();
          const goalsWithStatus = (docData.Goal || [])
          setData(goalsWithStatus);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };
    GettingData();
  }, []);
  console.log(data)

  return (
    <>
      <Routes>

        <Route path='/' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route index element={<Main />} />
          <Route path='Goals' element={<Goals />} />
          <Route path='Shedule' element={<Shedule />} />
          <Route path="Goals/DetailData/:id" element={<DetailData alldata={data} />} />


        </Route>
        <Route path='/forgetpassword' element={<ForgetPassword />} />


      </Routes>
    </>
  )
}

export default App
