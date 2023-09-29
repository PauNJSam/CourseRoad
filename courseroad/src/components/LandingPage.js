import React from 'react';
import '../styles/LandingPage.css';

import logo from '../images/courseroad_logo.png';
import landingpageicon from '../images/landingpageicon.png';

import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <React.Fragment>
            <div className="desktop">
                <div className="div">
                    <img className="pngtreecartoon-man" alt="Pngtreecartoon man" src={landingpageicon} />
                    <div className="text-wrapper">BEST ONLINE COURSES</div>
                        <p className="everyone-agrees-with">
          Everyone agrees with the fact that learning management systems are a <br />
          tremendous way to expand learners’ knowledge base and help staff enhance their skills
                        </p>
                    <button className="rectangle">Enroll Now</button>        
                        <img
                          className="copy-of-software"
                          alt="Copy of software"
                          src={logo}
                        />
                </div>
            </div>
            <div className="container2">
                <div className="textwrapper">Help me please<br/>
                <button className="button" >Enroll Now</button>
                </div>
                
            </div>
            <div className="desktop">
                <div className="div">
                    <img className="pngtreecartoon-man" alt="Pngtreecartoon man" src={landingpageicon} />
                    <div className="text-wrapper">BEST ONLINE COURSES</div>
                        <p className="everyone-agrees-with">
          Everyone agrees with the fact that learning management systems are a <br />
          tremendous way to expand learners’ knowledge base and help staff enhance their skills
                        </p>
                    <button className="rectangle">Enroll Now</button>        
                        <img
                          className="copy-of-software"
                          alt="Copy of software"
                          src={logo}
                        />
                </div>
            </div>          
        </React.Fragment>
    );
};
export default LandingPage;