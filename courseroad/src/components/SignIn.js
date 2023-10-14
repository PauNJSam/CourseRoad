import React, { useRef, useState } from 'react';
import CHeroLogo from '../images/courseroad_logo.png';
import Pad from '../images/rectangle7361801-zq92-600w.png';
// import Goog from '../images/rectangle7391801-l43o.svg';
import Googlogo from '../images/googleglogo11801-6zi9-200h.png';
import '../styles/SignIn.css';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup } from 'firebase/auth';
import ForgotPass from '../modals/ForgotPass';


const SignInPage = (props) => {
  const [openModal, setOpenModal] = useState(false);
    const emailRef = useRef();
    const passRef = useRef();
    const navigate = useNavigate();
    const signup =() => {
        navigate('/signup');
    }
    
  const signin = async () => {
    try{signInWithEmailAndPassword(auth, emailRef.current.value, passRef.current.value)
        .then((userCredentials) => {
            console.log("User credentials: ",userCredentials);
            navigate("/dashboard");
        }) .catch((err) => {
            console.log(err);
        });
        
    } catch(err){
        console.error(err);
    }
};
const googleSignin = async () => {
  try{
    await signInWithPopup(auth, googleProvider);
    navigate('/dashboard');
} catch(err) {
    console.error(err);
}
};
  return (
    <div className="sign-in-page-container">
      <div className="sign-in-page-sign-in-page">
        <img
          src= {Pad}
          alt="Rectangle7361801"
          className="sign-in-page-rectangle736"
        />
        <button onClick={signin} className="sign-in-page-signinbtnbutton">
          <span className="sign-in-page-text">
            <span>Sign in</span>
          </span>
        </button>
        <input
        ref={emailRef}
          type="text"
          placeholder="Email"
          className="sign-in-page-input-text-boxinput"
        />
        <input
        ref={passRef}
          type="password"
          placeholder="Password"
          className="sign-in-page-input-text-boxinput1"
        />
        <span className="sign-in-page-text02">
          <span>Welcome Back!</span>
        </span>
        <button className="sign-in-page-group631643button" type='button' onClick={googleSignin}>
          {/* <img
            src={Goog}
            alt="Rectangle7391801"
            className="sign-in-page-rectangle739"
          /> */}
          <span className="sign-in-page-text04">
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
          <u><span onClick={() => setOpenModal(true)}>Forgot Password?</span></u>
        </span>
        <button onClick={signup} className="sign-in-page-signinbtnbutton1">
          <span className="sign-in-page-text08">
            <span>Sign up</span>
          </span>
        </button>
      </div>
      <ForgotPass open={openModal} close={() => setOpenModal(false)} />
    </div>
  )
}

export default SignInPage;