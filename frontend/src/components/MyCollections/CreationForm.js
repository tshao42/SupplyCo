import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewCollection } from '../../store/collection';
import "./myCollections.css"


function CreationForm({setShowModal}){


    const [collectionName, setCollectionName] = useState("");
    const dispatch = useDispatch();

    const [allErrors, setAllErrors] = useState([]);

    const currentUserId = useSelector(state=>state.session.user?.id)
    const handleSubmit = async e => {
        e.preventDefault();
        let errors = [];

        const payload = {
            collectionName: collectionName,
            userId: currentUserId
        }

        if (!collectionName) errors.push ("Please Name Your Collection!");
        if (collectionName.length > 30) errors.push ("Please Name It Under 30 Characters!") 
        setAllErrors(errors);

        if (errors.length===0){
            await dispatch(createNewCollection(payload))
            .then(()=>setShowModal(false));
        }

        
    }


    return(
        <form id="submit-new-collection-form-container" onSubmit = {handleSubmit}>
            <label id="new-collection-title">
                Create New Collection
                <br />
                <input 
                    id="new-collection-form"
                    type="text"
                    value = {collectionName}
                    onChange = {e=>setCollectionName(e.target.value)}
                />
            </label>
            <br />
            <button id="new-collection-submit" type = "submit">Confirm</button>
            <span onClick={
                e=>{
                    e.preventDefault();
                    setShowModal(false);
                }
            } id="new-collection-cancel">Cancel</span>
            <ul id="new-collection-form-errors">
                {allErrors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
        </form>
    )
}

export default CreationForm;