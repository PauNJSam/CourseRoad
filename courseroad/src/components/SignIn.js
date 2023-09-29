import React from 'react';
import CHeroLogo from '../images/courseroad_logo.png';
import Pad from '../images/rectangle7361801-zq92-600w.png';
import Goog from '../images/rectangle7391801-l43o.svg';
import Googlogo from '../images/googleglogo11801-6zi9-200h.png';
import '../styles/SignIn.css';
import { useNavigate } from 'react-router-dom';

const SignInPage = (props) => {
    const navigate = useNavigate();
    const signup =() => {
        navigate('/signup');
    }
    const dashboard=() => {
      navigate('/dashboard');
  }
  return (
    <div className="sign-in-page-container">
      <div className="sign-in-page-sign-in-page">
        <img
          src= {Pad}
          alt="Rectangle7361801"
          className="sign-in-page-rectangle736"
        />
        <button className="sign-in-page-signinbtnbutton">
          <span className="sign-in-page-text">
            <span>Sign in</span>
          </span>
        </button>
        <input
          type="text"
          placeholder="Email"
          className="sign-in-page-input-text-boxinput"
        />
        <input
          type="text"
          placeholder="Password"
          className="sign-in-page-input-text-boxinput1"
        />
        <span className="sign-in-page-text02">
          <span>Welcome Back!</span>
        </span>
        <button className="sign-in-page-group631643button">
          <img
            src={Goog}
            alt="Rectangle7391801"
            className="sign-in-page-rectangle739"
          />
          <span onClick={dashboard} className="sign-in-page-text04">
            <span>Sign in with Google</span>
          </span>
          <img
            src={Googlogo}
            alt="GoogleGLogo11801"
            className="sign-in-page-google-glogo1"
          />
        </button>
        <img
          src={CHeroLogo} 
          alt="CopyofSoftwaredevelopment3projectplan221801"
          className="sign-in-page-copyof-softwaredevelopment3projectplan22"
        />
        <span className="sign-in-page-text06">
          <span>Forgot Password?</span>
        </span>
        <button onClick={signup} className="sign-in-page-signinbtnbutton1">
          <span className="sign-in-page-text08">
            <span>Sign up</span>
          </span>
        </button>
      </div>
    </div>
  )
}

export default SignInPage;