import React, { useEffect, useState } from 'react';
import '../styles/CourseOverview.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth, db } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';

const CourseOverview = () => {
    const courseDocID = useLocation().pathname.split('/')[3];
    const loggedInEmail = auth?.currentUser?.email;
    const [email, setEmail] = useState(loggedInEmail);
    const [courseData, setCourseData] = useState(null);
    const [showAdditionalContent, setShowAdditionalContent] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (userData) => {
            if (userData) {
                setEmail(userData.email);
                getCourse();
            }
        });

        const getCourse = async () => {
            try {
                const docRef = doc(db, 'COURSESCREATED', courseDocID);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setCourseData(docSnap.data());
                } else {
                    console.log('No such document!');
                }
            } catch (err) {
                console.log(err.message);
            }
        };

        return () => {
            unsubscribe();
        };
    }, [loggedInEmail, courseDocID]);

    const enroll = async () => {
        try {
            await setDoc(doc(db, "USERS", email, "ENROLLEDCOURSES", courseDocID), {
                chapters: []
            });
            updateCourseID();
            navigate("/dashboard/studentHome");
        } catch (error) {
            console.error('Error updating course with new chapter files', error);
        }
    };

    const updateCourseID = async () => {
        try {
            const courseDocRef = doc(db, "COURSESCREATED", courseDocID);
            await updateDoc(courseDocRef, {
                courseID: courseDocID
            });
        } catch (error) {
            console.error('Error updating courseID', error);
        }
    };

    const toggleAdditionalContent = () => {
        setShowAdditionalContent(!showAdditionalContent);
    };

    const navigateToStudentHome = () => {
        navigate('/dashboard/studentHome');
    };

    return (
        <div className='courseOverview'>
            <div className='container'>
                {courseData && (
                    <>
                        <div>
                            {/*<img className='courseImage' src={courseData.courseThumbnail} alt='course background' />*/}
                            <div className='courseContent'>
                                <p className='courseTitle'>{courseData.courseTitle}</p>
                                <p className="courseDescription">{courseData.courseDescription}</p>
                                <p>Instructor: {courseData.courseTeacher}</p>
                                <p>Date Created: {courseData.dateCreated?.toDate().toLocaleString()}</p>

                                <button className='enrollButton' onClick={enroll}>Enroll</button>
                                <button className='navigateButton' onClick={navigateToStudentHome}>Go to Student Home</button>
                            </div>
                        </div>
                        
                        <button className='toggleContentButton' onClick={toggleAdditionalContent}>
                            {showAdditionalContent ? 'Less Details' : 'More Details'}
                        </button>

                        <div className={`additionalContent ${showAdditionalContent ? 'showContent' : ''}`}>
                            <p>---Example:</p>   
                            <p>---1</p>   
                            <p>---2</p>  
                            <p>---3</p>  
                            <p>---Good Morning! ABCD EFGH IJK LMNO PQRS TUVW XYZ</p>    
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CourseOverview;