import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import ReviewItems from '../ReviewItems/ReviewItems';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';


const Review = () => {
    const [cart,setcart] = useState([])
    const [orderPlaced,setOrderPlaced] = useState(false);
    const history = useHistory();

    const handleProceedCheckout = () => {
       history.push('/shipment');
    }

    const removeProducts = (productKey) => {
        console.log('remove items clicked',productKey);
        const newCart = cart.filter(pd => pd.key !== productKey);
        setcart(newCart);
        removeFromDatabaseCart(productKey)
    }

    useEffect(() => {

        const savedCart = getDatabaseCart()
        const productkeys = Object.keys(savedCart);
        const cartProducts = productkeys.map(key => {

                const product = fakeData.find(pd => pd.key === key);
                product.quantity = savedCart[key];
                return product;

        })
       setcart(cartProducts);

    },[]);

    let thankYou;
    if(orderPlaced){
        thankYou = <img src={happyImage} alt=""/>
    }
    

    return (
       <div className="twin-container">
            <div className="product-container">
            <h2>This is review component</h2>
            <h2>Cart item: {cart.length}</h2>
            {
                cart.map(pd => <ReviewItems 
                    removeProducts = {removeProducts}
                    key={pd.key}
                    product ={pd}></ReviewItems>)
            }
            {thankYou}
        </div>

        <div className="cart-container">
            <Cart cart ={cart}>
                <button onClick={handleProceedCheckout} className="main-button">Proceed Checkout</button>
            </Cart>

        </div>
           
      </div>
    );
};

export default Review;