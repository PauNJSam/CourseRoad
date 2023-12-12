import React, { useState } from "react";
import CloseIcon from "../icons/CloseIcon";
import '../styles/FailedExam.css';


const FailedExam = ({ userData, courseData, open, close }) => {

    

    if (!open) return null;
    return (
        <div onClick={close} className="failedExam failedExam__overlay">
            <div className="modal-container" onClick={(e) => { e.stopPropagation(); }}>
                <CloseIcon className="close-btn" onClick={close}></CloseIcon>

                {/* Insert design here */}

            </div>
        </div>
    );
};

export default FailedExam;