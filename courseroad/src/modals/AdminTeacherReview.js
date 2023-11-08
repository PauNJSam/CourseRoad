import React, { useState, useEffect } from 'react';
import { updateDoc, doc } from "firebase/firestore";
import '../styles/AdminTeacherReview.css';
import { db } from '../config/firebase';
import { getDoc } from "firebase/firestore";


const AdminTeacherReview = ({ open, close, appData, email, date }) => { 
    //fetchedData
    const [teacherData, setTeacherData] = useState(null);

    useEffect(() => {
        //Fetch teacher details from firestore
        const fetchTeacherDetails = async () => {
            try {
                const docRef = doc(db, "TAPPLICATIONS", appData.id);
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

        if (email) {
            fetchTeacherDetails();
        }
    }, [email]); 

    if (!open) return null;

    const handleAccept = async () => {
        if (!appData) return;
        try {
            const appDoc = doc(db, "TAPPLICATIONS", appData.id);
            await updateDoc(appDoc, {
                isAccepted: true
            });
            updateUserData(true);
            close();
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    //Firestore
    const handleReject = async () => {
        if (!appData) return;
        try {
            const appDoc = doc(db, "TAPPLICATIONS", appData.id);
            await updateDoc(appDoc, {
                isAccepted: false
            });
            updateUserData(false);
            close();
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    const updateUserData = async (response) => {
        const userDocRef = doc(db, "USERS", email);
                    
                    await updateDoc(userDocRef, {
                        isTeacher: response
                    }).then(() => {
                        
                        console.log("Successfully updated userData");
                    }).catch((error) => {
                        console.error('Error updating userData', error);
                    });
    };

    return (
        <div onClick={close} className="teacher-review__overlay">
            <div className="teacher-review__modal-container" onClick={(e) => e.stopPropagation()}>
                <button className="teacher-review__close-btn" onClick={close}>X</button>
                <div className="teacher-review__header">
                    <div className="teacher-review__profile-section">  
                        <img src={appData && appData.userProfilePic} alt="User profile" className="teacher-review__profile-img"/>
                        <span className="teacher-review__email">{email}</span>
                        <h3>{appData && appData.userName}</h3>
                    </div>
                    {/*isAccept: true or false*/}
                    <div className="teacher-review__actions">
                        <button onClick={handleAccept} className="teacher-review__accept-btn">Accept</button>
                        <button onClick={handleReject} className="teacher-review__reject-btn">Reject</button>
                    </div>
                </div>
                <div className="teacher-review__details">
                    <p>Teaching Experience: {teacherData && teacherData.teach_exp} years</p>
                    <p>Educational Background: {teacherData && teacherData.duc_bg}</p>
                    <p>Current School Affiliation: {teacherData && teacherData.current_aff}</p>
                    <p>Date Created: {teacherData && teacherData.dateCreated?.toDate().toLocaleString()}</p>
                    <a href={appData && appData.resume} target="_blank" rel="noopener noreferrer">View Resume</a>
                </div>
            </div>
        </div>
    );
};

export default AdminTeacherReview;