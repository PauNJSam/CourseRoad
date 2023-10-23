import CloseIcon from "../icons/CloseIcon";
import "../styles/AdminTeacherReview.css";

const AdminTeacherReview = ({ open, close }) => {

    if (!open) return null;

    return(
        <div onClick={close} className="teacher-review__overlay">
            <div className="teacher-reveiw__modal-container" onClick={(e)=>{e.stopPropagation();}}>
                
                <CloseIcon className="teacher-review__close-btn" onClick={close}></CloseIcon>
                {/* insert code here */}
                
            </div>
        </div>
    );
};
export default AdminTeacherReview;