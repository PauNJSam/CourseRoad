import React from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/LandingPage.css';
import backgroundimage3 from '../images/backgroundcontainer3.png';
import logo from '../images/courseroad_logo.png';
import landingpageicon from '../images/landingpageicon.png';

import { Link } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();
    const signin =() => {
        navigate('/signin');
    }

    return (
        <React.Fragment>
            <div className="desktop">
                <div className="div">
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

            <div className="footer">
                <div className="container4">
                    <img className="image4" alt="logo" src={logo}/>
                    <div className="text-wrapper4">
                        Copyright © 2021 CourseRoad Inc., All Rights Reserved.<br/>
                    </div>
                </div>
                <div className="container5">
                    <div className="text-wrapper5">Contact Us</div>
                    <div className="a">
                        <a href="https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&emr=1&followup=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&ifkv=AYZoVhdFIPG-0Yjy2Ct9D7sFFAzQyC-P5PjFpoDAo1x-XvAKVZVGUs9-1HmnQ7mU8rIUkmk8tSkMuw&osid=1&passive=1209600&service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-1626854257%3A1696007372330932&theme=glif">Gmail<br/></a>
                        <a href="https://www.facebook.com/">Facebook<br/></a>
                        <a href="https://twitter.com/">Twitter<br/></a>
                        <a href="https://account.microsoft.com/account/Account">Microsoft<br/></a>
                    </div>
                </div>
                <div className="container6">

                </div>
            </div>
                    
        </React.Fragment>
    );
};
export default LandingPage;