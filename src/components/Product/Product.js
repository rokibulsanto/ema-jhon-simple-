import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    //console.log(props.product);
    const {name,img,seller,price,stock,key} = props.product;
    
    return (
        <div className="product">
            <div>
                <img src={img} alt=""/>
            </div>
            <div>
               <h3 className="product-name"><Link to={"/product/"+key}>{name}</Link></h3>
               <p><small> by:{seller} </small></p>
               <br/>
                <p>price:${price}</p>
                <br/>
               <p>only {stock} left in stock - Order soon</p>
               <br/>
               {props.showAddtoCart && <button className="main-button" 
               onClick={ () =>props.handleAddproduct(props.product)}> 
               <FontAwesomeIcon icon={faShoppingCart} />Add to cart
               </button>}


            </div>
            
            
        </div>
    );
};

export default Product;