import React from 'react'

export default function ProductListItem(props){
    const thisItemInCart = props.cart.filter(item => item.id === props.product.id)[0]
    return <div className='product-list-item'>
        <h3>{ props.product.name }</h3>
        <img
            height={100}
            title={props.product.name}
            src={"https://raw.githubusercontent.com/zandoan/turing-fullstack/master/Images/product_images/" + props.product.image}
            alt="product"
        />
        <div>{props.product.description}</div>
        <div>${props.product.price}</div>
        <div>
            <button onClick={() => props.addToCart(props.products)}>
                Add To Cart ({
                    (thisItemInCart && thisItemInCart.quality) || 0
                })
            </button>
        </div>
    </div>
}