import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {db, storage} from '../config/firebase';
import { collection, addDoc, serverTimestamp, query, getDocs, doc, updateDoc, arrayUnion, where, orderBy, getDoc, setDoc, deleteDoc, arrayRemove, FieldValue } from "firebase/firestore";

const TeacherCourseStatus = () => {
    const courseDocID = useLocation().pathname.split('/')[3];
    const loggedInEmail = auth?.currentUser?.email;
    const [email, setEmail] = useState(loggedInEmail);
    const [courseData, setCourseData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("User logged in: ", loggedInEmail);
        const unsubscribe = onAuthStateChanged(auth, (userData)=>{
            if(userData){
                setEmail(userData.email);
                getCourse();
            }
        });
        console.log(courseData);
        return () => {
            unsubscribe();
        }
    }, [loggedInEmail]);

    const getCourse = async () => {
        try{
            const docRef = doc(db, "COURSESCREATED", courseDocID);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setCourseData(docSnap.data())
            // console.log(courseData);
            } else {
            console.log("No such document!");
            }
        } catch(err){
            console.log(err.message);
        }   
    };

  return (
    <section className="teacherStatus">
        <div className="teacherCourseStatus">
        <p>Course Details and Status</p>
         <p>Course Title: {courseData?.courseTitle}</p>
         <p>Number of Students Enrolled: {courseData?.numberOfStudents}</p>
         <p>Course Description: {courseData?.courseDescription}</p>
         {/* <p>Number of Certificates Issued: {courseData?.courseTitle}</p> */}

    </div></section>
  )
}

export default TeacherCourseStatus