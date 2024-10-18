import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <NavBar/>
      <Outlet/>
      <Footer/>
    </>
  );
}

export default App;
