
import { NavLink, Link } from "react-router";
import { House ,UserRoundGroup,X} from "lucide-react"
export default function Sidebar({ handleSidbarClose }) {
  const menuActive = ({ isActive }) => {
    return isActive
      ? "border-b-1 px-4 py-2 border-gray-200 w-full flex gap-1 text-blue-600"
      : "border-b-1 px-4 py-2 border-gray-200 w-full flex gap-1";
  };

  return (
    <>
      <div>
        <div className="logo max-lg:p-4 text-center flex items-center justify-center h-[65px] border-b-1 border-gray-200">
          <h2 className="text-blue-500 text-3xl font-bold">EMS</h2>
          <div className="hidden max-lg:flex  w-full justify-end cursor-pointer">
            <X onClick={handleSidbarClose} />
          </div>
        </div>
        <div className="sidbar-menus">
          <ul className="sidebar-items">
            <li className="sidebar-item w-full" onClick={handleSidbarClose}>
              <NavLink to="/" className={menuActive}>
                <House />
                Dashboard
              </NavLink>
            </li>
            <li className="sidebar-item" onClick={handleSidbarClose}>
              <NavLink className={menuActive} to="employees">
                <UserRoundGroup />
                Employees
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
