import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import MainLayout from "./layout/MainLayout";


function App() {
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
