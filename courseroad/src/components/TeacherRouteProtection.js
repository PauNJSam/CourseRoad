import React, { useState, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { auth } from "../config/firebase";
import {db} from '../config/firebase';
import { query, getDoc, doc} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const TeacherRouteProtection = () => {
    const storedEmail = localStorage.getItem('authedUser');
    const [userEmail, setUserEmail] = useState(storedEmail);
    const [isTeacher, setIsTeacher] = useState(null);

    const getUserInfo = async () => {
        const q = query(doc(db, "USERS", userEmail));

        const docSnap = await getDoc(q);
        if (docSnap.exists()) {
            setIsTeacher(docSnap.data().isTeacher);
          } else {
            console.log("No such document!");
          }
    };
    
    useEffect(() => {
        console.log("UserEmail:", userEmail);
        if (!userEmail) {
            const unsubscribe = onAuthStateChanged(auth, (userData) => {
                if (userData) {
                    const email = userData.email;
                    setUserEmail(email);
                    localStorage.setItem('authedUser', email);
                }
            });

            return () => {
                unsubscribe();
            };
        } else {
            getUserInfo();
            console.log("TeacherProtectedRoutes: useEffect has run");
        }
    }, [userEmail]);
    

    
  return (
    // isTeacher != true ? <Navigate to='/dashboard' /> : <Outlet/>
    isTeacher !== null ? (isTeacher ? <Outlet /> : <Navigate to="/dashboard/studentHome" />) : null
  )
}

export default TeacherRouteProtection;