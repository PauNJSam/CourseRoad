import React, { useState } from "react";
import CloseIcon from "../icons/CloseIcon";
import "../styles/CertificateGrant.css";

const CertificateGrant = ({ userData, courseData, open, close }) => {
    

    if (!open) return null;
    return (
        <div onClick={close} className="cert-grant__overlay">
            <div className="cert-grant__modal-container" onClick={(e) => { e.stopPropagation(); }}>
                <CloseIcon className="cert-grant__close-btn" onClick={close}></CloseIcon>
                <p>{userData?.userEmail}</p>
                <p>{courseData?.courseTitle}</p>
                
            </div>
        </div>
    );
};

export default CertificateGrant;