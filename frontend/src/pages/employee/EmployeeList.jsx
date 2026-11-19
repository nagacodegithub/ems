import {Trash,Eye,SquarePen,Plus} from 'lucide-react'
import { NavLink } from 'react-router';
import apiClient from '../../utils/api';
import { useEffect ,useState} from 'react';
import { ToastContainer, toast } from "react-toastify";
import Paginate from "../../components/Paginate"

export default function List() {
  const [employees, setEmployees] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    total:0,
    limit:2,
    totalPage:1
  })

  async function fetchEmployees(page=1,limit=20) {
    try {
      const response = await apiClient.get(
        `employees?page=${page}&limit=${limit}`,
      );
      setEmployees(response.data.employees);
      setPagination((prevState) => {
        return {
          ...prevState,
          currentPage: response.data.pagination.page,
          total: response.data.pagination.total,
          limit: response.data.pagination.limit,
          totalPage: response.data.pagination.totalPage,
        };
      });
    } catch (error) {
      toast.error(error.message || "fetch products failed");
    }
  }

  const handleEmployeeDelete = async (id) => {
   
      try {
        const response = await apiClient.delete("employees/delete/"+id);
       fetchEmployees(pagination.currentPage, pagination.limit);
      } catch (error) {
        toast.error(error?.response?.data?.message || "fetch products failed");
      }
   
    
  };
  
  async function prevPage(page, limit) { 
    if (parseInt(page)-1 > 1) await fetchEmployees(page, limit);
  }

  async function nextPage(page, totalPage, limit) {
  
    if (parseInt(page) <= totalPage) await fetchEmployees(page, limit);
  }
  
   async function getPaginatedData(page, limit) {
     await fetchEmployees(page, limit);
   }

  useEffect(() => {
    fetchEmployees(pagination.currentPage, pagination.limit);
  }, []);
  
  return (
    <>
      <div className="bg-white rounded p-4">
        <div className="flex w-full mb-4 justify-end ">
          <NavLink to="/employees/create">
            <button className="bg-blue-500  flex items-center gap-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <Plus className="inline" />
              Add employee
            </button>
          </NavLink>
        </div>
        <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default border-gray-200">
          <table className="w-full text-sm text-left rtl:text-right text-body">
            <thead className="bg-blue-300 border-b border-gray-300 ">
              <tr>
                <th scope="col" className="px-6 py-3 font-medium">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  EmployeeID
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Department
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  DOB
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  JoinDate
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((employee) => {
                  return (
                    <tr
                      key={employee._id}
                      className="odd:bg-white even:bg-gray-100 border-b border-gray-200 border-default"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                      >
                        {employee.name}
                      </th>
                      <td className="px-6 py-4">{employee.empId}</td>
                      <td className="px-6 py-4">{employee.department}</td>
                      <td className="px-6 py-4">
                        {new Date(
                          employee.dateOfBirth.toString(),
                        ).toLocaleDateString("en-US")}
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <NavLink
                          to={"/employees/" + employee._id}
                          className="p-2 bg-green-500 text-white rounded"
                        >
                          <Eye />
                        </NavLink>
                        <NavLink
                          to={"/employees/edit/" + employee._id}
                          className="p-2 bg-blue-500 text-white rounded"
                        >
                          <SquarePen />
                        </NavLink>
                        <span
                          onClick={() => handleEmployeeDelete(employee._id)}
                          className="cursor-pointer p-2 bg-red-500 text-white rounded"
                        >
                          <Trash />
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td className="text-center p-4" colSpan={12}>
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {pagination.currentPage > 0 && pagination.total > 0 && (
          <div className="mt-4 flex justify-between">
            <div className="flex-1">
              <p>
                {`Showing of ${(pagination.currentPage - 1) * pagination.limit + 1}
              to
              ${Math.min(
                pagination.currentPage * pagination.limit,
                pagination.total,
              )}
              total entries
              ${pagination.total}`}
              </p>
            </div>

            <div className="flex flex-1 justify-end">
              <Paginate
                currentPage={pagination.currentPage}
                totalPage={pagination.totalPage}
                limit={pagination.limit}
                prevPage={prevPage}
                nextPage={nextPage}
                getPaginatedData={getPaginatedData}
              />
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
}
