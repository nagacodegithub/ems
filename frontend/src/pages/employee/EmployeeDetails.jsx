import { useState, useEffect } from 'react';
import { NavLink, useParams } from "react-router";
import apiClient from '../../utils/api'
import { ToastContainer,toast } from 'react-toastify';
export default function EmployeeDetails() {
   const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading,setLoading] = useState(true)
  useEffect(() => {
   
    async function fetchEmployee() {
      
      try {
        const response = await apiClient.get("employees/detail/" + id);
        const { employee } = response.data;
        employee.joinDate = new Date(employee.joinDate)
          .toISOString()
          .slice(0, 10);
        employee.dateOfBirth = new Date(employee.dateOfBirth)
          .toISOString()
          .slice(0, 10);
        setEmployee((data) => {
          return {
            ...data,
            ...employee,
          };
        });
      } catch (error) {
        toast.error(error?.response?.data?.message || "Fetch Employee Failed");
      } finally {
        setLoading(false)
      }
    }
    fetchEmployee();
  }, []);

  return (
    <>
      <div className="bg-white rounded p-4 mx-auto max-w-sm">
        {loading && <p>Loading</p>}
        {employee && (
          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="flex w-full mb-4 justify-end ">
              <NavLink to={"/employees/edit/" + employee._id}>
                <button className="bg-blue-500  flex items-center gap-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Edit
                </button>
              </NavLink>
            </div>
            <div className="mb-2 w-[100px] h-[100px] border-5 border-white outline-1 outline-gray-200">
              <img
                className="w-full h-full object-cover "
                src={employee.profileImageUrl}
              />
            </div>
            <p className="text-md text-dark-300 font-medium ">
              Name:
              <span className="text-md text-dark-300 font-light px-2">
                {employee.name}
              </span>
            </p>
            <p className="text-md text-dark-300 font-medium ">
              Department:
              <span className="text-md text-dark-300 font-light px-2">
                {employee.department}
              </span>
            </p>
            <p className="text-md text-dark-300 font-medium ">
              PhoneNo:
              <span className="text-md text-dark-300 font-light px-2">
                {employee.phoneNo}
              </span>
            </p>
            <p className="text-md text-dark-300 font-medium ">
              Salary:
              <span className="text-md text-dark-300 font-light px-2">
                {employee.salary}
              </span>
            </p>
            <p className="text-md text-dark-300 font-medium ">
              Joining Date:
              <span className="text-md text-dark-300 font-light px-2">
                {new Date(employee.joinDate).toLocaleDateString("en-US")}
              </span>
            </p>
            <p className="text-md text-dark-300 font-medium ">
              Date Of Birth:
              <span className="text-md text-dark-300 font-light px-2">
                {new Date(employee.dateOfBirth).toLocaleDateString("en-US")}
              </span>
            </p>
            <p className="text-md text-dark-300 font-medium ">
              City:
              <span className="text-md text-dark-300 font-light px-2">
                {employee.city}
              </span>
            </p>
            <p className="text-md text-dark-300 font-medium ">
              State:
              <span className="text-md text-dark-300 font-light px-2">
                {employee.state}
              </span>
            </p>
            <p className="text-md text-dark-300 font-medium ">
              Country:
              <span className="text-md text-dark-300 font-light px-2">
                {employee.country}
              </span>
            </p>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
}
