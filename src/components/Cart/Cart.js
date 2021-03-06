import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'


const Cart = (props) => {
    const cart = props.cart;
    let total =0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity;
        
    }
    let shipping =0;
    if(total>35){
        shipping = 0;
    }
    else if(total>15){
        shipping = 4.99;
    }
    else if (total>0){
        shipping = 12.99;
    }

    const tax = (total/10).toFixed(2);
    const grandTotal =(total + shipping + Number(tax)).toFixed(2);
    const formatNumber = num =>{
        const precision = num.toFixed(2);
        return Number(precision);
    }
    return (
        <div>
            <h3>Order summary</h3>
            <h4>Items orderd:{cart.length}</h4>
            <p>Product price:{formatNumber(total)}</p>
            <p><small>Shipping cost:{shipping}</small></p>
            <p><small>Tax + VAT:{tax}</small></p>
            <p>Total price:{grandTotal}</p>
            {
                props.children
            }
        </div>
    );
};

export default Cart;