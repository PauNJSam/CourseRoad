import { useState } from "react";
import TeacherApplicationForm from "../modals/TeacherApplicationForm";
import "../styles/UserSettings.css";

const UserSettings = () => {
    const [openModal, setOpenModal] = useState(false);

    return(
        <section>
            <button onClick={() => setOpenModal(true)} >Apply To Be a Teacher</button>
            <TeacherApplicationForm open={openModal} close={() => setOpenModal(false)} />
        </section>
    );
};
export default UserSettings;