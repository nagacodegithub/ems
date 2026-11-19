import { useAuth } from '../context/AuthContext'
import { Navigate, useLocation, Outlet,Route } from 'react-router'
import { useEffect, useState } from 'react'
import apiClient from '../utils/api'

export default function ProtectedRoute({ roles=[] }) {
  const { user, setUser, loading, setLoading } = useAuth();
 
  const isAuth = localStorage.getItem("isAuthenticated");

    if (loading) return <p>Loading...</p>;
    if (user && roles.length > 0 &&  !roles.includes(user.role)) return <Navigate to="/" replace />;;
    return user ? <Outlet /> : <Navigate to="/login" replace />;
}