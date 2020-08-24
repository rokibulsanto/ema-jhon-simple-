import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';

const Product = (props) => {
    const {name,img,seller,price,stock} = props.product;
    
    return (
        <div className="product">
            <div>
                <img src={img} alt=""/>
            </div>
            <div>
               <h3 className="product-name">{name}</h3>
               <p><small> by:{seller} </small></p>
               <br/>
                <p>price:${price}</p>
                <br/>
               <p>only {stock} left in stock - Order soon</p>
               <br/>
               <button className="main-button" onClick={ () =>props.handleAddproduct(props.product)}> <FontAwesomeIcon icon={faShoppingCart} />Add to cart</button>


            </div>
            
            
        </div>
    );
};

export default Product;