import React, { useState } from "react";
import { sendPasswordResetEmail } from "@firebase/auth";
import { auth } from "../config/firebase";
import CloseIcon from "../icons/CloseIcon";
import "../styles/ForgotPass.css";

const ForgotPass = ({ open, close }) => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const handleResetPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            setShowPopup(true);
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        close();
    };

    if (!open) return null;
    return (
        <div onClick={close} className="forgot-pass__overlay">
            <div className="forgot-pass__modal-container" onClick={(e) => { e.stopPropagation(); }}>
                <CloseIcon className="forgot-pass__close-btn" onClick={close}></CloseIcon>

                <h2 className="forgot-pass__title">RESET PASSWORD</h2>

                <p>If you've forgotten your password, please enter your email address below. We'll send you a link to reset your password.</p>

                <input 
                    type="email"
                    className="forgot-pass__input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button className="forgot-pass__button" onClick={handleResetPassword}>
                    Send Reset Link
                </button>
                {message && <p>{message}</p>}

                {showPopup && (
                    <div className="forgot-pass__popup">
                        <p>Password reset link sent to your email.</p>
                        <button onClick={handleClosePopup}>DONE</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPass;