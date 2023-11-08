import React, { useState, useEffect } from 'react';
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { db } from '../config/firebase';
import { collection, query, getDocs, where, orderBy } from "firebase/firestore";
import '../styles/StudentHome.css';
import CloseIcon from "../icons/CloseIcon";
import BellIcon from "../icons/BellIcon";
import { useNavigate } from "react-router-dom";


function StudentHome() {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [data, setData]= useState(null);
  const loggedInEmail = auth?.currentUser?.email;
  const [email, setEmail] = useState(loggedInEmail);

  const navigate = useNavigate();
  
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
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
            }
        });
        
        return () => {
            unsubscribe();
        }
    }, [loggedInEmail]);

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="BellIcon">
          {filteredData.length === 0 ? (
            <BellIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a className="dataItem" href={value.link} target="_blank">
                <p>{value.title} </p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default StudentHome;