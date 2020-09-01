import React from 'react';

const ReviewItems = (props) => {
    const {name,quantity,key,price} = props.product;
    const reviewItemsStyle ={
        border:'1px solid lightgray',
        marginLeft:'180px',
        marginBottom:'7px',
        paddingBottom:'7px'

    }
    return (
        <div style={reviewItemsStyle}>
            <h2 className="product-name">{name}</h2>
            <p>Quantity: {quantity}</p>
            <h3><small>Price: ${price}</small></h3>
            <br/>
            <button 
            onClick = {() => props.removeProducts(key)}
            className="main-button">
            Remove</button>
        </div>
    );
};

export default ReviewItems;