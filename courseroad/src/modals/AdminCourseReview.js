import React, { useState, useEffect } from 'react';
import { updateDoc, doc, deleteDoc, getDocs, query, collection, where } from "firebase/firestore";
import '../styles/AdminTeacherReview.css';
import { db } from '../config/firebase';
import { getDoc } from "firebase/firestore";


const AdminCourseReview = ({ open, close, appData, email, date }) => { 
    //fetchedData
    const [teacherData, setTeacherData] = useState(null);

    const fetchTeacherDetails = async () => {
        try {
            const docRef = doc(db, "REPORTS", appData.id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setTeacherData(docSnap.data());
                console.log("Fetched data:", docSnap.data());
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error fetching teacher details:", error);
        }
    };

    useEffect(() => {
        if (email) {
            fetchTeacherDetails();
        }
    }, [email]); 

    if (!open) return null;

    const handleAccept = async () => {
        if (!appData) return;
        await deleteDoc(doc(db, "REPORTS", appData.id));
        deleteTheCourse();
        fetchTeacherDetails();
        close();
    };

    const deleteTheCourse = async () => {
        const q = query(collection(db, "CHAPTERS"), where("courseID", "==", appData.courseID));
        const querySnapshot = await getDocs(q);
        // Create an array to hold all promises for deleting chapters
        const deleteChapterPromises = [];
        // Loop through the matching documents and delete them
        querySnapshot.forEach((document) => {
            const docRef = doc(collection(db, "CHAPTERS"), document.id);
            const deletePromise = deleteDoc(docRef);
            deleteChapterPromises.push(deletePromise);
        });
        // Wait for all chapter deletions to complete
        await Promise.all(deleteChapterPromises);
        // Delete the main course document
        await deleteDoc(doc(db, "COURSESCREATED", appData.courseID));
        alert("Successfully Deleted Course");
    };


    return (
        <div onClick={close} className="teacher-review__overlay">
            <div className="teacher-review__modal-container" onClick={(e) => e.stopPropagation()}>
                <button className="teacher-review__close-btn" onClick={close} style={{marginTop: '1rem', marginRight: '1rem'}}>X</button>
                <div className="teacher-review__header">
                    <div className="teacher-review__profile-section">  
                        <span className="teacher-review__email">{email}</span>
                    </div>
                    
                    <div className="teacher-review__actions">
                        <button onClick={handleAccept} className="teacher-review__accept-btn" style={{marginTop: '1rem'}}>Noted</button>
                        {/* <button onClick={handleReject} className="teacher-review__reject-btn">Delete</button> */}
                    </div>
                    
                </div>
                <div className="teacher-review__details">
                    <p style={{display: "block"}}>Course ID:{teacherData && teacherData.courseID}</p>
                    <p>Date Submitted: {teacherData && teacherData.dateCreated?.toDate().toLocaleString()}</p>
                    <br></br>
                    <p>Report: {teacherData && teacherData.report} years</p>
                </div>
            </div>
        </div>
    );
};

export default AdminCourseReview;