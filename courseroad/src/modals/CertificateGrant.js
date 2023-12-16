import React, { useState } from "react";
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import moment from 'moment';
import "../styles/CertificateGrant.css";
import logo from '../images/courseroad_logo.png';

    const CertificateGrant = ({ userData, courseData, open, close }) => {
    // const name = courseData.userName;
    // const handleDownloadCertificate = () => {
    //     alert('downloading...')
    //     html2canvas(certificateRef.current).then(canvas => {
    //         const imgData = canvas.doDataURL('image/png')
    //         //create a new jsPDF instance and add the screenshot as image
    //         const pdf = new jsPDF('l', 'mm', [1000, 670])
    //         pdf.addImage(imgData, 'PNG', 0, 0, 1000, 667)

    //         //download PDF file
    //         pdf.save(${name.split(' ').join('_')}_certificate)

    //     })
    // }


    if (!open) return null;
    return (
        <div onClick={close} className=" cert cert-grant__overlay">
            <div className="cert-grant__modal-container" onClick={(e) => { e.stopPropagation(); }}>
                <div className="topElement">
                    <img className="logo" alt="courseroadLogo" src={logo} />
                    <br></br><br></br><br></br><br></br>
                    <p className="completion">CERTIFICATE OF COMPLETION</p>
                </div>
                <div className="middleElement">
                    <br></br>
                    <p className="smallText">is being given to</p>
                    <br></br><br></br><br></br>
                    <p className="studentName">{userData.userName}</p>
                    <br></br><br></br>
                    <p className="middleText">for completing the requirements for the course</p>
                    <br></br><br></br>
                    <p className="courseName">{courseData.courseTitle}</p>
                    <br></br><br></br>
                    <p className="instructorName">{courseData.courseTeacher}</p>
                    <br></br><br></br>
                    <p className="instructorText">Course Instructor</p>
                </div>
            </div>   
                <button>download pdf</button>    
        </div>
        );
};

export default CertificateGrant;