import { NavLink, useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { ToastContainer,toast } from "react-toastify";
import apiClient from "../../utils/api"
import { useState,useEffect } from "react";


export default function EmployeeEdit() {
  const { id } = useParams();
  const [previewImage, setPreviewImage] = useState();
   const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValues,formState: { errors },
  } = useForm();
  
  async function onSubmit(data) {
    const formData = new FormData();
    Object.entries(data).forEach(([key,value])=>{
      if (key == "profileImage" && value?.[0]) {
        formData.append(key, value[0]);
      } else {
        console.log(key);
        formData.append(key, value);
      }
    })

     try {
       const response = await apiClient.put("employees/update/"+id, formData, {
         headers: {
         "Content-Type":'multipart/form-data'
         }
       });
       const { employee } = response.data;
       employee.joinDate = new Date(employee.joinDate)
        .toISOString()
        .slice(0, 10);
       employee.dateOfBirth = new Date(employee.dateOfBirth)
         .toISOString()
         .slice(0, 10);
      
       setValues((data) => {
         return {
           ...data,
           ...employee,
           profileImage:null
         };
       });
       
       toast.success("Update Sucessfully");
       navigate("/employees/" + id);
      
     } catch (error) {
        toast.error(error?.response?.data?.message || "Update Failed");
        
      }
  }
  
  useEffect(() => {
    console.log('fetch')
    async function fetchEmployee() {
      try {
        const response = await apiClient.get("employees/detail/" + id);
        const { employee } = response.data;
        employee.joinDate = new Date(employee.joinDate).toISOString().slice(0, 10);
         employee.dateOfBirth = new Date(employee.dateOfBirth)
           .toISOString()
          .slice(0, 10);
         employee.profileImage = null
        setValues((data) => {
          return {
            ...data,
            ...employee,
          };
        });
      } catch (error) {
        toast.error(error?.response?.data?.message || "Fetch Employee Failed");
      }
    }
    fetchEmployee();
  },[])

  const validate = {
    empId: {
      ...register("empId", {
        required: "Employee ID is required",
        minLength: { value: 1, message: "Employee ID is too short" },
      }),
    },
    email: {
      ...register("email", {
        required: "Email is required",
      }),
    },
    name: {
      ...register("name", {
        required: "Name is required",
        minLength: { value: 2, message: "Name is too short" },
      }),
    },
    department: {
      ...register("department", {
        required: "Department is required",
      }),
    },
    dateOfBirth: {
      ...register("dateOfBirth", {
        required: "Date of Birth is required",
        validate: (value) => {
          const pattren = /^\d{4}\-\d{1,2}\-\d{1,2}$/;
          if (!pattren.test(value)) {
            return "invalid date format";
          }
        },
      }),
    },
    joinDate: {
      ...register("joinDate", {
        required: "JoinDate is required",
        validate: (value) => {
          const pattren = /^\d{4}\-\d{1,2}\-\d{1,2}$/;
          if (!pattren.test(value)) {
            return "invalid date format";
          }
        },
      }),
    },
    salary: {
      ...register("salary", {
        required: "Salary is required",
      }),
    },
    city: {
      ...register("city", {
        required: "City is required",
      }),
    },
    phoneNo: {
      ...register("phoneNo", {
        required: "Phone No is required",
        validate: (value) => {
          const pattren = /^\d{0,}$/;
          if (!pattren.test(value)) {
            return "Only numbers are allowed.";
          }
          if (value.length != 10) {
            return "Please enter exactly 10 digits";
          }
        },
      }),
    },
    state: {
      ...register("state", {
        required: "State is required",
      }),
    },
    country: {
      ...register("country", {
        required: "Country is required",
      }),
    },
    profileImage: {
      ...register("profileImage", {
        validate: (files) => {
          if (
            files?.[0] &&
            !["image/jpeg", "image/png"].includes(files?.[0].type)
          ) {
            return "invalid image file type";
          } else if (files?.[0].size && files[0].size > 2 * (1024 * 1024)) {
            return "Max size is 2 MB";
          }
        },
      }),
    },
  };
  

  const handlePreview = (e) => {

    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      if (
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          file.type,
        )
      ) {
        const src = URL.createObjectURL(file);
        setPreviewImage(src);
       
      } 
    }
  };

  return (
    <>
      <div className="bg-white rounded p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex-1/2 md:flex-1">
              <label>Employee ID</label>
              <input
                className="form-control w-full bg-white p-2 outline-0 border-2 rounded border-gray-200 focus:border-blue-300"
                name="empId"
                placeholder="Employee ID"
                {...validate.empId}
              />
              {errors.empId && (
                <small className="text-red-500">{errors.empId.message}</small>
              )}
            </div>
            <div className="flex-1/2 md:flex-1">
              <label>Email</label>
              <input
                className="form-control w-full bg-white p-2 outline-0 border-2 rounded border-gray-200 focus:border-blue-300"
                name="email"
                placeholder="Email"
                {...validate.email}
              />
              {errors.email && (
                <small className="text-red-500">{errors.email.message}</small>
              )}
            </div>
            <div className="flex-1/2 md:flex-1">
              <label>Name</label>
              <input
                className="form-control w-full bg-white p-2 outline-0 border-2 rounded border-gray-200 focus:border-blue-300"
                name="name"
                placeholder="Name"
                {...validate.name}
              />
              {errors.name && (
                <small className="text-red-500">{errors.name.message}</small>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex-1/2 md:flex-1">
              <label>Department</label>
              <input
                className="form-control w-full bg-white p-2 outline-0 border-2 rounded border-gray-200 focus:border-blue-300"
                name="department"
                placeholder="Department"
                {...validate.department}
              />
              {errors.department && (
                <small className="text-red-500">{errors.department.message}</small>
              )}
            </div>
            <div className="flex-1/2 md:flex-1">
              <label>Phone No:</label>
              <input
                className="form-control w-full bg-white p-2 outline-0 border-2 rounded border-gray-200 focus:border-blue-300"
                type="text"
                name="phoneNo"
                placeholder="phone number"
                {...validate.phoneNo}
              />
              {errors.phoneNo && (
                <small className="text-red-500">{errors.phoneNo.message}</small>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex-1/2 md:flex-1">
              <label>Joining Date</label>
              <input
                className="form-control w-full bg-white p-2 outline-0 border-2 rounded border-gray-200 focus:border-blue-300"
                type="Date"
                name="joinDate"
                placeholder="Joining Date"
                {...validate.joinDate}
              />
              {errors.joinDate && (
                <small className="text-red-500">{errors.joinDate.message}</small>
              )}
            </div>
            <div className="flex-1/2 md:flex-1">
              <label>Date of Birth</label>
              <input
                className="form-control w-full bg-white p-2 outline-0 border-2 rounded border-gray-200 focus:border-blue-300"
                type="date"
                name="dateOfBirth"
                placeholder="Data Of Birth"
                {...validate.dateOfBirth}
              />
              {errors.dateOfBirth && (
                <small className="text-red-500">{errors.dateOfBirth.message}</small>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex-1/2 md:flex-1">
              <label>Salary</label>
              <input
                className="form-control w-full bg-white p-2 outline-0 border-2 rounded border-gray-200 focus:border-blue-300"
                name="salary"
                placeholder="Salary"
                {...validate.salary}
              />
              {errors.salary && (
                <small className="text-red-500">{errors.salary.message}</small>
              )}
            </div>
            <div className="flex-1/2 md:flex-1">
              <label>City</label>
              <input
                className="form-control w-full bg-white p-2 outline-0 border-2 rounded border-gray-200 focus:border-blue-300"
                type="text"
                name="city"
                placeholder="City"
                {...validate.city}
              />
              {errors.city && (
                <small className="text-red-500">{errors.city.message}</small>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex-1/2 md:flex-1">
              <label>State</label>
              <input
                className="form-control w-full bg-white p-2 outline-0 border-2 rounded border-gray-200 focus:border-blue-300"
                name="state"
                placeholder="state"
                {...validate.state}
              />
              {errors.state && (
                <small className="text-red-500">{errors.state.message}</small>
              )}
            </div>
            <div className="flex-1/2 md:flex-1">
              <label>Country</label>
              <input
                className="form-control w-full bg-white p-2 outline-0 border-2 rounded border-gray-200 focus:border-blue-300"
                type="text"
                name="country"
                placeholder="country"
                {...validate.country}
              />
              {errors.country && (
                <small className="text-red-500">{errors.country.message}</small>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex-1">
              <label>Profile Photo</label>
              <input
                className="form-control w-full bg-white p-2 outline-0 border-2 rounded border-gray-200 focus:border-blue-300"
                type="file"
               
                name="profileImage"
                placeholder="photo"
                onInput={handlePreview}
                {...validate.profileImage}
              />
              {errors.profileImage && (
                <small className="text-red-500">
                  {errors.profileImage.message}
                </small>
              )}
              <div className="mt-2 w-[100px] h-[100px] border-5 border-white outline-1 outline-gray-200">
                <img
                  className="w-full h-full object-cover"
                  src={
                    previewImage ? previewImage : getValues("profileImageUrl")
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <NavLink to="/employee">
              <button className="bg-red-500  flex items-center gap-1 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                CANCEL
              </button>
            </NavLink>
            <button className="bg-blue-500  flex items-center gap-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              SUBMIT
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

