import React, { useState, useEffect } from 'react';
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { db } from '../config/firebase';
import { collection, query, getDocs, where, orderBy } from "firebase/firestore";
import EditIcon from "../icons/EditIcon";
import '../styles/TeacherHome.css';
import { useNavigate } from "react-router-dom";

const TeacherHome = () => {
    const loggedInEmail = auth?.currentUser?.email;
    const [email, setEmail] = useState(loggedInEmail);
    const [coursesData, setCoursesData] = useState(null);

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

    const getCourse = async () => {
        try{
            console.log("email (TeacherHome):", email);
            const q = query(collection(db, "COURSESCREATED"), where("courseTeacher", "==", email), orderBy("dateCreated", "desc"));

            const querySnapshot = await getDocs(q);

            setCoursesData(querySnapshot.docs.map((doc)=> ({...doc.data(), id:doc.id})));
        } catch(err){
            console.log(err.message);
        }
    };
    
    const toEditCourse = () =>{
        navigate("/dashboard/editCourse");
    };
    const toCreateCourse = () =>{
        navigate("/dashboard/createCourse");
    };
    const showCourseStats = () =>{
        
    };

    return(
        <section className='teacher-home' >
            <div className='teacher-home__header'>
                <p className='teacher-home__title'>My Courses</p>
                <button className='teacher-home__button' type='button' onClick={toCreateCourse} >Create New Course</button>
            </div>
            <div className='teacher-home__card-list' >
                {
                        coursesData === null ? null : coursesData.map((course)=>{
                            return(
                                <article className='course-card' key={course.id} onClick={showCourseStats} >
                                    <div className='course-pic'>
                                        <img className='course-thumbnail' src={course.courseThumbnail} alt='courseThumbnail' />
                                        
                                    </div>
                                    <div className='course-card__details'>
                                        <div>
                                            <p className='course-title'>{course.courseTitle}</p>
                                            {/* <p>{course.dateCreated}</p> */}
                                            <p className='course-numberOfStudents'>Students: {course.numberOfStudents}</p>
                                        </div>
                                        <div className='course-card__icons'>
                                            <div className='icon' onClick={toEditCourse}><EditIcon /></div>
                                        </div>
                                    </div>
                                    
                                </article>
                            )
                        })
                    }
            </div>
        </section>
    );
};
export default TeacherHome;