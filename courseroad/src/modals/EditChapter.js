import React, { useRef, useState } from "react";
import CloseIcon from "../icons/CloseIcon";
import "../styles/EditChapter.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { db } from '../config/firebase';
import {  doc, updateDoc } from "firebase/firestore";


const EditChapter = ({ chapID, chapTitle, chapDes, open, close, getChaps }) => {
    
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

    const chapterTitleRef = useRef(null);
    const chapterDescriptionRef = useRef(null);
    
    const saveUpdate = async () => {
        const chapterDocRef = doc(db, "CHAPTERS", chapID);
        console.log(chapterDescriptionRef.current.value, chapterTitleRef.current.value);
        if(chapterTitleRef.current.value!=null && chapterDescriptionRef.current.value!=null){
            await updateDoc(chapterDocRef, {
                chapterTitle: chapterTitleRef.current.value || chapTitle,
                chapterDescription: chapterDescriptionRef.current.value || chapDes,

            }).then(()=>{
                chapterDescriptionRef.current.value = '';
                chapterTitleRef.current.value = '';
                alert("Successfully updated chapter")
                getChaps();
                close();
            }).catch((error) => {
                console.error('Error updating chapter', error);
            });
        } 
    };
    

    if (!open) return null;
    return (
        <div onClick={close} className="edit-chap__overlay">
            <div className="edit-chap__modal-container" onClick={(e) => { e.stopPropagation(); }}>
                <CloseIcon className="edit-chap__close-btn" onClick={close}></CloseIcon>
                <div className="chapter-texts">
                    <p>Edit Chapter</p>
                    <input className="chapter-title" type="text" ref={chapterTitleRef} placeholder={chapTitle}></input>
                    <div><ReactQuill modules={module} theme='snow' ref={chapterDescriptionRef} /></div> 
                    <button className="save-edit-btn" type="button" onClick={saveUpdate}>Save Changes</button>
                </div>
            </div>
        </div>
    );
};

export default EditChapter;