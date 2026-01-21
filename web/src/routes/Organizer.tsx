import { Outlet } from "react-router";
import SideBar from "../components/SideBar";

function Organizer() {
  return (
    <>
      <div className="flex">
        <SideBar />
        <div className="flex justify-center items-center bg-black w-screen h-screen text-white text-3xl font-bold">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Organizer;
