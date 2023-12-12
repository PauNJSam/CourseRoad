import { useState, useEffect } from "react";
import CertificateGrant from "../modals/CertificateGrant";
import '../styles/CourseTaking.css'
import {db} from '../config/firebase';
import { query, doc, where, getDoc, getDocs, collection } from "firebase/firestore";
import { useNavigate, useLocation } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import Loading from '../images/Loading.png';
import FailedExam from "../modals/FailedExam";

const ExamTaking = () => {
    const storedEmail = localStorage.getItem('authedUser');
    const courseDocID = useLocation().pathname.split('/')[3]
    const [openModal, setOpenModal] = useState(false);
    const [examData, setExamData] = useState(null);
    const [userData, setUserData] = useState(null);
    const [courseData, setCourseData] = useState(null);

    const [openModal2, setOpenModal2] = useState(false);

    const getUserInfo = async () => {
        const q = query(doc(db, "USERS", storedEmail));

        const docSnap = await getDoc(q);
        if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log("No such document!");
          }
    };
    
    useEffect(() => {
        console.log("UserEmail:", storedEmail);
        getUserInfo();
        getExam();
        getCourse();
            
    }, []);

    const getExam = async () => {

        try{
            const q = query(collection(db, "EXAMS"), where("courseID", "==", courseDocID));

            const querySnapshot = await getDocs(q);

            setExamData(querySnapshot.docs.map((doc)=> ({...doc.data(), id:doc.id})));
            console.log(examData);
        } catch(err){
            console.log(err.message);
        }
        console.log(examData);
    };
    const getCourse = async () => {
        try{
            const docRef = doc(db, "COURSESCREATED", courseDocID);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setCourseData(docSnap.data())
            } else {
            console.log("No such document!");
            }
        } catch(err){
            console.log(err.message);
        }
        
    };

    const finishExam = (e) =>{
        e.preventDefault();
        //check answers and score 
        //if pass 
        setOpenModal(true);
        //else
        //fail modal mo pop up
    }
    const failedExamFunc = (e) =>{
        e.preventDefault();
        //check answers and score 
        //if pass 
        setOpenModal2(true);
        //else
        //fail modal mo pop up
    }
    return(
        <div>
            <form onSubmit={finishExam}>
                {/* <p>{examData?.courseID}</p>
                <p>{examData?.examInstructions}</p> */}
                {
                    examData == null ? <img src={Loading} alt='loadiing...' width='200px' /> : examData.map((exam)=>{
                        return(
                            <div>
                                <p>{exam.courseID}</p>
                                <p>{exam.passingScore}</p>

                            </div>
                        );
                    })
                }

                <button type="submit">Submit Exam</button>
                <button type="button" onClick={failedExamFunc}>Failed Exam</button>
            </form>

            <div>
                <CertificateGrant userData={userData} courseData={courseData} open={openModal} close={()=>{setOpenModal(false)}} />
            </div>
            <div>
                <FailedExam userData={userData} courseData={courseData} open={openModal2} close={()=>{setOpenModal2(false)}} />
            </div>
        </div>
    );
};
export default ExamTaking;