import { useRef, useState } from "react";
import { auth } from "../config/firebase";
import {db, storage} from '../config/firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import CloseIcon from "../icons/CloseIcon";
import "../styles/TeacherApplicationForm.css";

const ReportCourse = ({ courseID, open, close }) => {

    const loggedInEmail = auth?.currentUser?.email;
    const reportRef = useRef();
    

    if (!open) return null;

    const submit_application = async () => {
            const docRef = await addDoc(collection(db, "REPORTS"), {
                report: reportRef.current.value,
                userEmail: loggedInEmail,
                dateCreated: serverTimestamp(),
                courseID : courseID
    
            }).then((docRef)=>{
                alert("Report Sent");
            }).catch((error) => {
                console.error('Error sending report: ', error);
            });
            
    }


    return(
        <div onClick={close} className="teacher-app__overlay">
            <div className="teacher-app__modal-container" onClick={(e)=>{e.stopPropagation();}}>
                
                <CloseIcon className="teacher-app__close-btn" onClick={close}></CloseIcon>
                <p className="teacher-app__title">Teacher Application Form</p>
                <div className="teacher-app__form-container">
                    <form className="teacher-app__form" >
                        <div className="form__text-inputs">
                            <p>Course ID:{courseID}</p>
                            <label>Why Report This Course?<input type="text" ref={reportRef} required></input></label>
                        </div>
                        <div className="form__file-input">
                            <button type="button" onClick={submit_application}>Submit</button>
                        </div>
                    </form>
                </div>
                
            </div>
        </div>
    );
};
export default ReportCourse;