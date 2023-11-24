import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";


const CourseOverview = () => {
  const courseDocID = useLocation().pathname.split('/')[3];
  const loggedInEmail = auth?.currentUser?.email;
  const [email, setEmail] = useState(loggedInEmail);
  const navigate = useNavigate();

    useEffect(() => {
        console.log("User logged in: ", loggedInEmail);
        const unsubscribe = onAuthStateChanged(auth, (userData)=>{
            if(userData){
                setEmail(userData.email);
                getCourse();
            }
        });
        
        return () => {
            unsubscribe();
        }
    }, [loggedInEmail]);

    const getCourse = () => {

    };
    
  return (
    <div className='courseOverview'>
        <div>
            <p>This is the Course Overview of the courseID: {courseDocID}</p>
        </div>

    </div>
  );
};

export default CourseOverview;
