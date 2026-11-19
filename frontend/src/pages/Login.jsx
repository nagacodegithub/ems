
import { useForm } from "react-hook-form";
import apiClient from '../utils/api';
import { useAuth } from '../context/AuthContext'

import { ToastContainer,toast } from "react-toastify";
export default function Login() {
  const { setUser } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
    async function onSubmit(data) {
     try {
        const response= await apiClient.post("/auth/login", {
          email: data.email,
          password:data.password
        });
    
         localStorage.setItem("isAuthenticated", "true");
         setUser(response.data.user);
     } catch (error) {
         toast.error(error?.response?.data?.message || "Login Failed");
      }
  }

  const validate = {
    email: {
      ...register("email", {
        required: "Email is required",
      }),
    },
    password: {
      ...register("password", {
        required: "Password is required",
        minLength: { value: 6, message: "Password is too short" },
      }),
    },
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="mx-auto w-full max-w-96 border-1 border-gray-200">
          <div className="bg-white rounded p-4">
            <h2 className="text-2xl text-blue-500 font-bold mb-4 text-center">
              EMS Login
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col flex-wrap gap-2 mb-4">
                <div className="flex-1">
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
                <div className="flex-1">
                  <label>Password</label>
                  <input
                    className="form-control w-full bg-white p-2 outline-0 border-2 rounded border-gray-200 focus:border-blue-300"
                    type="password"
                    name="password"
                    placeholder="password"
                    {...validate.password}
                  />
                  {errors.password && (
                    <small className="text-red-500">
                      {errors.password.message}
                    </small>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button className="bg-blue-500  flex items-center gap-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
}
