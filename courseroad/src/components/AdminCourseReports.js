import { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { collection, query, getDocs, orderBy, doc, deleteDoc } from "firebase/firestore";
import AdminCourseReview from '../modals/AdminCourseReview';
import DeleteIcon from '../icons/DeleteIcon';
import '../styles/AdminTeacherApplications.css'; 

const AdminCourseReports = () => {
    const [openModal, setOpenModal] = useState(false);
    const [appsData, setAppsData] = useState(null);
    const [userEmail, setUserEmail] = useState('');
    const [date, setDate] = useState(null);
    const [app, setApp] = useState(null);

    useEffect(() => {
      getApplications();
    
    }, [])
    

    const getApplications = async () => {
        try{
            const q = query(collection(db, "REPORTS"), orderBy("dateCreated", "desc"));

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

    const deleteApp = async (id) => {
        const appDocRef = doc(db, "REPORTS", id);
            await deleteDoc(appDocRef).then(()=>{
                alert("Successfully deleted Report");
                getApplications();
            }).catch((err)=>{
                console.log(err);
            })
    }

    return(
        <section className='teacher-app'>
            <div className='teacher-app__header'>
                <p>Reported Courses</p>
            </div>
            <div className='teacher-app__container'>
                {
                    appsData === null ? null : appsData.map((app)=>{
                        return(
                            <article className='application-row' key={app.id} >
                                <div className='application-detail-container'>
                                
                                    <div className='aplication__details'>
                                        <p className='applicant-email'>{app.userEmail}</p>
                                        <p className='date-submitted'>{app.dateSubmitted}</p>
                                    </div>
                                </div>
                                <div className='application__icons'>
                                    <p>Course ID: {app.courseID}</p>
                                    <p className='view-application' onClick={() => {setOpenModal(true); setUserEmail(app.userEmail); setDate(app.dateSubmitted); setApp(app)}}>View Report</p>
                                    <span className='delete-button' onClick={()=>{deleteApp(app.id)}}><DeleteIcon /></span>
                                </div>
                                
                                
                            </article>
                        )
                    })
                }
            </div>
            
            <AdminCourseReview open={openModal} close={() => setOpenModal(false)} appData={app} email={userEmail} date={date} />
        </section>
    );
};
export default AdminCourseReports;