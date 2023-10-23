import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { auth } from "../config/firebase";
import {db} from '../config/firebase';
import { query, getDoc, doc} from "firebase/firestore";
import "../styles/DashboardLayout.css";
import { useNavigate } from "react-router-dom";
import courseroad_logo from "../images/courseroad_logo.png";
import BellIcon from "../icons/BellIcon";
import SettingsIcon from "../icons/SettingsIcon";
import FacebookIcon from "../icons/FacebookIcon";
import InstagramIcon from "../icons/InstagramIcon";
import GmailIcon from "../icons/GmailIcon";
import LinkedInIcon from "../icons/LinkedInIcon";
// import backgroundcontainer3 from "../images/backgroundcontainer3.png";
import Cookies from "universal-cookie";
import { onAuthStateChanged } from "firebase/auth";


const cookies = new Cookies();

const DashboardLayout = () => {
    const navigate = useNavigate();
    const loggedInEmail = auth?.currentUser?.email;
    const [userName, setUserName] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [userEmail, setEmail] = useState(loggedInEmail);

    useEffect(() => {
        // getUserInfo();
        console.log("Loged in User (DashboardLayout): ", auth?.currentUser?.email);
        console.log("Get auth token: ", cookies.get("auth-token"));
        const unsubscribe = onAuthStateChanged(auth, (userData)=>{
            if(userData){
                setEmail(userData.email);
                // console.log("EditFCSet: Current User is ", loggedInEmail);
                if(userEmail){
                    getUserInfo();
                }
            }
        });
        console.log("EditFCSet: useEffect has run");
        //getData();
        return () => {
            unsubscribe();
        }
    }, [loggedInEmail])
    

    const getUserInfo = async () => {
        const q = query(doc(db, "USERS", userEmail));

        const docSnap = await getDoc(q);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setUserName(docSnap.data().userName);
            setUserProfile(docSnap.data().profilePic);
          } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
          }
    };

    return(
        <section className='dashboard-nav'>
            <article className='dashboard-nav__nav-panel'>
                <img className='nav-panel__logo' src={courseroad_logo} alt="courseroad logo" />
                <div className='nav-panel__right-elements'>
                    <BellIcon className='nav-panel__align-center'></BellIcon>
                    <div className='dashboard-nav__vertical-line nav-panel__align-center'></div>
                    <div className='dashboard-nav__profile-pic'>
                        <img src={userProfile} alt='profile' />
                    </div>
                    <div className='dashboard-nav__username nav-panel__align-center'>
                        {<p>{userName}</p>}
                    </div>
                    <SettingsIcon className='nav-panel__align-center' onClick={()=>navigate("/dashboard/userSettings")}></SettingsIcon>
                </div>
            </article>

            <article>
                <Outlet />
            </article>

            <article className='dashboard-nav__footer'>
                <div className='footer__logo-info'>
                    <img src={courseroad_logo} alt="courseroad logo" width={200} />
                    <br></br>
                    <p>Course Road is an online course and certification company dedicated to host custom courses made by teachers to help students learn online.</p>
                    <br></br>
                    <br></br>
                    <p>All Rights Reserved blah blah</p>
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
                            <FacebookIcon></FacebookIcon>
                            <LinkedInIcon></LinkedInIcon>
                            <GmailIcon></GmailIcon>
                            <InstagramIcon></InstagramIcon>
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
        </section>
    );
};
export default DashboardLayout;