import "../styles/SignupTerms.css";
import CloseIcon from "../icons/CloseIcon";

const SignupTerms = ({ open, close }) => {
    if (!open) return null;
    return(
        <div onClick={close} className="overlay">
            <div className="modal-container" onClick={(e)=>{e.stopPropagation();}}>
                {/* <p className="close-btn" onClick={close}>X</p> */}
                <div className="header">
                    <p className="bold big-font">Terms and Conditions</p>
                    <CloseIcon className="close-btn" onClick={close}></CloseIcon>
                </div>
                
                <div className="content">
                    <p className="bold">1. Acceptance of Terms</p>
                    <p className="line-height">By signing up for and using the services provided by CourseRoad, you agree to comply with and be bound by these Terms and Conditions.</p>
                    <p className="bold">2. User Registration</p>
                    <p className="line-height">2.1. To access certain features of the website, you may be required to register for an account. You must provide accurate and complete information during the registration process.<br></br>2.2. You are responsible for maintaining the security of your account credentials and for all activities that occur under your account.</p>
                    <p className="bold">3. Course and Certification</p>
                    <p className="line-height">3.1. CourseRoad offers various courses and certifications. By enrolling in a course, you agree to abide by the course-specific terms and requirements provided by the instructor.<br></br>3.2. Successful completion of a course may result in the issuance of a certificate. CourseRoad reserves the right to revoke certificates for violations of our policies.</p>
                    <p className="bold">4. Payment and Refunds</p>
                    <p className="line-height">4.1. Payment is required for certain courses and services. Payment information will be collected through secure payment gateways.<br></br>4.2. Refund policies are outlined separately and may vary based on the course or service.</p>
                    <p className="bold">5. User Conduct</p>
                    <p className="line-height">5.1. You agree not to engage in any unlawful or prohibited activities on the website.<br></br>5.2. You are solely responsible for the content you submit, including but not limited to comments, reviews, and discussions. Do not post any infringing, offensive, or harmful content.</p>
                    <p className="bold">6. Privacy Policy</p>
                    <p className="line-height">6.1. Your use of our website is also governed by our Privacy Policy, which is incorporated into these Terms and Conditions.</p>
                    <p className="bold">7. Termination</p>
                    <p className="line-height">7.1. CourseRoad reserves the right to terminate or suspend your account at its sole discretion, with or without cause.</p>
                    <p className="bold">8. Changes to Terms</p>
                    <p className="line-height">8.1. CourseRoad may update or modify these Terms and Conditions at any time. You will be notified of significant changes.</p>
                    <p className="bold">9. Limitation of Liability</p>
                    <p className="line-height">9.1. CourseRoad is not responsible for any damages or losses resulting from your use of the website or its content.</p>
                    <p className="bold">10. Governing Law</p>
                    <p className="line-height">10.1. These Terms and Conditions are governed by and construed in accordance with the laws.</p>
                    <p className="bold">11. Contact Information</p>
                    <p className="line-height">11.1. For any questions or concerns about these Terms and Conditions, please contact us.</p>
                </div>
                <p className="exit-text" onClick={close}>I have read the Terms and Conditions</p>
            </div>
        </div>
    );
};
export default SignupTerms;