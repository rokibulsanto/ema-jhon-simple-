import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Shop = () => {
    
    const first10 = fakeData.slice(0,10); 
    const [products , setproducts] = useState(first10)
    const [cart,setcart] = useState([])

    useEffect(()=> {

        const savedCart = getDatabaseCart();
        const productkeys = Object.keys(savedCart);
        const previousCart = productkeys.map(existingkey => {

            const product = fakeData.find(pd => pd.key === existingkey);
            product.quantity = savedCart[existingkey];
            return product;

        })
        setcart(previousCart);
    },[])
    
    const handleAddproduct = (product) =>{
        const toBeAddedkey = product.key;
        const sameproduct = cart.find(pd => pd.key === toBeAddedkey );
        let count = 1;
        let newcart;
        if(sameproduct){
             count = sameproduct.quantity + 1;
            sameproduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedkey);
            newcart = [...others,sameproduct];

        }
        else{
            product.quantity = 1;
            newcart =[...cart,product];
        }
    
        setcart(newcart);
        addToDatabaseCart(product.key,count)
    }
    return (
        <div className="twin-container">
            <div className="product-container">
              
                 {
                     products.map(pd => <Product 
                        key={pd.key}
                        showAddtoCart ={true}
                        handleAddproduct = {handleAddproduct}
                        product={pd}> 
                        </Product>)
                 }
             
            </div>

            <div className="cart-container">
                <Cart cart={cart}> 

                <Link to="/review">
                <button className="main-button"><FontAwesomeIcon icon={faShoppingCart} />Order review</button>
               </Link>
                
                </Cart>
            </div>
             
        </div>
    );
};

export default Shop;