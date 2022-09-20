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
        let errors = [];
        console.table(collectionId, parseInt(productId));

        if (collectionId===0) errors.push("Please select a collection");
        console.table((collectionId));
        console.table(product);        
        dispatch(addItemToCollection(collectionId, product));
        setShowAddToCollectionButton(true);
        setShowAddToCollectionStatus(false);
    }

    const expandAddToNewCollection = async e => {
        e.preventDefault();
        setAddToNewCollectionButton(true);
        setAddToNewCollectionPrompt(false);
    }
    
    return (
        loaded &&
        <>
        {/* {console.log('hitting AddProductToCollection Line7')} */}
            {Object.values(collections).length!==0 && 
            <div>
                {addToExistingCollectionPrompt &&
                <button
                onClick={e=>{
                    e.preventDefault();
                    setAddToExistingCollectionOptions(true);
                    setAddToExistingCollectionPrompt(false);
                }}
                id="add-to-existing-collection">
                    <i class="fa-solid fa-folder"></i> {`   Add To Existing Collection`}
                </button>
                }       
            {addToExistingCollectionOptions &&
            <form>
                <select name="collections"
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
                        //this is for collections that it has been in
                        if (collections[id].Collectionitems[productId]){
                        return(
                            <option 
                                value={id}
                                disabled
                                key={id}
                            >
                                {id} {collectionName} (Added)
                            </option>
                        )
                        //otherwise there would be options that are not disabled
                        } else{
                            return(
                                <option 
                                    value={id}
                                    key={id}
                                >
                                    {id} {collectionName}
                                </option>
                            ) 
                        }
                        
                    })}
                
                </select>
                <button onClick={handleSubmit}>Add</button>
            </form>
            }
            </div>
            }
            <div>
                { addToNewCollectionPrompt &&
                    <button id="add-to-new-collection" onClick={expandAddToNewCollection}><i class="fa-solid fa-folder-plus"></i>{`   Add To New Collection`}</button>
                }
                {
                    addToNewCollectionButton && 
                    <AddToNewCollection setAddToNewCollectionButton={setAddToNewCollectionButton} setAddToNewCollectionPrompt={setAddToNewCollectionPrompt}/>
                }
                <br />
                <button onClick={(e)=>{
                    e.preventDefault();
                    setShowAddToCollectionButton(false)
                }}>Cancel</button>
            </div>
        </>
    )
}

export default AddProductToCollection;