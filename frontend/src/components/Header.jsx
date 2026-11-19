
import { Menu } from "lucide-react";
import { LogOut } from "lucide-react";
import {useAuth} from "../context/AuthContext"
export default function Header({ handleToggle }) {
  const { logout } = useAuth();
  return (
    <>
      <div className="header w-full p-4 h-[65px] fixed z-700 left-0 top-0 right-0 bottom-0 bg-white border-b-2 border-gray-200">
        <div className="flex">
          <div className="head-left flex-1">
            <button className="cursor-pointer max-lg:block hidden"
              onClick={() => {
                handleToggle();
              }}
            >
              <Menu />
            </button>
          </div>
          <div className="head-right">
            <ul className="user-menu flex gap-2 cursor-pointer">
              <li className="text-md ">Admin</li>
              <li className="text-md text-red-500">
                <LogOut onClick={logout} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
