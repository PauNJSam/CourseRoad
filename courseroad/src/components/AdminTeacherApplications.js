import { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { collection, query, getDocs, where, orderBy } from "firebase/firestore";
import AdminTeacherReview from '../modals/AdminTeacherReview';
import DeleteIcon from '../icons/DeleteIcon';
import '../styles/AdminTeacherApplications.css';
// import { format } from 'date-fns';

const AdminTeacherApplications = (props) => {
    const [openModal, setOpenModal] = useState(false);
    const [appsData, setAppsData] = useState(null);

    useEffect(() => {
      getApplications();
    
    }, [])
    

    const getApplications = async () => {
        try{
            const q = query(collection(db, "TAPPLICATIONS"), orderBy("dateCreated", "desc"));

            const querySnapshot = await getDocs(q);

            setAppsData(querySnapshot.docs.map((doc)=> {
                const dateCreated = doc.data().dateCreated.toDate(); // Convert Firestore timestamp to JavaScript Date
                // Format the date as "Month Day, Year"
                const dateOptions = {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                };

                const dateSubmitted = new Intl.DateTimeFormat('en-US', dateOptions).format(dateCreated);

                return {
                    ...doc.data(),
                    id: doc.id,
                    dateSubmitted,
                };
            }));
        } catch(err){
            console.log(err.message);
        }
    };

    return(
        <section className='teacher-app'>
            <div className='teacher-app__header'>
                <p>Teacher Applications</p>
            </div>
            <div className='teacher-app__container'>
                {
                    appsData === null ? null : appsData.map((app)=>{
                        return(
                            <article className='application-row' key={app.id} >
                                <div className='application-detail-container'>
                                    <div className='user-pic-container'>
                                        <img className='user-pic' src={app.userProfilePic} alt='courseThumbnail' />
                                    </div>
                                
                                    <div className='aplication__details'>
                                        <p className='applicant-email'>{app.userEmail}</p>
                                        <p className='date-submitted'>{app.dateSubmitted}</p>
                                    </div>
                                </div>
                                <div className='application__icons'>
                                    <p className='view-application' onClick={() => setOpenModal(true)}>View Application</p>
                                    <span className='delete-button'><DeleteIcon /></span>
                                </div>
                                
                                
                            </article>
                        )
                    })
                }
            </div>
            
            <AdminTeacherReview open={openModal} close={() => setOpenModal(false)} />
        </section>
    );
};
export default AdminTeacherApplications;