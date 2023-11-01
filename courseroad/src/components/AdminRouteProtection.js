import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const UserRouteProtection = () => {
    let isLogged = localStorage.getItem("authedAdmin");
    
  return (
    isLogged == null ? <Navigate to='/' /> : <Outlet/>
  )
}

export default UserRouteProtection