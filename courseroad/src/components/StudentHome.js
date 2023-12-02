import React, { useState, useEffect } from 'react';
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { db } from '../config/firebase';
import { collection, query, getDocs, where, orderBy, getDoc, doc } from "firebase/firestore";
import '../styles/StudentHome.css';
import CloseIcon from "../icons/CloseIcon";
import SearchIcon from "../icons/SearchIcon";
import { useNavigate } from "react-router-dom";

const StudentHome = () => {
    const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [data, setData]= useState(null);
  const loggedInEmail = auth?.currentUser?.email;
  const [email, setEmail] = useState(loggedInEmail);
  const [coursesData, setCoursesData] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [enrolledCoursesData, setEnrolledCoursesData] = useState([]);
  // const [enrolledCoursesData, setEnrolledCoursesData] = useState(null);


  const navigate = useNavigate();

  const handleFilter = (event) => {
    console.log(filteredData);
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.courseTitle.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  const getCourse = async () => {
    try{
     
        const q = query(collection(db, "COURSESCREATED"));

        const querySnapshot = await getDocs(q);

        setData(querySnapshot.docs.map((doc)=> ({...doc.data(), id:doc.id})));
    } catch(err){
        console.log(err.message);
    }
    };

    useEffect(() => {
        console.log("User logged in: ", loggedInEmail);
        const unsubscribe = onAuthStateChanged(auth, (userData)=>{
            if(userData){
                setEmail(userData.email);
                getCourse();
                getUserCourses();
            }
        });
        
        return () => {
            unsubscribe();
        }
    }, [loggedInEmail]);

    const toCourseOverview = (theCourseID) => {
      // navigate(`/dashboard/courseOverview/${theCourseID}`);
      window.open(`${window.location.origin}/${'dashboard/courseOverview/'}${theCourseID}`);
    };

    /* const getUserCourses = async () => {
      try{
        const docRef = doc(db, "USERS", email || loggedInEmail);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
        console.log("Document data:", docSnap.data().enrolledCourses);
        setEnrolledCourses(docSnap.data().enrolledCourses);
        getEnrolledCourses(docSnap.data().enrolledCourses);
        
        } else {
        console.log("No such document!");
        }
    } catch(err){
        console.log(err.message);
    }  
    };
    const getEnrolledCourses = async (enrolledCourses) => {
      console.log(enrolledCourses);
      enrolledCourses.forEach(async enrolledCourse => {
        try{
       
          const q = doc(db, "COURSESCREATED", enrolledCourse.courseID);
          const docSnap = await getDoc(q);
  
          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setEnrolledCoursesData((prev)=>[...prev, docSnap.data()]);
            console.log(enrolledCoursesData);
            } else {
            console.log("No such document!");
            }
      } catch(err){
          console.log(err.message);
      }
      });
    }; */

    const getUserCourses = async () => {
      
      try{
        const docRef = collection(db, "USERS", email || loggedInEmail, "ENROLLEDCOURSES");
        const docSnap = await getDocs(docRef);

        // if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        setEnrolledCourses(docSnap.docs.map((doc)=> ({...doc.data(), id:doc.id})));
        getEnrolledCourses(docSnap.docs.map((doc)=> ({...doc.data(), id:doc.id})));
        
        // } else {
        // console.log("No such document!");
        // }
    } catch(err){
        console.log(err.message);
    }  
    };
    const getEnrolledCourses = async (enrolledCourses) => {
      enrolledCourses.forEach(async enrolledCourse => {
        console.log(enrolledCourse.id);
      try{
        const q = doc(db, "COURSESCREATED", enrolledCourse.id);

        const docSnap = await getDoc(q);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
        setEnrolledCoursesData((prev)=>[...prev, docSnap.data()]);
      } else {
          console.log("No such document!");
          }

        // setEnrolledCoursesData(querySnapshot.docs.map((doc)=> ({...doc.data(), id:doc.id})));
        // console.log(enrolledCoursesData);
    } catch(err){
        console.log(err.message);
    }
  });
    };


    const takeCourse = (coursetheID) => {
      navigate(`/dashboard/courseTaking/${coursetheID}`);
    }

    return(
        <section className='student-home'>
            <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder='Course Title...'
          value={wordEntered}
          onChange={handleFilter} />
        <div className="BellIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a key={key} className="dataItem" href={`/dashboard/courseOverview/${value.id}`} target="_blank">
                <p>{value.courseTitle} </p>
              </a>
            );
          })}
        </div>   
      )} 
        </div>

        <section className='enrolled-courses'>
          {
            enrolledCoursesData == null ? null : enrolledCoursesData.map((course)=>{
              console.log(course.id);
              return(
                <div key={crypto.randomUUID()}>
              <p onClick={()=>{takeCourse(course.courseID)}}>{course.courseTitle}</p>
            </div>
              );
            })

          }
        </section>
        
        <div className='student-home__header'>
        <p className='student-home__title'>Courses To Explore</p>
      </div><div className='student-home__card-list'>
        {data === null ? null : data.map((course) => {
          return (
            <article className='course-card' key={course.id} onClick={()=>{toCourseOverview(course.id)}}>
              <div className='course-pic'>
                <img className='course-thumbnail' src={course.courseThumbnail} alt='courseThumbnail' />

              </div>
              <div className='course-card__details'>
                <div>
                  <p className='course-title'>{course.courseTitle}</p>
                </div>
              </div>

            </article>
          );
        })}
      </div>
        </section>
    );
};
export default StudentHome;