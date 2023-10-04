import CloseIcon from "../icons/CloseIcon";
import "../styles/ForgotPass.css";

const ForgotPass = ({ open, close }) => {
    if (!open) return null;
    return(
        <div onClick={close} className="forgot-pass__overlay">
            <div className="forgot-pass__modal-container" onClick={(e)=>{e.stopPropagation();}}>
                
                <CloseIcon className="forgot-pass__close-btn" onClick={close}></CloseIcon>
                {/* place content here */}
                
            </div>
        </div>
    );
};
export default ForgotPass;