import { Link } from "react-router";

function SideBar() {
  return (
    <div className="w-[20%] bg-blue-500 flex justify-center items-center">
      <ul className="flex flex-col gap-10">
        <li>
          <Link to={""}>Dashboard</Link>
        </li>
        <li>
          <Link to={"events"}>Events</Link>
        </li>
        <li>
          <Link to={"approval"}>Approval</Link>
        </li>
        <li>
          <Link to={"report"}>Reports</Link>
        </li>
        <li>
          <Link to={"../"}>Back</Link>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
