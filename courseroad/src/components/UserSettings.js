import { useState, useEffect } from "react";
import TeacherApplicationForm from "../modals/TeacherApplicationForm";
import "../styles/UserSettings.css";
import EditIcon from "../icons/EditIcon";
// import backgroundcontainer3 from "../images/backgroundcontainer3.png";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "../config/firebase";
import {db, storage} from '../config/firebase';
import { doc, updateDoc, query, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
// import screenbg from "../images/screen_bg.png";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";



const UserSettings = () => {
    const navigate = useNavigate();
    const logout = async () => {
        try{
            await signOut(auth).then(()=>{
                localStorage.removeItem("authedUser");
                console.log("user has been logged out");
            }).catch((err)=>{
                console.log("Log Out Unsuccessful");
            })
            
            navigate("/");
        } catch(err){
            console.log(err);
        }
    }
    const teacherhome = () => {
        navigate('/dashboard/teacherHome');
    }

    const [openModal, setOpenModal] = useState(false);
    const [showUploadInput, setShowUploadInput] = useState(false);
    const [profilePicUpload, setProfilePicUpload] = useState(null);
    const [profilePicURL, setProfilePicURL] = useState(null);
    const loggedInEmail = auth?.currentUser?.email;
    const [dp, setDp] = useState(null);
    const [email, setEmail] = useState(loggedInEmail);

    useEffect(() => {
        console.log("User logged in: ", loggedInEmail);
        const unsubscribe = onAuthStateChanged(auth, (userData)=>{
            if(userData){
                setEmail(userData.email);
                getUserPic();
            }
        });
        
        return () => {
            unsubscribe();
        }
    }, [loggedInEmail]);

    const getUserPic = async () => {
        try{
            const q = query(doc(db, "USERS", email));

            const docSnap = await getDoc(q);
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setDp(docSnap.data().profilePic);
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
        } catch(err){
            console.log(err.message);
        }
        
    };

    const setProfilePic = () => {
        if (profilePicUpload === null) return;
     
        const imageRef = ref(storage, `profilePictures/${profilePicUpload.name + crypto.randomUUID()}`);
        
        uploadBytes(imageRef, profilePicUpload).then(async () => {
            getDownloadURL(imageRef).then(async (url) => {
                if (loggedInEmail !== undefined) {
                    const userDocRef = doc(db, "USERS", loggedInEmail);
                    
                    await updateDoc(userDocRef, {
                        profilePic: url
                    }).then(() => {
                        setProfilePicURL(url);
                        console.log("Successfully updated profile pic");
                    }).catch((error) => {
                        console.error('Error updating profile pic', error);
                    });
                }
            }).catch((error) => {
                console.error('Error getting image URL: ', error);
            });
    
            alert("Profile Pic Uploaded");
        }).catch((error) => {
            console.error('Error uploading image: ', error);
        });
    };
    

    return(
        <section>
            <div className= "userSettings">
                <div className = "desktop">
                    <div className = "frame">
                        {/* first side */}
                        <div className = "frame1">
                            <div className='userSettings__profile-pic'>
                                <img src={profilePicURL||dp} alt='profile' />
                            </div>
                            <p className ="text-wrapper-Worksans-Nameright">John Doe</p>
                            <p className ="text-wrapper-Inter">Student</p>
                            <div className ="ellipse"></div>
                            <p className = "text-wrapper-editpp">Edit Profile Picture</p>
                            <EditIcon onClick={()=>setShowUploadInput(!showUploadInput)}></EditIcon>
                                {
                                    showUploadInput && <div>
                                        <input type="file" onChange={(event)=> {setProfilePicUpload(event.target.files[0])}}></input>
                                        <button type="button" onClick={setProfilePic}>Set as Profile Picture</button>
                                    </div>
                                }
                        </div>
                        {/* second side */}
                        <div className = "frame2">
                            <p className ="text-wrapper-Worksans">Account Settings</p>
                            <div className ="rect"/>
                            <div className = "username-wrapper">
                                <div className = "text-wrapper-Inter-Username">Username:</div>
                                <div className = "text-wrapper-Worksans-Nameleft">John Doe</div>
                            </div>
                            <div className = "rect"/>
                            <div className ="text-wrapper-JoinNow">
                                <div className = "text-wrapper-Worksans-CreateCourse">Create your own Course!</div>
                                <div className = "text-wrapper-Worksans-CreateCourse">Join Us Now!</div>
                            </div>
                            <div className = "rect"/>
                            <div className ="text-wrapper-JoinNow">
                                <button className="text-wrapper-9" onClick={() => setOpenModal(true)} >Apply to be a Teacher</button>
                                <button className="text-wrapper-9" onClick={teacherhome}>Switch to Teacher Account</button>
                                <button className="text-wrapper-9" onClick={logout}>Logout</button>   
                            </div>   
                        </div>
                    </div>
                </div>
            </div>
            <TeacherApplicationForm dp={dp} email={email} open={openModal} close={() => setOpenModal(false)} />
        </section>
            
    );
};
export default UserSettings;