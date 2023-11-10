import React, { useEffect } from 'react'
import { auth } from "../config/firebase";
import { Navigate, Outlet } from 'react-router-dom';

const CourseOverview = () => {
    
  return (
    <div className='courseOverview'>
        <div>
            <text>This is a test</text>
        </div>

    </div>
  )
}

export default CourseOverview