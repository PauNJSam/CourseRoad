import React, { useRef, useState } from 'react';
import '../styles/AdminSignIn.css';
import { useNavigate} from "react-router-dom";
import {db} from '../config/firebase';
import { doc, getDoc } from "firebase/firestore";

const AdminSignIn = () => {
    const navigate = useNavigate();
    const passRef = useRef();
    const [passPlaceholder, setPassPlaceholder] = useState("Password");

    const signIn = async (e) => {
        e.preventDefault();
        try{
            const docRef = doc(db, "ADMIN", "signInPass");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
                if(docSnap.data().pass == passRef.current.value){
                    navigate("/admin/");
                } else{
                    passRef.current.value = '';
                    setPassPlaceholder("Incorrect Password");
                }
            } else {
            console.log("No such document!");
            }
        } catch(err){
            console.log(err.message);
        }
    }


    return(
        <section>
            <div className = "adminsignin_container">
            <div class="wrapper">
                    <div class="title-text">
                       <div class="title login">
                          Login Form
                       </div>
                    </div>
                     <div class="form-container">
                        <div class="form-inner">
                           <form class="login">
                                <div class="field">
                                   <input ref={passRef} type="password" placeholder={passPlaceholder} required></input>
                                </div>
                                <div className = "inner_container">
                                <button class="signupBtn" onClick={signIn}>SIGN IN
                                    <span class="arrow">
                                       <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512" fill="rgb(183, 128, 255)"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"></path></svg>
                                    </span>
                                </button>
                                </div>
                           </form>
                        </div>
                     </div>
                  </div>
            </div>
        </section>              
    );
};

export default AdminSignIn;