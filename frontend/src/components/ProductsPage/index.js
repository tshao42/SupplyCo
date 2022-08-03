import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllProducts } from '../../store/product';




function ProductsPage() {
    const dispatch = useDispatch();
    const products = useSelector( state => state.products );

    const [loaded, setLoaded ] = useState(false);
    // console.dir(products);
    useEffect(()=>{
        dispatch(loadAllProducts());
    }, [dispatch]);

    return (
        loaded&&
        <div>
            {console.log('hit line 23')}
            {Object.values(products).map(({name, price})=>{
                <div>
                    {/* {console.log('iterated through line 26')} */}
                    <p>Name:{name}</p>
                    <p>${price}</p>
                </div>
            })}
        </div>
    )
}

export default ProductsPage;