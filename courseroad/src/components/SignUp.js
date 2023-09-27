import { useRef, useState } from "react";
import "../styles/SignUp.css";
import courseroad_logo from "../images/courseroad_logo.png"
// import signup_img_cropped from '../images/signup_img_cropped.jpg'
import { auth, db } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import SignupTerms from "../modals/SignupTerms";

/* Notes: error messages are not working well in testing, doubting its the useRef that triggers the wrong error message
because it persists even after inputting again another type of error to test. Solution: reset the values every
after checking. So add e.g. emailRef.current.value='' */

const SignUp = () => {

    const [openModal, setOpenModal] = useState(false);

    const userNameRef = useRef();
    const emailRef = useRef();
    const passRef = useRef();
    const confirmPassRef = useRef();
/*     const [isPassLengthShort, setIsPassLengthShort] = useState(false);
    const [userExists, setUserExists] = useState(false); */
    const [isError, setIsError] = useState(false);
    const [doesPassNotMatch, setDoesPassNotMatch] = useState(false);
    const navigate = useNavigate();

    const signUp = async (e) => {
        e.preventDefault();
        setDoesPassNotMatch(false);
        setIsError(false);
        if(passRef.current.value!==confirmPassRef.current.value){
            setDoesPassNotMatch(true);
        } else {
            try{
                await createUserWithEmailAndPassword(auth, emailRef.current.value, passRef.current.value);
                addNewUser();
                console.log(passRef.current.value);
                //navigate("/signin"); //change this later to sign for the user to sign in after creating the account
                // also after navigating, click back to the page to see if na empty balik ang input fields
            } catch(err){
                    setIsError(true);
                
                console.log(err.message);
            }
        }
    };

    const addNewUser = async () => {
        try{

        } catch (err){

        }
    };

    return(
        <section className="SignUp" >
            <div className="signup-modal">

                <aside className="side-img">
                    {/* <img src={signup_img_cropped} alt="learning online" /> */}
                </aside>

                <article>

                    <div className="signup-modal__header">
                        <img src={courseroad_logo} alt="courseroad logo" width={100} />
                        <p>Create Account</p>
                    </div>

                    <form onSubmit={signUp}>
                        <div className="input-text">
                            <input type='text' className='signup_input' ref={userNameRef} placeholder='Username' required></input>
                            <input type='email' className='signup_input' ref={emailRef} placeholder='Email' required></input>
                            <input type='password' className='signup_input' ref={passRef} placeholder='Password' required></input>
                            <input type='password' className='signup_input' ref={confirmPassRef} placeholder='Confirm Password' required></input>
                            {doesPassNotMatch && <div style={{backgroundColor:'#be21216a', borderRadius:'5px', padding:'4px', marginTop:'5px'}}><span style={{fontSize: '0.6rem', color: '#EAF0F3'}}>Password does not match</span></div>}
                            {isError && <div style={{backgroundColor:'#be21216a', borderRadius:'5px', padding:'4px', marginTop:'5px'}}><span style={{fontSize: '0.6rem', color: '#EAF0F3'}}>Email already in use or Password should be at least 6 characters</span></div>}
                        </div>

                        <div className="input-cb-btn">
                            <label>
                                <input type='checkbox' id="sign-up-cb" required/> Accept <span onClick={() => setOpenModal(true)} style={{color:'#f1bf19', cursor:'pointer'}}>Terms and Conditions</span>
                            </label>
                            <div className="input-btns">
                                <button type='button' >Sign In</button>
                                <button type='submit' >Sign Up</button>
                            </div>
                        </div>
                    </form>
                    
                </article>
            </div>
            <SignupTerms open={openModal} close={() => setOpenModal(false)} />
        </section>
    );
};

export default SignUp;