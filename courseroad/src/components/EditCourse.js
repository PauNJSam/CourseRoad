import React, { useRef, useState, useEffect } from 'react';
import '../styles/EditCourse.css'
import {db, storage} from '../config/firebase';
import { collection, addDoc, serverTimestamp, query, getDocs, doc, updateDoc, arrayUnion, where, orderBy, getDoc, setDoc } from "firebase/firestore";
import { useNavigate, useLocation } from "react-router-dom";
// import { async } from '@firebase/util';
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UploadIcon from "../icons/UploadIcon";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

// courseID is needed inig click sa course from the teacherDashboard

const EditCourse = () =>{
    const courseDocID = useLocation().pathname.split('/')[3]
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
    const [courseData, setCourseData] = useState(null);
    const [showTextEditor, setShowTextEditor] = useState(false);

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
      
    }, [loggedInEmail])
    

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
    

    const saveCourse = async () => {
        navigate("/dashboard");
    };

    const saveCourseChanges = async (description, thumbnail) => {
        try {
            const docRef = await setDoc(doc(db, "COURSESCREATED", courseDocID), {
                courseDescription: description,
                courseThumbnail: thumbnail,

            }, {merge: true}).then((docRef)=>{
                alert("Successfully Updated Course");
            }).catch((error)=>{
                console.error('Error Updating Course: ',error);
            });

        } catch (err) {
            console.error(err);
        } 
            
    }


    const createExam = () => {

    }

    const uploadImage = (oldThumbnail) =>{
        if(imageUpload == null) return;

        try{
            const imageRef = ref(storage, `courseThumbnails/${imageUpload.name + crypto.randomUUID()}`);

            uploadBytes(imageRef, imageUpload).then(()=>{
                alert("New Course Thumbnail Uploaded");
                getDownloadURL(imageRef).then((url)=>{
                    setCourseThumbnail(url);
                    console.log("The picture URL: ",url);
                }).catch((error) => {
                    console.error('Error getting image URL: ', error);
                });
                
            }).catch((error) => {
                console.error('Error uploading image: ', error);
            });
        } catch(err){
            console.error('Error Uploading Image', err)
        }

        /* const thumbnailRef = ref(storage, `courseThumbnails/${oldThumbnail}`);

        deleteObject(thumbnailRef).then(() => {
            console.log("Old Thumbnail Deleted successfully");

            const imageRef = ref(storage, `courseThumbnails/${imageUpload.name + crypto.randomUUID()}`);

            uploadBytes(imageRef, imageUpload).then(()=>{
                alert("New Course Thumbnail Uploaded");
                getDownloadURL(imageRef).then((url)=>{
                    setCourseThumbnail(url);
                    console.log("The picture URL: ",url);
                }).catch((error) => {
                    console.error('Error getting image URL: ', error);
                });
                
            }).catch((error) => {
                console.error('Error uploading image: ', error);
            });

        }).catch((error) => {
            console.log("Error Deleting Thumbnail",error.message);
        }); */

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

    const editChapterDescription = () => {
        setShowTextEditor(true);
    }
    const closeTextEditor = () => {
        setShowTextEditor(false);
    }

    const deleteChapterFile = async (i, id) => {

        const targetChapter = chaptersData.find((chapter) => chapter.id === id);

        if (targetChapter) {
            const { chapterFiles, chapterFileNames } = targetChapter;
            
            const theFiles = chapterFiles;
            theFiles.splice(i, 1);
            const theFileNames = chapterFileNames;
            theFileNames.splice(i, 1);

            console.log(theFiles);
            console.log(theFileNames);

            try{
                const chapterDocRef = doc(db, 'CHAPTERS', id);
                await updateDoc(chapterDocRef, {
                chapterFiles: theFiles,
                chapterFileNames: theFileNames,
                }).then(()=>{
                    alert("Successfully updated chapter files");
                });
            } catch(err){
                console.log("Could not Update doc: ", err);
            }
        } else {
            // Chapter not found
            return [null, null];
        }

        /* const arrOfFilesAndFileNames = chaptersData.map((chapData)=>{
            if(chapData.id == id){
                return(
                    <div>{chapData.chapterFiles}</div>>
                );
            }
        })
        
        const updatedFileNames = [...chapter.chapterFileNames];
        updatedFileNames.splice(index, 1);

        const updatedFiles = [...chapter.chapterFiles];
        updatedFiles.splice(index, 1); */
    }

    
    return(
        <section className='editCourse'>
            <p className='editCourse__page-title'>Edit Course</p>

            <div className='edit-course-container'>
                
                {
                    courseData === null ? null : (
                        <article className='course-head article-flex'>
                            <div className='createCourse__text-inputs'>
                                <p className='course-head__textbox'>{courseData.courseTitle}</p>
                                <textarea className='course-head__textbox' rows={15} ref={courseDescriptionRef} placeholder={courseData.courseDescription}></textarea>
                            </div>
                            <div className='createCourse__files-buttons'>
                                
                                <img className='createCourse__thumbnail' src={courseThumbnail || courseData.courseThumbnail} alt='Course Thumbnail' />
                                
                                <input type='file' onChange={(event)=> {setImageUpload(event.target.files[0])}} ></input>
                                <button className='createCourse__upload-btn btn' onClick={()=>{uploadImage(courseData.courseThumbnail)}}><UploadIcon /> Upload Image</button>
                                
                                <div className='createCourse__header-lower-btns'>
                                    <button className='createCourse__createExam-btn btn' type='button' onClick={createExam}>Create Exam</button>
                                    <button className='createCourse__create-course-btn btn' type='button' onClick={()=>{saveCourseChanges(courseDescriptionRef.current.value, courseThumbnail)}}>Save Changes</button>
                                </div>
                                
                            </div>
                        </article>
                    )
                }
                
                <article className='added-chapter'>
                    {
                        chaptersData === null ? null : chaptersData.map((chapter)=>{
                            return(
                                <div className='added-chapter__chapter' key={chapter.id}>
                                    <div className='chapter-texts'>
                                        <input type='text' ref={chapterTitleRef} placeholder={chapter.chapterTitle}></input>
                                        {
                                            showTextEditor ? <ReactQuill modules={module} theme='snow' ref={chapterDescriptionRef}/> : <p dangerouslySetInnerHTML={{__html: chapter.chapterDescription}} />
                                        }
                                        {
                                            showTextEditor ? <button type='button' onClick={closeTextEditor}>Cancel</button> : <button type='button' onClick={editChapterDescription}>Edit Description</button>
                                        }
                                    </div>
                                    <div className='chapter-files'>
                                        <div className='chapter-files__files'>
                                            <p className='chapter-files__label'>Files Uploaded:</p>
                                            {chapter.chapterFileNames.map((fileName, index)=>{
                                                return(
                                                    <div className='individual-chapter-file' key={fileName+crypto.randomUUID()}>
                                                        <p>{fileName}</p>
                                                        <span onClick={()=>deleteChapterFile(index, chapter.id)}><DeleteIcon /></span>
                                                    </div>
                                                )
                                            })}
                                            {/* {chapter.chapterFiles.map((fileURL)=>{
                                                return(
                                                    <div className='individual-chapter-file' key={fileURL+crypto.randomUUID()}>
                                                        
                                                        <span onClick={()=>deleteChapterFile(fileURL)}><DeleteIcon /></span>
                                                    </div>
                                                )
                                            })} */}
                                        </div>
                                        <div className='chapter-files__icons'>
                                            <DeleteIcon />
                                        </div>
                                    </div>
                                    
                                </div>
                            )
                        })
                    }
                </article>
                
                <article className='add-new-chapter article-flex'>
                    
                        <div className='createCourse__text-inputs' >
                            <input type='text' ref={chapterTitleRef} placeholder='Chapter Title' required></input>
                            <ReactQuill modules={module} theme='snow' ref={chapterDescriptionRef}/>
                        </div>
                        <div className='createCourse__files-buttons'>
                            <div className='createCourse__files-btns'>
                                <input type='file' onChange={(event)=> {setFileUpload(event.target.files[0])}}></input>
                                <button className='createCourse__upload-btn' onClick={uploadFile}><UploadIcon /> Upload File</button>
                            </div>
                            <button className='createCourse__create-course-btn' type='submit' onClick={()=>addChapter(courseID)}>Add Chapter</button>
                        </div>
                
                </article>
                
                
                
            </div>

            <div className='centered-btn'>
            <button className='save-course-btn' type='button' onClick={saveCourse}>Save Course</button>
            </div>

        </section>
    );
};

export default EditCourse;