import React, { useEffect, useState } from 'react';
import '../styles/CourseOverview.css';
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {db} from '../config/firebase';
import { doc, getDoc, updateDoc, arrayUnion, addDoc, collection, setDoc } from "firebase/firestore";



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

  /* const enroll = async () => {
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
  }; */


  const enroll = async () => {
    // const chapterDocRef = doc(db, "USERS", email, "ENROLLEDCOURSES")
                
    const chapterDocRef = await setDoc(doc(db, "USERS", email, "ENROLLEDCOURSES", courseDocID), {
      chapters: []

      }).then(()=>{
        updateCourseID();
        console.log(courseDocID);
          navigate("/dashboard/studentHome");
      }).catch((error) => {
          console.error('Error updating course with new chapter files', error);
      });
  };

  const updateCourseID = async () => {
    const courseDocRef = doc(db, "COURSESCREATED", courseDocID)
                
                    await updateDoc(courseDocRef, {
                        courseID: courseDocID
                    })
  }

  /* const handleGoBack = () => {
    navigate(-1);
  } */
    
  return (
    <div className='courseOverview'>
        <div className='container'>
            {
              courseData == null ? null : <section>
                <img className='courseImage' src={courseData.courseThumbnail} alt='course background' width='500px' />
                <p className='courseTitle'>{courseData.courseTitle}</p>
                <p>Instructor: {courseData.courseTeacher}</p>
                <p>Date Created: {courseData.dateCreated?.toDate().toLocaleString()}</p>
                <p className={courseData.numberOfStudents > 0 ? 'studentsEnrolled' : 'noStudents'}>Number of Students Enrolled: {courseData.numberOfStudents}</p>
                <p className="courseDescriptionLabel">Course Description:</p>
                <p className="courseDescription">{courseData.courseDescription}</p>
                <button className='enrollButton' type='button' onClick={enroll}>Enroll</button>
                {/* <button className='goBackButton' type='button' onClick={handleGoBack}>Go Back</button> */}
              </section>
            }
        </div>

    </div>
  );
};

export default CourseOverview;