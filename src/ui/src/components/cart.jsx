// import React, {Component} from 'react';
import React from 'react';
import ShirtService from "../ShirtService";

export default function Cart({match}){

    console.log(ShirtService.getItemForCart(match.params.id))

    return <div>
        <h2>CART</h2>
        <h6>{match.params.id}</h6>
        <div>
        {/* {shirt.map((item, key) => (
            <div class="col-sm" key={item.product_id}>
                
                <img
                    src={
                    "https://raw.githubusercontent.com/zandoan/turing-fullstack/master/Images/product_images/" +
                    item.image
                    }
                    alt=""
                    width="100"
                    height="100"
                />
                <h6>{item.name}</h6>
                <p>{item.price}</p>
                <code>{item.description}</code>
                
            </div>
            ))} */}
        </div>
    </div>
}