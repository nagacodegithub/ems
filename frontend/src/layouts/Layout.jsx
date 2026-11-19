import {useState,useEffect} from 'react'

import { Outlet } from "react-router";
import Header from "../components/Header"
import Sidebar from "../components/Sidebar";

export default function Layout() {
  const [isToggle, setIsToggle] = useState(true);
  const toggleActive = isToggle ? "max-lg:hidden" : "";
  useEffect(() => {
    console.log('toggle')
  }, [isToggle]);
    return (
      <>
        <div className="page w-full h-screen bg-gray-100 ">
          <div className="flex bg-gray-100">
            <div
              className={
                "left-side w-1/5 h-screen  max-lg:w-full bg-white z-1000 max-lg:fixed " +
                toggleActive
              }
            >
              <Sidebar
                handleSidbarClose={() => {
                  setIsToggle(true);
                }}
              />
            </div>
            <div className="right-side w-4/5 flex-1 h-screen overflow-y-auto ">
              <Header
                handleToggle={() => {
                  setIsToggle(!isToggle);
                }}
              />
              <div className="main mt-[80px] max-lg:py-5 max-lg:px-4 py-10 px-20 overflow-auto">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
