import React from 'react';
import '../styles/CreateCourse.css'

const CreateCourse = () =>{
    
    return(
        <article className='createCourse'>
            <h1>Create Course</h1>
            <section className='course-head'>
                <input type='text' placeholder='Course Title'></input>
                <textarea rows={6} placeholder='Course Description...'></textarea>
                <button type='button'>Create Exam</button>
            </section>
            <section className='added-topic'>

            </section>
            <section className='add-new-topic'>

            </section>
        </article>
    );
};

export default CreateCourse;