import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';
import { addSingleProduct, deleteSingleProduct, loadAllProducts } from '../../store/product';
import { addSingleProductImage } from '../../store/productimage';
import "./ProductManagement.css";



function ProductManagement () {

    const dispatch = useDispatch();
    const sessionUserIsOwner = useSelector(state => state.session.user)?.ownerStatus;
    const products = useSelector( state => state.products );
    const [loaded, setLoaded] = useState(false);
    const [newItemForm, setNewItemForm] = useState(false);
    const [latestProductId, setLatestProductId] = useState();

    let [allErrors, setAllErrors] = useState([]); //set empty object for error handling markers


    //for the new products
    const [newProductName, setNewProductName] = useState("");
    const [newProductPrice, setNewProductPrice] = useState(0);
    const [newProductInfo, setNewProductInfo] = useState("");
    const [newProductImageUrl, setNewProductImageUrl] = useState("");

    useEffect(()=>{
        async function hydrate() {
            await dispatch(loadAllProducts())
            .then(() => setLoaded(true));
        }
        hydrate();
    }, [dispatch]);

    useEffect(()=>{
        setLatestProductId(Object.keys(products)[Object.keys(products).length-1])
    }, [products])


    const handleCreateNewProduct = (e) =>{
        e.preventDefault();
        let errors = [];        
        //error handling
        //productName: must be longer than 10 characters, shorter than 120 characters
        if (newProductName.length < 10) {
            errors.push("Product Name Must Be Longer Than 10 Characters");
        } else{
            if (newProductName.length > 120) {
                errors.push("Product Name Must Be Shorter Than 120 Characters");
            }
        }

        //productPrice:
        if (newProductPrice <= 0) {
            errors.push("Product Price Must Be Positive");
        }

        //productInfo:
        //cannot be <10char or >1500char
        if (newProductInfo.length < 10){
            errors.push ("Product Information Must Be Longer Than 10 Characters");
        } else {
            if (newProductInfo.length > 1500){
                errors.push("Product Information Must Be Shorter Than 1500 Characters");
            }
        }

        //siteUrl
        if (newProductImageUrl.length === 0) {
            errors.push("Image  URL cannot be empty");
        } else {
           if (!isImage(newProductImageUrl)){
            errors.push("The URL must end in .jpg, .jpeg, .png, .webp, .avif, .gif, .svg");
           }

        }

        setAllErrors(errors);
        // console.table(errors);
        // console.log(errors["name"])
        if (errors.length===0) {
            const payload = {
                name: newProductName,
                price: newProductPrice,
                info: newProductInfo,
            }
            
            const updateProductList = async ()=>{
                await dispatch(addSingleProduct(payload))
                .then(()=>console.table(Object.keys(products)))
            }
            console.log();
            updateProductList();
            // console.table(Object.keys(products))
            dispatch(addSingleProductImage(parseInt(latestProductId)+1, newProductImageUrl));
            
            setNewItemForm(false);

        }
    }


    function isImage(url) {
        return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
      }
      

    return (
        loaded &&
        <div id="product-management-page-container">
        {/* {console.log(latestProductId)} */}
        {/* {console.table(Object.keys(products))} */}
            { sessionUserIsOwner?
            <div>
                <h1 id="product-management-page-title">Product Management</h1>
                 {Object.values(products).map(({id, name})=>{return(
                        <div key={id} className="product-management-item-lines">
                            <Link className="product-management-item-listings" to={`/products/${id}`} >No.{id}: {name}</Link>
                            <div className="product-management-item-deletion" onClick={
                                async e=>{
                                    e.preventDefault();
                                    console.log(JSON.stringify({productId: id}));
                                    await csrfFetch(`/api/productimages/${id}`, {
                                        method: 'DELETE',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({productId: id})
                                    })
                                    .then(()=>dispatch(deleteSingleProduct(parseInt(id))));
                                }
                            }>Delete#{id}</div>
                        </div>
                    )
                  })}
                  {!newItemForm &&
                  <div 
                  id="product-management-add-new-product"
                  onClick={e=>{
                    e.preventDefault();
                    setNewItemForm(true);
                  }}> 
                    + Add New Product 
                  </div>
                  }
                  {newItemForm &&
                  <div>
                    <form className="product-management-form">
                        <ul id="errors-message-product-management">
                        {allErrors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                        <label className="product-management-form-labels">
                            Name                            
                            <br />
                            <input 
                            id="product-management-form-name"
                            onChange={e=>setNewProductName(e.target.value)}
                            type="text" />
                        </label>
                        <label className="product-management-form-labels">
                            Price: 
                            <br />
                            <input 
                            id="product-management-form-price"
                            onChange={e=>setNewProductPrice(e.target.value)}
                            type="number" 
                            step="any"/>
                        </label>
                        <label className="product-management-form-labels">
                            Description:
                            <br />
                            <textarea 
                            id="product-management-form-description"
                            onChange={e=>setNewProductInfo(e.target.value)}
                            type="text" />
                        </label>
                        <label className="product-management-form-labels">
                            Image URL: 
                            <br />
                            <input
                            id="product-management-imageurl"
                            onChange={e=>setNewProductImageUrl(e.target.value)}
                            type="text" />
                        </label>
                        <button
                        id="product-management-form-submission-add"
                         onClick={e=>handleCreateNewProduct(e)}>
                            Add to Product Listing        
                        </button>
                        <div 
                        id="product-management-form-cancel" onClick={e=>{
                            e.preventDefault();
                            setNewItemForm(false);
                        }}>Cancel</div>
                    </form>
                  </div>}
            </div>
            :
            <Redirect to="/" />
            }
        </div>
    )
}


export default ProductManagement;