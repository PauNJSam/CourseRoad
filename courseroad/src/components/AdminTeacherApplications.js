import { useState } from 'react';
import AdminTeacherReview from '../modals/AdminTeacherReview';

const AdminTeacherApplications = (props) => {
    const [openModal, setOpenModal] = useState(false);
    return(
        <section>
            <h3>This is the teacher applications</h3>
            <p onClick={() => setOpenModal(true)}>View Details</p>
            <AdminTeacherReview open={openModal} close={() => setOpenModal(false)} />
        </section>
    );
};
export default AdminTeacherApplications;