import React, { useRef, useState, useEffect } from 'react';
import '../styles/CourseTaking.css'
import {db, storage} from '../config/firebase';
import { collection, addDoc, serverTimestamp, query, getDocs, doc, updateDoc, arrayUnion, where, orderBy, getDoc, setDoc, deleteDoc, arrayRemove, FieldValue } from "firebase/firestore";
import { useNavigate, useLocation } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UploadIcon from "../icons/UploadIcon";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import EditChapter from '../modals/EditChapter';
import Loading from '../images/Loading.png';

const CourseTaking = () => {
    const courseDocID = useLocation().pathname.split('/')[3]
    const loggedInEmail = auth?.currentUser?.email;
    const [userEmail, setUserEmail] = useState(loggedInEmail);
    const [chaptersData, setChaptersData] = useState(null);
    const [courseData, setCourseData] = useState(null);
    const [chaptersChecked, setChaptersChecked] = useState(null);


    const navigate = useNavigate();



    useEffect(() => {
        getCourse();
        getChapters();
        const unsubscribe = onAuthStateChanged(auth, (userData)=>{
            if(userData){
                setUserEmail(userData.email);
                console.log("User logged in (EditCourse): ", userData.email);
            }
        });
    
      return () => {
        unsubscribe();
      }
      
    }, [loggedInEmail]);

    const getChapters = async () => {
        try{
            const q = query(collection(db, "CHAPTERS"), where("courseID", "==", courseDocID), orderBy("dateCreated", "asc"));

            const querySnapshot = await getDocs(q);

            setChaptersData(querySnapshot.docs.map((doc)=> ({...doc.data(), id:doc.id})));
        } catch(err){
            console.log(err.message);
        }
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

    const checkTheBox = async (chapID) => {
        /* const courseDocRef = doc(db, "COURSESCREATED", courseDocID)
                
                    await updateDoc(courseDocRef, {
                        mockCoursesEnrolled: arrayUnion({
                            chapterID: chapterDocRef.id, 
                            chapterTitle:  newChapterTitleRef.current.value,
                            chapterDescription:  chapterDescriptionRef.current.value
                        })
                    })

                    try{
                        const q = query(collection(db, "USERS", "mockCoursesEnrolled"), where("userCourseID", "==", courseDocID));
                        await updateDoc(q, {
                            chapID: true,
                        })
            
                        const querySnapshot = await getDocs(q);
            
                    } catch(err){
                        console.log(err.message);
                    } */
    };

    return(
        <section className="CourseTaking">
            <article>
                {courseData == null ? <img src={Loading} alt='loadiing...' width='200px' />: <p>{courseData.courseTitle}</p>}
                <div>
                    <p>Course Description</p>
                    {courseData == null ? <img src={Loading} alt='loadiing...' width='200px' /> : <p>{courseData.courseDescription}</p>}
                </div>
            </article>

            {
                chaptersData == null ? <img src={Loading} alt='loadiing...' width='200px' /> : chaptersData.map((chapter)=>{
                    return(
                        <div className='added-chapter__chapter' key={chapter.id}>
                            <div className='chapter-texts'>
                                <div>
                                    <p className='chapter-title'>{chapter.chapterTitle}</p>
                                    <p dangerouslySetInnerHTML={{__html: chapter.chapterDescription}} />
                                </div>
                                
                            </div>
                            <div className='chapter-files'>
                                <div className='chapter-files__files'>
                                    <p className='chapter-files__label'>Files Uploaded:</p>
                                    {chapter.chapterFiles.map((fileLink, index)=>{
                                        return(
                                            <div className='individual-chapter-file' key={fileLink+crypto.randomUUID()}>
                                                
                                                <a key={index} className="dataItem" href={`${fileLink}`} target="_blank">
                                                    <p>View File</p>
                                                </a>
                                            </div>
                                        )
                                    })}

                                    {chapter.chapterFileNames.map((fileName, index)=>{
                                        return(
                                            <div className='individual-chapter-file' key={fileName+crypto.randomUUID()}>
                                                <p>{fileName}</p>
                                            </div>
                                        )
                                    })}
                                    
                                </div>
                            </div>
                            <div className='chapter-checkbox'>
                                    <button type='button' onClick={()=>{checkTheBox(chapter.id)}} >Check</button>
                            </div>
                            
                        </div>
                    )
                })
            }
            
        </section>
    );
};
export default CourseTaking;