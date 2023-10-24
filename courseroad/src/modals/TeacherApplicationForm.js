import { useRef, useState } from "react";
import { auth } from "../config/firebase";
import {db, storage} from '../config/firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import CloseIcon from "../icons/CloseIcon";
import "../styles/TeacherApplicationForm.css";

const TeacherApplicationForm = ({ dp, email, open, close }) => {

    const loggedInEmail = auth?.currentUser?.email;
    const educ_bgRef = useRef();
    const teach_expRef = useRef();
    const current_affRef = useRef();
    const [teacherResume, setTeacherResume] = useState('');
    const [resumeFile, setResumeFile] = useState();
    

    if (!open) return null;

    /* const submit_application = () =>{
        if(teacherResume == null) return;

        const resumeRef = ref(storage, `teacherResumes/${teacherResume.name + crypto.randomUUID()}`);
        uploadBytes(resumeRef, teacherResume).then(()=>{
            alert("Image Uploaded");
            getDownloadURL(resumeRef).then(async(url)=>{
                console.log("The resume URL: ",url);
                const applicationDocRef = await addDoc(collection(db, "TAPPLICATIONS"), {
                    educ_bg: educ_bgRef.current.value,
                    teach_exp: teach_expRef.current.value,
                    current_aff: current_affRef.current.value,
                    resume: teacherResume,
                    userEmail: '',
                    dateCreated: serverTimestamp(),
                }).then(()=>{
                    alert("Application Sent");
                }).catch((error)=>{
                    console.error('Error adding document: ', error);
                })
                
            }).catch((error) => {
                console.error('Error getting resume URL: ', error);
            });
            
        }).catch((error) => {
            console.error('Error uploading image: ', error);
        });
    } */

    const submit_application = async () => {
// Add a new document with a generated id.
            if(resumeFile == null) return;
            const docRef = await addDoc(collection(db, "TAPPLICATIONS"), {
                duc_bg: educ_bgRef.current.value,
                teach_exp: teach_expRef.current.value,
                current_aff: current_affRef.current.value,
                resume: resumeFile,
                userEmail: loggedInEmail,
                dateCreated: serverTimestamp(),
                isAccepted: null,
                userProfilePic: dp
    
            }).then((docRef)=>{
                alert("Application Sent");
            }).catch((error) => {
                console.error('Error sending application: ', error);
            });
            
    }

    const uploadResume = () =>{
        if(teacherResume == null) return;

        const resumeRef = ref(storage, `teacherResumes/${teacherResume.name + crypto.randomUUID()}`);
        uploadBytes(resumeRef, teacherResume).then(()=>{
            alert("Resume Uploaded");
            getDownloadURL(resumeRef).then(async(url)=>{
                setResumeFile(url);
                console.log("The resume URL: ",url);
            }).catch((error) => {
                console.error('Error getting resume URL: ', error);
            });
            
        }).catch((error) => {
            console.error('Error uploading resume: ', error);
        });
    };

    return(
        <div onClick={close} className="teacher-app__overlay">
            <div className="teacher-app__modal-container" onClick={(e)=>{e.stopPropagation();}}>
                
                <CloseIcon className="teacher-app__close-btn" onClick={close}></CloseIcon>
                <p className="teacher-app__title">Teacher Application Form</p>
                <div className="teacher-app__form-container">
                    <form className="teacher-app__form" >
                        <div className="form__text-inputs">
                            <label>Educational Background<input type="text" ref={educ_bgRef} required></input></label>
                            <label>Teaching Experience (yrs.)<input type="text" ref={teach_expRef} required></input></label>
                            <label>Current Affiliation<input type="text" ref={current_affRef} required></input></label>
                        </div>
                        <div className="form__file-input">
                            <label>Resume<input type="file" onChange={(event)=> {setTeacherResume(event.target.files[0])}} required></input></label>
                            <p>Pdf. & docx</p>
                            <button type="button" onClick={uploadResume}>Upload Resume</button>
                            <button type="button" onClick={submit_application}>Submit</button>
                        </div>
                    </form>
                </div>
                
            </div>
        </div>
    );
};
export default TeacherApplicationForm;