import CloseIcon from "../icons/CloseIcon";
import "../styles/TeacherApplicationForm.css";

const TeacherApplicationForm = ({ open, close }) => {
    if (!open) return null;
    return(
        <div onClick={close} className="teacher-app__overlay">
            <div className="teacher-app__modal-container" onClick={(e)=>{e.stopPropagation();}}>
                
                <CloseIcon className="teacher-app__close-btn" onClick={close}></CloseIcon>
                {/* place content here */}
                
            </div>
        </div>
    );
};
export default TeacherApplicationForm;