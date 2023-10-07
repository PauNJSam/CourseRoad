import React, { useRef, useState } from 'react';
import '../styles/CreateCourse.css'
import {db} from '../config/firebase';
import { collection, addDoc, serverTimestamp, setDoc } from "firebase/firestore";

const CreateCourse = () =>{
    const courseTitleRef = useRef();
    const courseDescriptionRef = useRef();
    const chapterTitleRef = useRef();
    const chapterDescriptionRef = useRef();
    const [displayChapterForm, setDisplayChapterForm] = useState(false);
    const courseIDRef = useRef();
    const chapterIDRef = useRef();
    /* const [courseID, setCourseID] = useState();
    const [chapterID, setChapterID] = useState(); */
    let theCourseID;
    let theChapterID;

    const saveCourse = async () => {

        /* This button will use setDoc to update the fields that require their own
        firebase generated IDs and also to route back to the dashboard */
        
        /* let courseTitleNoSpace = courseTitleRef.current.value.split(' ').join('');
        let courseTitledoc = courseTitleNoSpace.toLowerCase(); */
        let courseDocUID = crypto.randomUUID();

        console.log(courseDescriptionRef.current.value, chapterDescriptionRef.current.value, chapterTitleRef.current.value);

        courseTitleRef.current.value = '';
        courseDescriptionRef.current.value = '';

        /* try {
            await setDoc(doc(db, "COURSESCREATED", courseDocUID), {
                // ...doc.data,
                [qNumber]: newQuestion,
                [aNumber]: newAnswer,

            }, {merge: true});

            setNextNumber(nextNumber+1);
            setNewAnswer("");
            setNewQuestion("");
        } catch (err) {
            console.error(err); 
        }  */
    };
    const createCourse = async (e) => {
        e.preventDefault();
// Add a new document with a generated id.
        // theCourseID = crypto.randomUUID();
        // console.log()
        // setCourseID(crypto.randomUUID())
        // console.log("Inside createCourse courseID: ",courseIDRef.current.value);
        // try{
            const docRef = await addDoc(collection(db, "COURSESCREATED"), {
                courseTitle: courseTitleRef.current.value,
                courseDescription: courseDescriptionRef.current.value,
                courseTeacher: "",
                courseID: "",
                dateCreated: serverTimestamp(),
                courseImage: "",
                numberOfStudents: 0
    
            }).then((docRef)=>{
                theCourseID=docRef.id;
                console.log("Inside the then funct courseID: ", theCourseID);
                setDisplayChapterForm(true);
            }).catch((error) => {
                console.error('Error adding course: ', error);
            });
            /* console.log("Document Course written with ID: ", docRef.id);
            const courseDocID = docRef.id;
            console.log("const var doc ID: ",courseDocID);
            theCourseID = docRef.id; */
            // setCourseID(courseDocID);
            // courseIDRef.current.value = docRef.documentID;
            // console.log("Course IDREF: ",courseIDRef.current.value);
        //     setDisplayChapterForm(true);
        // } catch (err) {
        //     console.error(err);
        // }
        // console.log("Course ID useState",courseID);
        // console.log(theCourseID);
    }

    const addChapter = async (id) => {
        // e.preventDefault();
        // console.log("Insifde",theCourseID);
        console.log("Inside addChapter courseID: ",id);
            /* const chapterDocRef = await addDoc(collection(db, "COURSESCREATED", theCourseID, "CHAPTERS"), {
                chapterTitle: chapterTitleRef.current.value,
                chapterDescription: chapterDescriptionRef.current.value,
                chapterID: "",
                dateCreated: serverTimestamp(),
                chapterFiles: ""
    
            }).then((chapterDocRef)=>{
                theChapterID=chapterDocRef.id;
                console.log("Inside the then funct courseID: ", theChapterID);
            }).catch((error) => {
                console.error('Error adding chapter: ', error);
            }); */
            
    } 

    const createExam = () => {

        /* let courseTitleNoSpace = courseTitleRef.current.value.split(' ').join('');
        let courseTitledoc = courseTitleNoSpace.toLowerCase() + crypto.randomUUID();
        console.log(courseTitledoc); */
    }
    
    return(
        <section className='createCourse'>
            <h1>Create Course</h1>

            <div className='edit-course-container'>
                <article className='course-head'>
                    <form onSubmit={createCourse} className='article-flex'>
                        <div className='createCourse__text-inputs'>
                            <input className='course-head__textbox' type='text' ref={courseTitleRef} placeholder='Course Title' required></input>
                            <textarea className='course-head__textbox' rows={15} ref={courseDescriptionRef} placeholder='Course Description...'></textarea>
                        </div>
                        <div className='createCourse__files-buttons'>
                            <div>Upload File here</div>
                            <button type='submit'>Create Course</button>
                            <button type='button' onClick={createExam}>Create Exam</button>
                        </div>
                    </form>
                </article>

                <article className='added-chapter article-flex'>
                    {/* map through the added topics here */}
                </article>

                {
                    displayChapterForm && <article className='add-new-chapter article-flex'>
                        
                            <div className='createCourse__text-inputs' >
                                <input type='text' ref={chapterTitleRef} placeholder='Chapter Title' required></input>
                                <textarea rows={15} ref={chapterDescriptionRef} placeholder='Chapter Description...'></textarea>
                            </div>
                            <div className='createCourse__files-buttons'>
                                <div>Upload File here</div>
                                <button type='submit' onClick={()=>addChapter(theCourseID)}>Add Chapter</button>
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