import React from "react";
import '../styles/AboutUs.css';

import { Link } from 'react-router-dom';

const AboutUs= ()=>{
    return(
        <React.Fragment>
            <div className="about-us-edited">
                <div className="div">
                  <header className="header">
                    <div className="overlap-group">
                      <div className="overlap">
                        <div className="text-wrapper">User Name</div>
                        <div className="text-wrapper-2">Account Settings</div>
                        <div className="profile-icon"></div>
                      </div>
                      <div className="text-wrapper-3">CourseRoad</div>
                    </div>
                  </header>
                  <div className="body">
                    <div className="overlap-2">
                      <img className="line" src="img/line-1.svg" />
                      <div className="text-wrapper-4">Vision</div>
                      <p className="to-illuminate-the">
                        To illuminate the path forward for learners, &#39;CourseRoad&#39; seeks to bridge the gap between
                        aspirations and accomplishments. Our commitment is to provide a clear, strategic roadmap that aligns
                        passion with purpose, guiding individuals towards their ultimate goals.
                      </p>
                      <p className="envisioning-a-future">
                        Envisioning a future where uncertainty in academic and career paths is a thing of the past. Through
                        &#39;CourseRoad,&#39; we aim to create a world filled with confident achievers who, with the right
                        guidance, can transform their dreams into realities.
                      </p>
                      <div className="text-wrapper-5">Mission</div>
                    </div>
                    <div className="text-wrapper-6">ABOUT US</div>
                  </div>
                </div>
              </div>
        </React.Fragment>
    );
}
export default AboutUs;