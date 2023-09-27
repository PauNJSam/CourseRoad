import "../styles/SignupTerms.css";

const SignupTerms = ({ open, close }) => {
    if (!open) return null;
    return(
        <div onClick={close} className="overlay">
            <div className="modal-container" onClick={(e)=>{e.stopPropagation();}}>
                <p className="close-btn" onClick={close}>X</p>
                <div className="header">
                    <p>Terms and Conditions</p>
                </div>
                
                <div className="content">
                    <p>
                    1. Acceptance of Terms By signing up for and using the services provided by CourseRoad, you agree to comply with and be bound by these Terms and Conditions.2. User Registration

2.1. To access certain features of the website, you may be required to register for an account. You must provide accurate and complete information during the registration process.

2.2. You are responsible for maintaining the security of your account credentials and for all activities that occur under your account.

3. Course and Certification

3.1. CourseRoad offers various courses and certifications. By enrolling in a course, you agree to abide by the course-specific terms and requirements provided by the instructor.

3.2. Successful completion of a course may result in the issuance of a certificate. CourseRoad reserves the right to revoke certificates for violations of our policies.

4. Payment and Refunds

4.1. Payment is required for certain courses and services. Payment information will be collected through secure payment gateways.

4.2. Refund policies are outlined separately and may vary based on the course or service.

5. User Conduct

5.1. You agree not to engage in any unlawful or prohibited activities on the website.

5.2. You are solely responsible for the content you submit, including but not limited to comments, reviews, and discussions. Do not post any infringing, offensive, or harmful content.

6. Privacy Policy

6.1. Your use of our website is also governed by our Privacy Policy, which is incorporated into these Terms and Conditions.

7. Termination

7.1. CourseRoad reserves the right to terminate or suspend your account at its sole discretion, with or without cause.

8. Changes to Terms

8.1. CourseRoad may update or modify these Terms and Conditions at any time. You will be notified of significant changes.

9. Limitation of Liability

9.1. CourseRoad is not responsible for any damages or losses resulting from your use of the website or its content.

10. Governing Law

10.1. These Terms and Conditions are governed by and construed in accordance with the laws.

11. Contact Information

11.1. For any questions or concerns about these Terms and Conditions, please contact us using the contact information in the footer.
                    </p>
                </div>
            </div>
        </div>
    );
};
export default SignupTerms;