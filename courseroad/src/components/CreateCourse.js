import React, { useRef, useState, useEffect } from 'react';
import '../styles/CreateCourse.css'
import {db, storage} from '../config/firebase';
import { collection, addDoc, serverTimestamp, query, getDocs, doc, updateDoc, arrayUnion, where, orderBy, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UploadIcon from "../icons/UploadIcon";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import DeleteConfirmation from '../modals/DeleteConfirmation';
import deletePic from '../images/DeleteConfirmation.png'


const CreateCourse = () =>{
    const loggedInEmail = auth?.currentUser?.email;
    const courseTitleRef = useRef();
    const courseDescriptionRef = useRef();
    const chapterTitleRef = useRef();
    const chapterDescriptionRef = useRef();
    const [displayChapterForm, setDisplayChapterForm] = useState(false);
    const [courseID, setCourseID] = useState();
    const [chapterID, setChapterID] = useState();
    const [imageUpload, setImageUpload] = useState(null);
    const [courseThumbnail, setCourseThumbnail] = useState(null);
    const [fileUpload, setFileUpload] = useState(null);
    const [chapterFile, setChapterFile] = useState([]);
    const [chapterFileNames, setChapterFileNames] = useState([]);
    const [chaptersData, setChaptersData] = useState([]);
    const [userEmail, setUserEmail] = useState(loggedInEmail);
    const [deleteTrigger, setDeleteTrigger] = useState(false);
    const [displayCreateExam, setDisplayCreateExam] = useState(false);

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
                setDisplayCreateExam(true);
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
                        if (chapterDescriptionRef.current) {
                            const quill = chapterDescriptionRef.current.getEditor();
                            quill.setText(""); // Clear the content
                        }
                        setFileUpload(null);
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
        if(courseID){
            navigate(`/dashboard/createExam/${courseID}`);
        }

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
                setFileUpload(null);
                // To clear the input field because it does not clear unless useRef hook is used instead of useState
                document.getElementById("upload-file").value = "";
                console.log("The chapter file URL: ",url);
            }).catch((error) => {
                console.error('Error getting chapter file URL: ', error);
            });
            
        }).catch((error) => {
            console.error('Error uploading chapter: ', error);
        });
    };

    const deleteChapter = async (chapID) => {
        try {
            const courseRef = doc(db, "COURSESCREATED", courseID);
            const courseDoc = await getDoc(courseRef);
            const courseData = courseDoc.data();
            if (courseData && Array.isArray(courseData.chapters)) {
              const indexToDelete = courseData.chapters.findIndex(chapter => chapter.chapterID === chapID);
              if (indexToDelete !== -1) {
                courseData.chapters.splice(indexToDelete, 1);
                await setDoc(courseRef, { chapters: courseData.chapters }, { merge: true });
                const chapDocRef = doc(db, "CHAPTERS", chapID);
                await deleteDoc(chapDocRef);
                alert("Successfully Removed Chapter");
                getChapters();
              } else {
                console.log("Error: Chapter with chapID not found in the chapters array.");
              }
            } else {
              console.log("Error: Course data or chapters array is missing or not an array.");
            }
          } catch (err) {
            console.error(err);
          }
    };

    const deleteTheCourse = async () => {
        if(courseID == null) return;
        const q = query(collection(db, "CHAPTERS"), where("courseID", "==", courseID));
        const querySnapshot = await getDocs(q);
        const deleteChapterPromises = [];
        querySnapshot.forEach((document) => {
            const docRef = doc(collection(db, "CHAPTERS"), document.id);
            const deletePromise = deleteDoc(docRef);
            deleteChapterPromises.push(deletePromise);
        });
        await Promise.all(deleteChapterPromises);
        await deleteDoc(doc(db, "COURSESCREATED", courseID));
        // alert("Successfully Deleted Course");
        navigate("/dashboard/teacherHome");
    };
    
    return(
        <section className='createCourse'>
            <p className='createCourse__page-title'>Create Course</p>

            <div className='edit-course-container'>
                <article className='course-head article-flex'>
                        <div className='createCourse__text-inputs'>
                            <input className='course-head__textbox' type='text' ref={courseTitleRef} placeholder='Course Title' required></input>
                            <p className='warning'>Course Title cannot be changed later.</p>
                            <textarea className='course-head__textbox' rows={15} ref={courseDescriptionRef} placeholder='Course Description...'></textarea>
                        </div>
                        <div className='createCourse__files-buttons'>
                            {
                                courseThumbnail === null ? <img className='createCourse__thumbnail' src='https://firebasestorage.googleapis.com/v0/b/courseroad-sofdev3.appspot.com/o/defaultPictures%2Fdefault_course_thumbnail.jpg?alt=media&token=aa594b50-d6dd-40d0-9a7e-1bff91159431' alt='default thumbnail' /> : <img className='createCourse__thumbnail' src={courseThumbnail} alt='Course Thumbnail' />
                            }
                            <p className='warning'>Upload new image to change default picture</p>
                            <input type='file' onChange={(event)=> {setImageUpload(event.target.files[0])}} ></input>
                            <button className='createCourse__upload-btn btn' onClick={uploadImage}><UploadIcon /> Upload Image</button>
                            
                            <div className='createCourse__header-lower-btns'>
                                {displayCreateExam &&  <button className='createCourse__createExam-btn btn' type='button' onClick={createExam}>Course Exam</button>}
                                <button className='createCourse__create-course-btn btn' type='button' onClick={createCourse}>Create Course</button>
                            </div>
                            
                        </div>
                </article>

                <article className='added-chapter'>
                    {
                        chaptersData === null ? null : chaptersData.map((chapter)=>{
                            return(
                                <div className='added-chapter__chapter' key={chapter.id}>
                                    <div className='chapter-texts'>
                                        <p className='chapter-title'>{chapter.chapterTitle}</p>
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
                                            <span onClick={()=>{deleteChapter(chapter.id)}}><DeleteIcon /></span>
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
                                    <input id='upload-file' type='file' onChange={(event)=> {setFileUpload(event.target.files[0])}}></input>
                                    <button className='createCourse__upload-btn' onClick={uploadFile}><UploadIcon /> Upload File</button>
                                </div>
                                <button className='createCourse__create-course-btn' type='submit' onClick={()=>addChapter(courseID)}>Add Chapter</button>
                            </div>
                        
                    
                </article>
                }
                
            </div>

            {
                courseID == null ? null : <div className='centered-btn'>
                <button className='save-course-btn' type='button' onClick={saveCourse}>Save Course</button>
                <button className='save-course-btn delete' type='button' onClick={()=>setDeleteTrigger(!deleteTrigger)}>Delete Course</button>
                <DeleteConfirmation trigger={deleteTrigger}>
                    <img src={deletePic} />
                    <button type='button' onClick={deleteTheCourse} style={{
                        border: '1px solid blue',
                        borderRadius: '10px',
                        color: 'blue',
                        fontFamily: 'Inter',
                        cursor: 'pointer'
                    }}>Delete</button>
                    <button type='button' onClick={()=>setDeleteTrigger(false)} style={{
                        border: 'none',
                        color: 'grey',
                        fontFamily: 'Inter',
                        cursor: 'pointer'
                    }}>Cancel</button>
                </DeleteConfirmation>
            </div>
            }

        </section>
    );
};

export default CreateCourse;