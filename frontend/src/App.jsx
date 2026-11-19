
import './App.css'
import { Routes, Route,Navigate } from "react-router";
import Dashboard from "./pages/Dashboard";
import Layout from "./layouts/Layout"
import List from './components/List'
import EmployeeList from "./pages/employee/EmployeeList";
import EmployeeDetails from "./pages/employee/EmployeeDetails";
import Login from "./pages/Login"
import EmployeeCreate from './pages/employee/EmployeeCreate';
import EmployeeEdit from "./pages/employee/EmployeeEdit";
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext'

function App() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
      />
      <Route path="/" element={<Layout />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees">
            <Route index element={<EmployeeList />} />
            <Route path="/employees/:id" element={<EmployeeDetails />} />
            <Route element={<ProtectedRoute roles={['admin']}/>}>
              <Route path="/employees/create" element={<EmployeeCreate />} />
              <Route path="/employees/edit/:id" element={<EmployeeEdit />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App
