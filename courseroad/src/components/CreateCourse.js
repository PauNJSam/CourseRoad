import React, { useRef } from 'react';
import '../styles/CreateCourse.css'
import {db} from '../config/firebase';

const CreateCourse = () =>{
    const courseTitleRef = useRef();
    const courseDescriptionRef = useRef();
    const chapterTitleRef = useRef();
    const chapterDescriptionRef = useRef();

    const saveCourse = async (e) => {
        
        let courseTitleNoSpace = courseTitleRef.current.value.split(' ').join('');
        let courseTitledoc = courseTitleNoSpace.toLowerCase();
        console.log(courseTitledoc);
        console.log(courseDescriptionRef.current.value, chapterDescriptionRef.current.value, chapterTitleRef.current.value);

        courseTitleRef.current.value = '';
        courseDescriptionRef.current.value = '';

        try {
            /* await setDoc(doc(db, "COURSESCREATED", courseTitledoc, "COURSES", title), {
                // ...doc.data,
                [qNumber]: newQuestion,
                [aNumber]: newAnswer,

            }, {merge: true});

            setNextNumber(nextNumber+1);
            setNewAnswer("");
            setNewQuestion(""); */
        } catch (err) {
            /* console.error(err); */
        } 
    };
    
    return(
        <section className='createCourse'>
            <h1>Create Course</h1>

            <div className='edit-course-container'>
                <article className='course-head article-flex article-grid'>
                    <div className='createCourse__text-inputs'>
                        <input className='course-head__textbox' type='text' ref={courseTitleRef} placeholder='Course Title' required></input>
                        <textarea className='course-head__textbox' rows={15} ref={courseDescriptionRef} placeholder='Course Description...' required></textarea>
                    </div>
                    <div className='createCourse__files-buttons'>
                        <div>Upload File here</div>
                        <button type='button'>Create Exam</button>
                    </div>
                </article>

                <article className='added-chapter article-flex'>
                    {/* map through the added topics here */}
                </article>

                <article className='add-new-chapter article-flex'>
                    <div className='createCourse__text-inputs' >
                        <input type='text' ref={chapterTitleRef} placeholder='Chapter Title' required></input>
                        <textarea rows={15} ref={chapterDescriptionRef} placeholder='Chapter Description...' required></textarea>
                    </div>
                    <div className='createCourse__files-buttons'>
                        <div>Upload File here</div>
                        <button type='button'>Add Chapter</button>
                    </div>
                </article>
                
            </div>

            <div className='centered-btn'>
            <button className='save-course-btn' type='button' onClick={saveCourse}>Save Course</button>
            </div>

        </section>
    );
};

export default CreateCourse;