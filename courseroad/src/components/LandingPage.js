import React from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/LandingPage.css';
import backgroundimage3 from '../images/backgroundcontainer3.png';
import logo from '../images/courseroad_logo.png';
import landingpageicon from '../images/landingpageicon.png';
import FacebookIcon from "../icons/FacebookIcon";
import InstagramIcon from "../icons/InstagramIcon";
import GmailIcon from "../icons/GmailIcon";
import LinkedInIcon from "../icons/LinkedInIcon";
import courseroad_logo from "../images/courseroad_logo.png";

import { Link } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();
    const signin =() => {
        navigate('/signin');
    }
    const aboutus =() => {
        navigate('/aboutus');
    }
    const faqs =() => {
        navigate('/faqs');
    }
    return (
        <div className='landing-page'>
            <div className="desktop">
                    <img className="pngtreecartoon-man" alt="Pngtreecartoon man" src={landingpageicon} />
                    <div className="text-wrapper">BEST ONLINE COURSES</div>
                        <p className="everyone-agrees-with">
          Everyone agrees with the fact that learning management systems are a
          tremendous way to expand learners’ knowledge base and help staff enhance their skills
                        </p>
                    <button onClick={signin} className="rectangle" >Enroll Now</button>        
                        <img
                          className="copy-of-software"
                          alt="Copy of software"
                          src={logo}
                        />
            </div>
            <div className="container2">
                <div className="textwrapper">CourseRoad Registration is Now Open!</div>
                <button onClick={signin} className="button" >Enroll Now</button>              
            </div>
            <div className="frame">
                <div className="frame-wrapper">
                    <div className="text-wrapper">OUR MISSION</div>
                        <p className="div">It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more
                                    recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                    <div onClick={signin} className="button1">Enroll Now</div>       
                </div>
                <img className="image" alt="groupofpeople" src={backgroundimage3}/>
                  
            </div>
            {/*------------- Footer ------------- */}

            <article className='dashboard-nav__footer'>
                <div className='footer__logo-info'>
                    <img src={courseroad_logo} alt="courseroad logo" width={200} />
                    <br></br>
                    <p>Course Road is an online course and certification company dedicated to host custom courses made by teachers to help students learn online.</p>
                    <br></br>
                    <br></br>
                    <p>Copyright © 2021 CourseRoad Inc., All Rights Reserved.</p>
                </div>

                <div className='footer__contact-info'>
                    <p className='footer__title'>Contact Us</p>
                    <div className='footer__contact-details'>
                        <div className='contact-info__bold-labels'>
                            <p>Tel:</p>
                            <br></br>
                            <p>Phone:</p>
                            <br></br>
                            <p>Email:</p>
                            <p>Location:</p>
                        </div>
                        <div className='contact-info__info-values'>
                            <p>(02)7454088</p>
                            <p>(02)4554601</p>
                            <p>0986-324-4567</p>
                            <p>0966-712-4510</p>
                            <p>support@courseroad.com.ph</p>
                            <p>40 Langka Street, Brgy</p>
                            <p>Quirino 2Cebu City 032, Philippines</p>
                        </div>
                    </div>
                </div>

                <div className='footer__links'>
                    <div className='footer__social-links'>
                        <p className='footer__title'>Social Links</p>
                        <div className='footer__social-media-icons'>
                            <FacebookIcon href="https://www.facebook.com/" ></FacebookIcon>
                            <LinkedInIcon href="https://www.linkedin.com/"></LinkedInIcon>
                            <GmailIcon href="https://mail.google.com/"></GmailIcon>
                            <InstagramIcon href="https://www.instagram.com/"></InstagramIcon>
                        </div>
                    </div>
                    <div className='footer__know-more'>
                        <p className='footer__title'>Know More</p>
                        <div className='footer__quick-links'>
                            <p onClick={()=>navigate("/aboutus")}><u>About Us</u></p>
                            <p onClick={()=>navigate("/faqs")}><u>FAQs</u></p>
                        </div>
                    </div>
                </div>
            </article>
                    
        </div>
    );
};
export default LandingPage;