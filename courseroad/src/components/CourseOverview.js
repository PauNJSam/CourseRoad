import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {db} from '../config/firebase';
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";



const CourseOverview = () => {
  const courseDocID = useLocation().pathname.split('/')[3];
  const loggedInEmail = auth?.currentUser?.email;
  const [email, setEmail] = useState(loggedInEmail);
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);

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

    const getCourse = async () => {
      try{
          const docRef = doc(db, "COURSESCREATED", courseDocID);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setCourseData(docSnap.data())
          } else {
          console.log("No such document!");
          }
      } catch(err){
          console.log(err.message);
      }   
  };

  const enroll = async () => {
    const chapterDocRef = doc(db, "USERS", email)
                
      await updateDoc(chapterDocRef, {
          enrolledCourses: arrayUnion({
            courseID: courseDocID
          })

      }).then(()=>{
          navigate("/dashboard/studentHome");
      }).catch((error) => {
          console.error('Error updating course with new chapter files', error);
      });
  }
    
  return (
    <div className='courseOverview'>
        <div>
            {
              courseData == null ? null : <section>
                <img src={courseData.courseThumbnail} alt='course background' width='500px' />
                <p>{courseData.courseTitle}</p>
                <p>{courseData.courseInstructor}</p>
                <p>Date Created: {courseData.dateCreated?.toDate().toLocaleString()}</p>
                <p>Number of Students Enrolled: {courseData.numberOfStudents}</p>
                <p>Course Description: {courseData.courseDescription}</p>
                <button type='button' onClick={enroll}>Enroll</button>
              </section>
            }
        </div>

    </div>
  );
};

export default CourseOverview;