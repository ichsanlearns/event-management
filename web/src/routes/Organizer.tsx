import { Outlet } from "react-router";
import SideBar from "../components/SideBar";

function Organizer() {
  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900">
      {/* Sidebar */}
      <SideBar />

      {/* Page Content */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default Organizer;
