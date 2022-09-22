import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addSingleProduct, deleteSingleProduct, loadAllProducts } from '../../store/product';
import { addSingleProductImage } from '../../store/productimage';



function ProductManagement () {

    const dispatch = useDispatch();
    const sessionUserIsOwner = useSelector(state => state.session.user)?.ownerStatus;
    const products = useSelector( state => state.products );
    const [loaded, setLoaded] = useState(false);
    const [newItemForm, setNewItemForm] = useState(false);

    let errors = {}; //set empty object for error handling markers


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

    const handleCreateNewProduct = (e) =>{
        e.preventDefault();
        
        //error handling
        //productName: must be longer than 10 characters, shorter than 120 characters
        if (newProductName.length < 10) {
            errors["name"] = "Product Name Must Be Longer Than 10 Characters";
        } else{
            if (newProductName.length > 120) {
                errors["name"] = "Product Name Must Be Shorter Than 120 Characters";
            } else{
                delete errors.name;
            }
        }

        //productPrice:
        if (newProductPrice <= 0) {
            errors["price"] = "Product Price Must Be Positive"
        } else{
            delete errors.price;
        }

        //productInfo:
        //cannot be <10char or >1500char
        if (newProductInfo.length < 10){
            errors["info"] = "Product Information Must Be Longer Than 10 Characters"
        } else {
            if (newProductInfo.length > 1500){
                errors["info"] = "Product Information Must Be Shorter Than 1500 Characters"
            } else {
                delete errors.info;
            }
        }

        //siteUrl
        if (newProductImageUrl.length === 0) {
            errors["url"] = "Image  URL cannot be empty"
        } else {
           if (!isImage(newProductImageUrl)){
            errors["url"] = "The URL must end in .jpg, .jpeg, .png, .webp, .avif, .gif, .svg"
           } else {
            delete errors.url;
           }

        }

        console.table(errors);
        if (errors["name"] === undefined && errors["price"] === undefined && errors["info"] === undefined) {
            const payload = {
                name: newProductName,
                price: newProductPrice,
                info: newProductInfo,
            }
            
            dispatch(addSingleProduct(payload));
            const newProductId = Math.max.apply(null,Object.keys(Object.keys(products)));
            dispatch(addSingleProductImage(newProductId, newProductImageUrl));
        }
    }


    function isImage(url) {
        return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
      }
      

    return (
        loaded &&
        <div>
            { sessionUserIsOwner?
            <div>
                 {Object.values(products).map(({id, name})=>{return(
                        <div key={id} >
                            <Link to={`/products/${id}`} >No.{id}: {name}</Link>
                            <span onClick={
                                e=>{
                                    e.preventDefault();
                                    dispatch(deleteSingleProduct(parseInt(id)));
                                }
                            }>Delete</span>
                        </div>
                    )
                  })}
                  {!newItemForm &&
                  <div onClick={e=>{
                    e.preventDefault();
                    setNewItemForm(true);
                  }}> 
                    Add New Product 
                  </div>
                  }
                  {newItemForm &&
                  <div>
                    <form>
                        <label>
                            Name
                            <input 
                            onChange={e=>setNewProductName(e.target.value)}
                            type="text" />
                        </label>
                        <label>
                            Price
                            <input 
                            onChange={e=>setNewProductPrice(e.target.value)}
                            type="number" 
                            step="any"/>
                        </label>
                        <label>
                            Description
                            <input 
                            onChange={e=>setNewProductInfo(e.target.value)}
                            type="text" />
                        </label>
                        <label>
                            Image URL
                            <input
                            onChange={e=>setNewProductImageUrl(e.target.value)}
                            type="text" />
                        </label>
                        <button
                         onClick={e=>handleCreateNewProduct(e)}>
                            Add to Product Listing        
                        </button>
                        <span onClick={e=>{
                            e.preventDefault();
                            setNewItemForm(false);
                        }}>Cancel</span>
                    </form>
                  </div>}
            </div>
            :
            <div>
                Not Authorized
            </div>
            }
        </div>
    )
}


export default ProductManagement;