import React, { useState } from "react";
import CloseIcon from "../icons/CloseIcon";
import '../styles/FailedExam.css';
import { useNavigate } from "react-router-dom";

const FailedExam = ({ userData, courseData, open, close }) => {
const navigate = useNavigate();
const dashboard = () => {
    navigate('/dashboard/studentHome');
}
const retake = () => {
    navigate('/dashboard/courseTaking/'+ courseData.courseID);
}
    

    if (!open) return null;
    return (
        <div onClick={close} className=" fExam failedExam__overlay">
            <div className="modal-container" onClick={(e) => { e.stopPropagation(); }}>
                <CloseIcon className="close-btn" onClick={close}></CloseIcon>
                <br></br>
                <div classname="message">
                    <p>You have failed to pass the Course Exam.</p>
                    <p>If you wish to go back to the dashboard, click Return to Dashboard button</p>
                    <p>If you wish to Retake Exam, click Retake Exam button</p>
                    <br>
                    </br>
                </div>

                <div classname="buttons">
                    <button onClick={dashboard}>Return to Dashboard</button>
                    <break></break>
                    <button onClick={retake}>Retake Exam</button>
                </div>

            </div>
        </div>
    );
};

export default FailedExam;