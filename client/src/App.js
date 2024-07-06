import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import MainLayout from "./layout/MainLayout";
import { axiosinstance } from "./utils/axiosinstance";
import { BACKEND_URL } from "./utils/backendUrl";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./slice/userSlice";


function App() {

  const dispatch=useDispatch()
useEffect(()=>{
  const fetchUser=async()=>{
    const res=await axiosinstance.get(BACKEND_URL+'/api/profile');
   console.log(res.data.userLoginDetails.data)
   dispatch(setUser(res.data.userLoginDetails.data))
  
   
  }
  fetchUser();
})


  return (
    <div className="App">
     <Header/>
      <MainLayout>
      <Outlet/>
      </MainLayout> 
     
    </div>
  );
}

export default App;
