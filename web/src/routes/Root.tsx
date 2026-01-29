import { Outlet } from "react-router";
import Navbar from "../components/NavBar";

function Root() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Root;
