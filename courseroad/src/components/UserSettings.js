import { useState } from "react";
import TeacherApplicationForm from "../modals/TeacherApplicationForm";
import "../styles/UserSettings.css";

const UserSettings = () => {
    const [openModal, setOpenModal] = useState(false);

    return(
        <section>
                {/* <button onClick={() => setOpenModal(true)} >Apply To Be a Teacher</button>
            <TeacherApplicationForm open={openModal} close={() => setOpenModal(false)} /> */}
            <div className="desktop">
      <div className="frame-wrapper">
        <div className="frame">
          <div className="overlap">
            <img className="ellipse" alt="Ellipse" src="ellipse-136.png" />
            <div className="text-wrapper">John Doe</div>
            <div className="div">Student</div>
            <img className="icon-edit" alt="Icon edit" src="icon-edit.png" />
          </div>
          <div className="text-wrapper-2">John Doe</div>
          <div className="rectangle" />
          <div className="rectangle-2" />
          <div className="rectangle-3" />
          <div className="text-wrapper-3">Account Settings</div>
          <div className="text-wrapper-4">Username:</div>
          <div className="text-wrapper-5">New password:</div>
          <div className="text-wrapper-6">Change password</div>
          <p className="p">Create your own course! Join Us Now!</p>
          <div className="text-wrapper-7">Confirm password:</div>
          <div className="overlap-group">
            <div className="text-wrapper-8">Save</div>
          </div>
          <div className="div-wrapper">
            <p className="text-wrapper-9">Apply to be a teacher</p>
          </div>
        </div>
      </div>
    </div>
        </section>
            
    );
};
export default UserSettings;