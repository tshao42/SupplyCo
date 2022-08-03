import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllProducts } from '../../store/product';




function ProductsPage() {
    const dispatch = useDispatch();
    const products = useSelector( state => state.products );

    const [loaded, setLoaded ] = useState(false);
    console.dir(products);
    useEffect(async ()=>{
        await dispatch(loadAllProducts())
        .then(()=>setLoaded(true));
    }, [dispatch]);


    return (
        setLoaded&&
        <div>
            {Object.values(products).map(({name, price})=>{
                <div>
                    {console.log('hit line 25')}
                    {console.log(name)}
                    <div>{name}</div>
                    <div>${price}</div>
                </div>
            })}
        </div>
    )
}

export default ProductsPage;