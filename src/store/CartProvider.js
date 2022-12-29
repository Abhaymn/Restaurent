import { useReducer } from "react";

import CartContext from "./CartContext";

const defaultCartState={
    item:[],
    totalAmount:0
}

const cartReducer=(state,action)=>{
    if(action.type==='ADD_CART_ITEM'){
        const updateItems=state.item.concat(action.item);
        const updatedAmount=state.totalAmount+action.item.price*action.item.amount;
        return{
            items:updateItems,
            totalAmount:updatedAmount
        };
    }
    return(defaultCartState);
};

const CartProvider=props=>{
    const [cartSate,CartAction]=useReducer(cartReducer,defaultCartState);

    const addItemToCartHandler=item=>{
        CartAction({type:'ADD_CART_ITEM',item:item});
    };

    const removeItemFromCartHandler=id=>{
        CartAction({type:'REMOVE_CART_ITEM',id:id})
    };


    const cartContext={
        items:cartSate.item,
        totalAmount:cartSate.totalAmount,
        addItem:addItemToCartHandler,
        removeItem:removeItemFromCartHandler,
    };

    return(
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
};

export default CartProvider;