import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllProducts } from '../../store/product';
import { Link, useHistory } from 'react-router-dom';
import { loadAllProductsImages } from '../../store/productimage';
import "./productspage.css"

function ProductsPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const products = useSelector( state => state.products );
    const productimages = useSelector( state => state.productImages );

    const [loaded, setLoaded] = useState(false);
    // console.dir(products);

    useEffect(()=>{
        async function hydrate() {
            await dispatch(loadAllProducts())
            .then(()=>dispatch(loadAllProductsImages()))
            .then(() => setLoaded(true));
        }
        hydrate();
    }, [dispatch]);



    return (
        loaded &&
        <div>
            <div>
                <div id="products-page-header">
                        <h1 id="products-page-banner-title">All Products</h1>
                </div>
                <div id="products-page-container">
                    <h1 className="products-page-title">All Products</h1>
                    <div className="products-page-item-container">
                    {Object.values(products).map(({id, name, price})=>{return(
                        <div key={id} className="products-page-individual-item-container">
                            {
                                Object.values(productimages[id]).map(({ siteUrl }) => {
                                    return <img 
                                    src={siteUrl} 
                                    className="products-page-thumb-nail"
                                    onClick={
                                        e=>{
                                            e.preventDefault();
                                            history.push(`/products/${id}`)
                                        }
                                    }/>
                                })  

                            }
                            <Link to={`/products/${id}`} className="products-page-individual-item-link">{name}</Link>
                            <div className="products-page-individual-item-price">${parseFloat(price).toFixed(2)}</div>
                        </div>
                    )
                    })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsPage;