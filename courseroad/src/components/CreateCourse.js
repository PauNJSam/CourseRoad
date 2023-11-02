import React, { useRef, useState, useEffect } from 'react';
import '../styles/CreateCourse.css'
import {db, storage} from '../config/firebase';
import { collection, addDoc, serverTimestamp, query, getDocs, doc, updateDoc, arrayUnion, where, orderBy } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
// import { async } from '@firebase/util';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UploadIcon from "../icons/UploadIcon";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";


const CreateCourse = () =>{
    const loggedInEmail = auth?.currentUser?.email;
    const courseTitleRef = useRef();
    const courseDescriptionRef = useRef();
    const chapterTitleRef = useRef();
    const chapterDescriptionRef = useRef();
    const [displayChapterForm, setDisplayChapterForm] = useState(false);
    /* const courseIDRef = useRef();
    const chapterIDRef = useRef(); */
    const [courseID, setCourseID] = useState();
    const [chapterID, setChapterID] = useState();
    /* let theCourseID;
    let theChapterID; */
    const [imageUpload, setImageUpload] = useState(null);
    const [courseThumbnail, setCourseThumbnail] = useState(null);
    const [fileUpload, setFileUpload] = useState(null);
    const [chapterFile, setChapterFile] = useState([]);
    const [chapterFileNames, setChapterFileNames] = useState([]);
    const [chaptersData, setChaptersData] = useState([]);
    const [userEmail, setUserEmail] = useState(loggedInEmail);

    const navigate = useNavigate();
    
    var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'],
      
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
      
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
      
        ['clean']                                         // remove formatting button
      ];

    const module = {
        toolbar: toolbarOptions,
    };

    /* useEffect(() => {
      console.log(getChapters());
      console.log(chapterID);
      return () => {
        
      }
    }, [chapterID]); */

    /* const getChapters = async (id) => {
       const q = query(collection(db, "CHAPTERS"));
       const querySnapshot = await getDocs(q)
       const chapterArr = querySnapshot.docs.map(async (doc)=> {
        const data = doc.data();
        return data;
       })
       const chapterData = await Promise.all(chapterArr);
       return chapterData;
            
    }; */

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (userData)=>{
            if(userData){
                setUserEmail(userData.email);
                console.log("User logged in (CreateCourse): ", userData.email);
            }
        });
    
      return () => {
        unsubscribe();
      }
    }, [loggedInEmail])
    

    const getChapters = async () => {
        const q = query(collection(db, "CHAPTERS"), where("courseID", "==", courseID), orderBy("dateCreated", "asc"));

        const querySnapshot = await getDocs(q);
        /* const chaptersArray = querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
            chapterTitle: doc.data().chapterTitle;
            chapterDescription: doc.data().chapterDescription;
            chapterFiles: doc.data().chapterFiles;
        }); */

        setChaptersData(querySnapshot.docs.map((doc)=> ({...doc.data(), id:doc.id})));
    };
    

    const saveCourse = async () => {

        navigate("/dashboard/teacherHome");   
    };
    const createCourse = async (e) => {
        e.preventDefault();
// Add a new document with a generated id.
            const docRef = await addDoc(collection(db, "COURSESCREATED"), {
                courseTitle: courseTitleRef.current.value,
                courseDescription: courseDescriptionRef.current.value,
                courseTeacher: userEmail,
                courseID: "",
                dateCreated: serverTimestamp(),
                numberOfStudents: 0,
                courseThumbnail: courseThumbnail || 'https://firebasestorage.googleapis.com/v0/b/courseroad-sofdev3.appspot.com/o/defaultPictures%2Fdefault_course_thumbnail.jpg?alt=media&token=aa594b50-d6dd-40d0-9a7e-1bff91159431'
    
            }).then((docRef)=>{
                setCourseID(docRef.id);
                setDisplayChapterForm(true);
            }).catch((error) => {
                console.error('Error adding course: ', error);
            });
            
    }

    const addChapter = async (id) => {
        
        console.log("Inside addChapter courseID: ",courseID);
            const chapterDocRef = await addDoc(collection(db, "CHAPTERS"), {
                chapterTitle: chapterTitleRef.current.value,
                chapterDescription: chapterDescriptionRef.current.value,
                chapterID: "",
                dateCreated: serverTimestamp(),
                courseID: courseID,
                chapterFiles: chapterFile,
                chapterFileNames: chapterFileNames
    
            }).then(async (chapterDocRef)=>{
                
                setChapterID(chapterDocRef.id);
                // TO DO: using course ID 
                const courseDocRef = doc(db, "COURSESCREATED", courseID)
                
                    await updateDoc(courseDocRef, {
                        chapters: arrayUnion({
                            chapterID: chapterDocRef.id, 
                            chapterTitle:  chapterTitleRef.current.value,
                            chapterDescription:  chapterDescriptionRef.current.value
                        })
                    }).then((courseDocRef)=>{
                        setChapterFile([]);
                        setChapterFileNames([]);
                        chapterDescriptionRef.current.value = '';
                        chapterTitleRef.current.value = '';
                        getChapters();
                        console.log("Successfully updated course with new chapter");
                    }).catch((error) => {
                        console.error('Error updating course with new chapter', error);
                    });
                
                console.log("Successfully added chapter");
            }).catch((error) => {
                console.error('Error adding chapter: ', error);
                console.log("Error");
            });
            
    } 
    
    
    

    const createExam = () => {

        /* let courseTitleNoSpace = courseTitleRef.current.value.split(' ').join('');
        let courseTitledoc = courseTitleNoSpace.toLowerCase() + crypto.randomUUID();
        console.log(courseTitledoc); */
    }

    const uploadImage = () =>{
        if(imageUpload == null) return;

        const imageRef = ref(storage, `courseThumbnails/${imageUpload.name + crypto.randomUUID()}`);
        uploadBytes(imageRef, imageUpload).then(()=>{
            alert("Image Uploaded");
            getDownloadURL(imageRef).then((url)=>{
                setCourseThumbnail(url);
                console.log("The picture URL: ",url);
            }).catch((error) => {
                console.error('Error getting image URL: ', error);
            });
            
        }).catch((error) => {
            console.error('Error uploading image: ', error);
        });
    };

    const uploadFile = () => {
        if(fileUpload == null) return;

        const fileRef = ref(storage, `${courseID}/${fileUpload.name + crypto.randomUUID()}`);
        uploadBytes(fileRef, fileUpload).then(()=>{
            alert("File Uploaded");
            getDownloadURL(fileRef).then((url)=>{
                setChapterFile((prev)=>[...prev, url]);
                setChapterFileNames((prev)=>[...prev, fileUpload.name]);
                console.log("The chapter file URL: ",url);
            }).catch((error) => {
                console.error('Error getting chapter file URL: ', error);
            });
            
        }).catch((error) => {
            console.error('Error uploading chapter: ', error);
        });
    };
    
    return(
        <section className='createCourse'>
            <p className='createCourse__page-title'>Create Course</p>

            <div className='edit-course-container'>
                <article className='course-head article-flex'>
                        <div className='createCourse__text-inputs'>
                            <input className='course-head__textbox' type='text' ref={courseTitleRef} placeholder='Course Title' required></input>
                            <textarea className='course-head__textbox' rows={15} ref={courseDescriptionRef} placeholder='Course Description...'></textarea>
                        </div>
                        <div className='createCourse__files-buttons'>
                            {
                                courseThumbnail === null ? <img className='createCourse__thumbnail' src='https://firebasestorage.googleapis.com/v0/b/courseroad-sofdev3.appspot.com/o/defaultPictures%2Fdefault_course_thumbnail.jpg?alt=media&token=aa594b50-d6dd-40d0-9a7e-1bff91159431' alt='default thumbnail' /> : <img className='createCourse__thumbnail' src={courseThumbnail} alt='Course Thumbnail' />
                            }
                            <p style={{color: 'white'}}>Upload new image to change default picture</p>
                            <input type='file' onChange={(event)=> {setImageUpload(event.target.files[0])}} ></input>
                            <button className='createCourse__upload-btn btn' onClick={uploadImage}><UploadIcon /> Upload Image</button>
                            
                            <div className='createCourse__header-lower-btns'>
                                <button className='createCourse__createExam-btn btn' type='button' onClick={createExam}>Create Exam</button>
                                <button className='createCourse__create-course-btn btn' type='button' onClick={createCourse}>Create Course</button>
                            </div>
                            
                        </div>
                </article>

                <article className='added-chapter'>
                    {/* {chapterTitleRef.current=== undefined ? null : <div>
                        <p>{chapterTitleRef.current.value}</p>
                        <p>{chapterDescriptionRef.current.value}</p>
                    </div>} */}
                    {
                        chaptersData === null ? null : chaptersData.map((chapter)=>{
                            return(
                                <div className='added-chapter__chapter' key={chapter.id}>
                                    <div className='chapter-texts'>
                                        <p className='chapter-title'>{chapter.chapterTitle}</p>
                                        {/* <p className='chapter-description'>{chapter.chapterDescription}</p> */}
                                        {/* {chapter.chapterDescription} */}
                                        <p dangerouslySetInnerHTML={{__html: chapter.chapterDescription}} />
                                    </div>
                                    <div className='chapter-files'>
                                        <div className='chapter-files__files'>
                                            <p className='chapter-files__label'>Files Uploaded:</p>
                                            {chapter.chapterFileNames.map((fileName)=>{
                                                return(
                                                    <div className='individual-chapter-file' key={fileName+crypto.randomUUID()}>
                                                        <p>{fileName}</p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <div className='chapter-files__icons'>
                                            <EditIcon />
                                            <DeleteIcon />
                                        </div>
                                    </div>
                                    
                                </div>
                            )
                        })
                    }
                </article>

                {
                    displayChapterForm && <article className='add-new-chapter article-flex'>
                        
                            <div className='createCourse__text-inputs' >
                                <input type='text' ref={chapterTitleRef} placeholder='Chapter Title' required></input>
                                <ReactQuill modules={module} theme='snow' ref={chapterDescriptionRef}/>
                                {/* <textarea rows={15} ref={chapterDescriptionRef} placeholder='Chapter Description...'></textarea> */}
                            </div>
                            <div className='createCourse__files-buttons'>
                                <div className='createCourse__files-btns'>
                                    <input type='file' onChange={(event)=> {setFileUpload(event.target.files[0])}}></input>
                                    <button className='createCourse__upload-btn' onClick={uploadFile}><UploadIcon /> Upload File</button>
                                </div>
                                <button className='createCourse__create-course-btn' type='submit' onClick={()=>addChapter(courseID)}>Add Chapter</button>
                            </div>
                        
                    
                </article>
                }
                
            </div>

            <div className='centered-btn'>
            <button className='save-course-btn' type='button' onClick={saveCourse}>Save Course</button>
            </div>

        </section>
    );
};

export default CreateCourse;