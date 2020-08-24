import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';

const Shop = () => {
    
    const first10 = fakeData.slice(0,10); 
    const [products , setproducts] = useState(first10)

    const [cart,setcart] = useState([])
    
    const handleAddproduct = (product) =>{
        console.log('product addded',product);
        const newcart = [...cart,product]
        setcart(newcart);
    }
    return (
        <div className="shop-container">
            <div className="product-container">
              
                 {
                     products.map(pd => <Product 
                        handleAddproduct = {handleAddproduct}
                        product={pd}> 
                        </Product>)
                 }
             
            </div>

            <div className="cart-container">
                <Cart cart={cart}> </Cart>
            </div>
             
        </div>
    );
};

export default Shop;