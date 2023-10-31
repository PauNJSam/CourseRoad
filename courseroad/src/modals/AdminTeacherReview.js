import CloseIcon from "../icons/CloseIcon";
import "../styles/AdminTeacherReview.css";

const AdminTeacherReview = ({ open, close, email, date }) => {

    if (!open) return null;

    return(
        <div onClick={close} className="teacher-review__overlay">
            <div className="teacher-review__modal-container" onClick={(e)=>{e.stopPropagation();}}>
                
                <CloseIcon className="teacher-review__close-btn" onClick={close}></CloseIcon>
                <p>{email}</p>
                <p>{date}</p>
                
            </div>
        </div>
    );
};
export default AdminTeacherReview;