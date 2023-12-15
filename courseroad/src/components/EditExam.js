import React, { useState, useEffect, useRef } from 'react';
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { db, storage } from '../config/firebase';
import { collection, addDoc, serverTimestamp, query, getDocs, doc, updateDoc, arrayUnion, where, orderBy, getDoc, setDoc, deleteDoc, arrayRemove, FieldValue } from "firebase/firestore";
import '../styles/CreateExam.css';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import DeleteIcon from "../icons/DeleteIcon";
import UploadIcon from "../icons/UploadIcon";
import { useNavigate, useLocation } from "react-router-dom";
import EditIcon from '../icons/EditIcon';

const EditExam = () => {
    const examID = useLocation().pathname.split('/')[3]
    const loggedInEmail = auth?.currentUser?.email;
    const [examData, setExamData] = useState(null);
    const [courseTitle, setCourseTitle] = useState('');
    const [userEmail, setUserEmail] = useState(loggedInEmail);
    const examInstructionsRef = useRef();
    const passingScoreRef = useRef();
    const [totalPoints, setTotalPoints] = useState(0);
    const [displayQuestionForm, setDisplayQuestionForm] = useState(true);
    const examQuestionRef = useRef();
    const aAnswerRef = useRef();
    const bAnswerRef = useRef();
    const cAnswerRef = useRef();
    const dAnswerRef = useRef();
    const [correctAnswer, setCorrectAnswer] = useState();
    const questionPointsRef = useRef();
    const [fileUpload, setFileUpload] = useState(null);
    const [questionFile, setQuestionFile] = useState(null);
    const [questionID, setQuestionID] = useState(null);
    const [questionsData, setQuestionsData] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        getExam();
        getQuestions();
        const unsubscribe = onAuthStateChanged(auth, (userData)=>{
            if(userData){
                setUserEmail(userData.email);
                console.log("User logged in (CreateExam): ", userData.email);
            }
        });
    
      return () => {
        unsubscribe();
      }
    }, [loggedInEmail]);


    const getExam = async () => {
        try{
            const docRef = doc(db, "EXAMS", examID);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setExamData(docSnap.data())
            } else {
            console.log("No such document!");
            }
        } catch(err){
            console.log(err.message);
        }
        
    };

    const updateQuestionnaire = async (origInstruction, origPassingScore) => {
        console.log(origInstruction, origPassingScore);
        try {
            const docRef = await setDoc(doc(db, "EXAMS", examID), {
                examInstructions: examInstructionsRef.current.value || origInstruction,
                passingScore: passingScoreRef.current.value || origPassingScore,

            }, {merge: true}).then((docRef)=>{
                alert("Successfully Updated Exam");
                getExam();
            }).catch((error)=>{
                console.error('Error Updating Course: ',error);
            });

        } catch (err) {
            console.error(err);
        } 
            
    };
    
    const uploadFile = () => {
        if(fileUpload == null) return;

        const fileRef = ref(storage, `${examID}/${fileUpload.name + crypto.randomUUID()}`);
        uploadBytes(fileRef, fileUpload).then(()=>{
            alert("File Uploaded");
            getDownloadURL(fileRef).then((url)=>{
                setQuestionFile(url);
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
    const addQuestion = async (e) => {
        e.preventDefault();
            const chapterDocRef = await addDoc(collection(db, "QUESTIONS"), {
                examID: examID,
                question: examQuestionRef.current.value,
                points: questionPointsRef.current.value,
                dateCreated: serverTimestamp(),
                correctAnswer: correctAnswer,
                aAnswerChoice: aAnswerRef.current.value,
                bAnswerChoice: bAnswerRef.current.value,
                cAnswerChoice: cAnswerRef.current.value,
                dAnswerChoice: dAnswerRef.current.value,
                questionFile: questionFile
    
            }).then(async (chapterDocRef)=>{
                
                setQuestionID(chapterDocRef.id);
                const courseDocRef = doc(db, "EXAMS", examID)
                
                    await updateDoc(courseDocRef, {
                        questionnaire: arrayUnion({
                            questionID: chapterDocRef.id, 
                        }),
                        totalPoints: totalPoints+parseInt(questionPointsRef.current.value)
                    }).then((courseDocRef)=>{
                        setQuestionFile(null);
                        examQuestionRef.current.value = '';
                        aAnswerRef.current.value = '';
                        bAnswerRef.current.value = '';
                        cAnswerRef.current.value = '';
                        dAnswerRef.current.value = '';

                        
                        setFileUpload(null);
                        getQuestions();
                        setTotalPoints(totalPoints+parseInt(questionPointsRef.current.value));
                        console.log(questionsData);
                        console.log("Successfully updated exam with new question");
                    }).catch((error) => {
                        console.error('Error updating exam with new question', error);
                    });
                
                console.log("Successfully added question");
            }).catch((error) => {
                console.error('Error adding question: ', error);
            });
    };

    const getQuestions = async () => {
        const q = query(collection(db, "QUESTIONS"), where("examID", "==", examID), orderBy("dateCreated", "asc"));
        const querySnapshot = await getDocs(q);
        setQuestionsData(querySnapshot.docs.map((doc)=> ({...doc.data(), id:doc.id})));
    };

    const deleteQuestion = () =>{

    };

    const saveExam = () => {
        navigate('/dashboard/teacherHome');
    };
    const deleteExam = async () => {
        if(examID == null) return;
        console.log(examID);
        await deleteDoc(doc(db, "EXAMS", examID));
        // alert("Successfully Deleted Course");
        navigate("/dashboard/teacherHome");
    };
    

    const editQuestion = () => {
        
    }

    

    return(
        <section className='createExam'>
            <p className='createExam__page-title'>Edit Exam</p>

            <div className='createExam__container'>
                <form className='exam-head form-flex'>
                        <div className='createExam__text-inputs'>
                            <p className='createExam__head-title'>{examData?.courseTitle}</p>
                            <textarea className='exam-head__textbox' rows={15} ref={examInstructionsRef} placeholder={examData?.examInstructions}></textarea>
                        </div>
                        <div className='createExam__side'>
                            <label>Passing Score(%):<input className='drop-down' type='number' min={0} max={100} ref={passingScoreRef} placeholder={examData?.passingScore} required></input></label>
                            <button className='createExam__btn' type='button' onClick={()=>{updateQuestionnaire(examData?.examInstructions,examData?.passingScore)}}>Update Instruction and Score</button>
                        </div>
                </form>

                <article className='added-questions '>
                    {
                        questionsData === null ? null : questionsData.map((question)=>{
                            return(
                                <div className='added-question__question form-flex' key={question.id}>
                                    <div className='question-texts'>
                                        <p className='question'>{question.question}</p>
                                        <p className='question-choice'>a. {question.aAnswerChoice}</p>
                                        <p className='question-choice'>b. {question.bAnswerChoice}</p>
                                        <p className='question-choice'>c. {question.cAnswerChoice}</p>
                                        <p className='question-choice'>d. {question.dAnswerChoice}</p>
                                    </div>
                                    <div className='question-details-buttons'>
                                        <div className='question-img-container'>
                                            <img className='question-img' src={question.questionFile} />
                                        </div>
                                        <div className='added-question-side'>
                                            <div className='question-details-text'>
                                                <p className='question-text'>Points: {question.points}</p>
                                                <p className='question-text'>Correct Answer: {question.correctAnswer}</p>
                                            </div>
                                            
                                            <div className='question-icons'>
                                                <span className='delete-btn' onClick={()=>{deleteQuestion(question.id)}}><DeleteIcon stroke='#8C8C8C' /></span>
                                                <span onClick={()=>{editQuestion(question.id)}}><EditIcon/></span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            )
                        })
                    }
                </article>

                {
                    displayQuestionForm && <form className='add-new-question form-flex' onSubmit={addQuestion}>
                        
                            <div className='create-question-text-inputs' >
                                <input className='font-size' type='text' ref={examQuestionRef} placeholder='Question...' required></input>
                                <label>a. <input type='text' ref={aAnswerRef} placeholder='Answer Option...' required></input></label>
                                <label>b. <input type='text' ref={bAnswerRef} placeholder='Answer Option...' required></input></label>
                                <label>c. <input type='text' ref={cAnswerRef} placeholder='Answer Option...' required></input></label>
                                <label>d. <input type='text' ref={dAnswerRef} placeholder='Answer Option...' required></input></label>

                            </div>
                            <div className='createExam__files-buttons'>
                                <div className='createExam__files-btns'>
                                    {
                                        questionFile === null ? null : <img className='question-img' src={questionFile} alt='question visual aid'/>
                                    }
                                    <input id='upload-file' type='file' accept='image/png, image/jpeg' onChange={(event)=> {setFileUpload(event.target.files[0])}}></input>
                                    <button className='upload-btn' type='button' onClick={uploadFile}><UploadIcon /> Upload File</button>
                                </div>
                                <div className='createExam__side'>
                                    <div className='flex-column'>
                                        <label className='creatExam__label'>Select correct answer:
                                            <select className='drop-down' onChange={(event)=>{setCorrectAnswer(event.target.value)}} required>
                                                <option value="">Choose one</option>
                                                <option value="a">a</option>
                                                <option value="b">b</option>
                                                <option value="c">c</option>
                                                <option value="d">d</option>
                                            </select>
                                        </label>
                                        <label className='createExam__label'>Points: 
                                            <input className='drop-down' ref={questionPointsRef} type='number' min={0} required />
                                        </label>
                                    </div>
                                    <button className='createExam__btn' type='submit'>Add Question</button>
                                </div>
                                
                            </div>
                        
                    
                </form>
                }
                
            </div>

            {
                examID === null ? null : <div className='centered-btn'>
            <button className='save-exam-btn' type='button' onClick={saveExam}>Save Exam</button>
            <button className='save-exam-btn delete' type='button' onClick={deleteExam}>Delete Exam</button>
            </div>
            }

        </section>
    );
};
export default EditExam;