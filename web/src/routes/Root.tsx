import { Outlet } from "react-router";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

function Root() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Root;
