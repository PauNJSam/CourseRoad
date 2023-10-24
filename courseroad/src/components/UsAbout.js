import React, { useState } from 'react';
import '../styles/UsAbout.css';
import courseroadlogo from '../images/courseroad_logo.png';
import defaultProfileImage from '../images/create_course_head_bg.png';

/* import instagramIcon from '../images/InstagramIcon.png';
import facebookIcon from '../images/facebookIcon.png';
import twitterIcon from '../images/twitterIcon.png'; */
import FacebookIcon from "../icons/FacebookIcon";
import InstagramIcon from "../icons/InstagramIcon";
import GmailIcon from "../icons/GmailIcon";
import LinkedInIcon from "../icons/LinkedInIcon";

import mycatA from '../images/create_course_head_bg.png';
import mycatB from '../images/create_course_head_bg.png';
import mycatC from '../images/create_course_head_bg.png';
import mycatD from '../images/create_course_head_bg.png';
import mycatE from '../images/create_course_head_bg.png';

const teamMembers = [
    {
        id: 1,
        name: 'Jeannelyn C. Obero',
        address: 'Naga City, Cebu, Philippines',
        course: 'Computer Engineering',
        year: '4',
        role: 'Member',
        image: mycatA, 
    },

    {
        id: 2,
        name: 'Paula Enjae P. Sambueno',
        address: 'Cebu City, Cebu, Philippines',
        course: 'Computer Engineering',
        year: '4',
        role: 'Member',
        image: mycatB,
    },

    {
        id: 3,
        name: 'Nathaniel Arbasto',
        address: 'Cebu City, Cebu, Philippines',
        course: 'Computer Engineering',
        year: '4',
        role: 'Member',
       image: mycatC,
    },

    {
        id: 4,
        name: 'Maximille Gratia Pacis',
        address: 'Carcar City, Cebu, Philippines',
        course: 'Computer Engineering',
        year: '4',
        role: 'Member',
        image: mycatD,
    },

    {
        id: 5,
        name: 'Jade Cyril Gabuya',
        address: 'Cebu City, Philippines',
        course: 'Computer Engineering',
        year: '4',
        role: 'Team Leader',
        image: mycatE,
    },
    
];

function AboutUs() {

    const [showProfileOptions, setShowProfileOptions] = React.useState(false);
    const handleOptionClick = () => setShowProfileOptions(!showProfileOptions);
    
    const [selectedMember, setSelectedMember] = useState(null);

    const handleMemberClick = (member) => {
        setSelectedMember(member);
    };

    const handleCloseInfo = () => {
        setSelectedMember(null);
    };


    return (
      <div className="aboutUsPage"> 
        <div>
            <div className="header">
                <div className="logo">
                    <img src={courseroadlogo} alt="CourseRoad Logo"/>
                    <span className="courseRoadText">CourseRoad</span>
                </div>

                <div className="profile" onClick={handleOptionClick}>
                    <img src={defaultProfileImage} alt="Profile Icon" width="50" height="50"/> 
                    <ul className="profile-options" style={{ display: showProfileOptions ? 'block' : 'none' }}>
                        <button onClick={handleOptionClick}>Change Profile</button>
                        <button onClick={handleOptionClick}>Account settings</button>
                        <button onClick={handleOptionClick}>Logout</button>
                    </ul>
                </div>
            </div>

            <div className="main-content">
                <h1 style={{textAlign: 'center', color: 'white'}}>ABOUT US</h1>
                <div className="statements">
                    <div className="statement-box">
                        <h2>Vision</h2>
                        <p>To illuminate the path forward for learners, CourseRoad seeks to bridge the gap between aspirations and accomplishments. Our commitment is to provide a clear, strategic roadmap that aligns passion with purpose, guiding individuals towards their ultimate goals.</p>
                    </div>
                    <div className="statement-box">
                        <h2>Mission</h2>
                        <p>Envisioning a future where uncertainty in academic and career paths is a thing of the past. Through CourseRoad, we aim to create a world filled with confident achievers who, with the right guidance, can transform their dreams into realities.</p>
                    </div>
                </div>

                <div className="MeetTheTeam">
                    <button onClick={() => {
                        const footer = document.getElementById("myFooter");
                        footer.scrollIntoView({ behavior: "smooth" });
                    }}>Meet the Team</button>
                </div>

            </div>


            <div className="team-container">
            <h1>Meet the Team</h1>
            <div className="team-members">
                {teamMembers.map((member) => (
                    <div
                        key={member.id}
                        className="team-member"
                        onClick={() => handleMemberClick(member)}
                    >
                        <img
                            src={member.image}
                            alt={member.name}
                            className="member-image"
                        />
                    </div>
                ))}
            </div>
            {selectedMember && (
                <div
                    className={`member-info ${selectedMember ? 'active' : ''}`}
                >
                    <div className="member-image-container">
                        <img
                            src={selectedMember.image}
                            alt={selectedMember.name}
                            className="selected-member-image"
                        />
                    </div>
                    <div className="member-details">
                        <h2>{selectedMember.name}</h2>
                        <p>Address: {selectedMember.address}</p>
                        <p>Course: {selectedMember.course}</p>
                        <p>Year: {selectedMember.year}</p>
                        <p>Role: {selectedMember.role}</p>
                    </div>
                    <button onClick={handleCloseInfo}>Close</button>
                </div>
            )}
        </div>

            <footer id="myFooter">
                <div className="footer-content">
                    <div className="footer-logo">
                        <img src={courseroadlogo} alt="CourseRoad Logo"/>
                    </div>
                    <div className="footer-copyright">
                        © 2023 CourseRoad, Inc.
                    </div>
                    <div className="footer-links">
                        <div className="footer-about-us">
                            <h3>About us</h3>
                        </div>
                        <div className="footer-social">
                            <h3>Social Links</h3>
                            <ul>
                                {/* <li><a href="https://www.twitter.com"><img src={twitterIcon} alt="Twitter"/> Twitter</a></li>
                                <li><a href="https://www.facebook.com"><img src={facebookIcon} alt="Facebook"/> Facebook</a></li>
                                <li><a href="https://www.instagram.com/"><img src={instagramIcon} alt="Instagram"/> Instagram</a></li> */}
                                <FacebookIcon></FacebookIcon>
                                <LinkedInIcon></LinkedInIcon>
                                <GmailIcon></GmailIcon>
                                <InstagramIcon></InstagramIcon>
                            </ul>
                        </div>
                        <div className="footer-contact">
                            <h3>Contact Us</h3>
                            <p>Email: <span>courseroad.official@course.com</span></p>
                            <p>Phone: <span>+63 895264851</span></p>
                            <p>Location: <span>6037 CourseRoad St., Cebu City, Philippines</span></p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
      </div>
    );
}

export default AboutUs;