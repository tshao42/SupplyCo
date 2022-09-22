import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addItemToCollection, loadAllCollections } from '../../store/collection';
import AddToNewCollection from './AddToNewCollection';


function AddProductToCollection({setShowAddToCollectionStatus, setShowAddToCollectionButton}){

    const dispatch = useDispatch();

    const {productId} = useParams();

    const [loaded, setLoaded] = useState(false);
    const collections = useSelector (state => state?.collections);
    const currentUserId = useSelector (state => state.session.user?.id);

    const [collectionId, setCollectionId] = useState(0);
    const [errors, setErrors] = useState([])

    const product= useSelector(state=>state.products[parseInt(productId)])


    const [ addToNewCollectionButton, setAddToNewCollectionButton] = useState(false);
    const [ addToNewCollectionPrompt, setAddToNewCollectionPrompt] = useState(true);
    const [ addToExistingCollectionPrompt, setAddToExistingCollectionPrompt] = useState(true);

    const [ addToExistingCollectionOptions, setAddToExistingCollectionOptions] = useState(false);
    
    useEffect(()=>{
        async function hydrate(){
            await dispatch(loadAllCollections(currentUserId))
            .then(()=>setLoaded(true));
        }

        hydrate();
    }, [dispatch])


    const handleSubmit = async e => {
        e.preventDefault();
        //actions pertaining to submission of collection
        console.table(collectionId, parseInt(productId));

        if (collectionId===0){
            setErrors(["Please select a collection"])
        }else{
            setErrors([]);
        }
        // console.table((collectionId));
        // console.table(product);      
        if(collectionId!==0){ 
            dispatch(addItemToCollection(collectionId, product));
            setShowAddToCollectionButton(true);
            setShowAddToCollectionStatus(false);
            // setErrors([]);
        }
    }

    const expandAddToNewCollection = async e => {
        e.preventDefault();
        setAddToNewCollectionButton(true);
        setAddToNewCollectionPrompt(false);
        setAddToExistingCollectionPrompt(false);
    }
    
    return (
        loaded &&
        <>
        {/* {console.log(errors)} */}
        {errors.length!==0 &&
        <div>
            {errors}
        </div>
        }
            <div id="collection-option-item-container">
                {addToExistingCollectionPrompt &&  Object.values(collections).length!==0 && 
                //the button for add to existing collections
                //rendered when there are already collections for the current user
                <div
                onClick={e=>{
                    e.preventDefault();
                    setAddToExistingCollectionOptions(true);
                    setAddToExistingCollectionPrompt(false);
                    setAddToNewCollectionPrompt(false);
                }}
                id="add-to-existing-collection">
                    <i className="fa-solid fa-folder"></i> {`   Add To Existing Collection`}
                </div>
                }     
                { addToNewCollectionPrompt &&
                <div id="add-to-new-collection" 
                onClick={expandAddToNewCollection}>
                    <i className="fa-solid fa-folder-plus"></i>{`   Add To New Collection`}
                </div>
                }  
            {addToExistingCollectionOptions &&
            <form>
                <select name="collections"
                id="select-collection-dropdown"
                onChange={
                    e=>{
                        setCollectionId(e.target.value)
                        // console.log(collectionId);
                    }
                }>
                    <option
                    value={0}>
                        Please Select A Collection
                    </option>
                    {Object.values(collections).map(({id, collectionName})=>{
                        // {console.log(collections[id])}
                        // this is for collections that it has been in
                        if (collections[id].Collectionitems[productId]){
                        return(
                            <option 
                                value={id}
                                disabled
                                key={id}
                            >
                                {collectionName} (Added)
                            </option>
                        )
                        //otherwise there would be options that are not disabled
                        } else{
                            return(
                                <option 
                                    value={id}
                                    key={id}
                                >
                                    {collectionName}
                                </option>
                            ) 
                        }
                        
                    })}
                
                </select>
                <span onClick={handleSubmit} id="add-to-existing-col-prompt">{`Add`}</span>
                <span
                id="cancel-from-existing-col-prompt"
                onClick={
                    e=>{
                        e.preventDefault();
                        setAddToExistingCollectionOptions(false);
                        setAddToExistingCollectionPrompt(true);
                        setAddToNewCollectionPrompt(true);
                        setErrors([]);
                    }
                }>{`Cancel`}</span>
            </form>
            }
            </div>
            <div>
                {/* { addToNewCollectionPrompt &&
                    <button id="add-to-new-collection" onClick={expandAddToNewCollection}><i class="fa-solid fa-folder-plus"></i>{`   Add To New Collection`}</button>
                } */}
                {
                    addToNewCollectionButton && 
                    <AddToNewCollection setAddToNewCollectionButton={setAddToNewCollectionButton} setAddToNewCollectionPrompt={setAddToNewCollectionPrompt} setAddToExistingCollectionPrompt={setAddToExistingCollectionPrompt}/>
                }
                <div 
                id="quit-selection-prompt"
                onClick={(e)=>{
                    e.preventDefault();
                    setShowAddToCollectionStatus(false);
                    setShowAddToCollectionButton(true);
                }}>Cancel</div>
            </div>
        </>
    )
}

export default AddProductToCollection;