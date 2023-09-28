import React, { useRef } from 'react';
import '../styles/CreateCourse.css'

const CreateCourse = () =>{
    const courseTitleRef = useRef();
    const courseDescriptionRef = useRef();
    const topicTitleRef = useRef();
    const topicDescriptionRef = useRef();

    const saveCourse = async (e) => {
        
        let courseTitleNoSpace = courseTitleRef.current.value.split(' ').join('');
        let courseTitledoc = courseTitleNoSpace.toLowerCase();
        console.log(courseTitledoc);
        console.log(courseDescriptionRef.current.value, topicDescriptionRef.current.value, topicTitleRef.current.value);

        courseTitleRef.current.value = '';
        courseDescriptionRef.current.value = '';

        try {
           /*  await setDoc(doc(db, "USERS", "account_1@gmail.com", "COURSES", title), {
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
        <article className='createCourse'>
            <h1>Create Course</h1>

            <div className='edit-course-container'>
                <section className='course-head section-grid'>
                    <div>
                        <input type='text' ref={courseTitleRef} placeholder='Course Title'></input>
                        <textarea rows={15} ref={courseDescriptionRef} placeholder='Course Description...'></textarea>
                    </div>
                    <div>
                        <div>Upload File here</div>
                        <button type='button'>Create Exam</button>
                    </div>
                </section>

                <section className='added-topic section-grid'>

                </section>

                <section className='add-new-topic section-grid'>
                    <div>
                        <input type='text' ref={topicTitleRef} placeholder='Topic Title'></input>
                        <textarea rows={15} ref={topicDescriptionRef} placeholder='Topic Description...'></textarea>
                    </div>
                    <div>
                        <div>Upload File here</div>
                        <button type='button'>Add Topic</button>
                    </div>
                </section>
                
            </div>

            <div className='centered-btn'>
            <button className='save-course-btn' type='button' onClick={saveCourse}>Save Course</button>
            </div>
        </article>
    );
};

export default CreateCourse;