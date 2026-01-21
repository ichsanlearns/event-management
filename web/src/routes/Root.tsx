import { Outlet } from "react-router";
import Navbar from "../components/NavBar";

function Root() {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center bg-[#181818] w-screen h-screen text-[#F5F5F5] text-3xl font-bold">
        <Outlet />
      </div>
    </>
  );
}

export default Root;
