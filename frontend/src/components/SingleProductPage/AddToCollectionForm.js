import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewCollection } from '../../store/collection';



function AddToCollectionForm({setShowAddModal}){

    const [collectionName, setCollectionName] = useState("");
    const dispatch = useDispatch();

    const currentUserId = useSelector(state=>state.session.user?.id)
    const handleSubmit = async e => {
        e.preventDefault();
        const payload = {
            collectionName: collectionName,
            userId: currentUserId
        }

        let errors = [];
        if (!collectionName) errors.push ("Please Name Your Collection!");
        if (collectionName.length > 30) errors.push ("Please Name It Under 30 Characters!") 

        if (!errors.length){
            await dispatch(createNewCollection(payload))
            .then(()=>setShowAddModal(false));
        }

        
    }
    return(
        <form onSubmit = {handleSubmit}>
            <label>
                Add To Collection
                <br />
                <input 
                    type="text"
                    value = {collectionName}
                    onChange = {e=>setCollectionName(e.target.value)}
                />
            </label>
            <button type = "submit">Confirm</button>
        </form>
    )
}

export default AddToCollectionForm;