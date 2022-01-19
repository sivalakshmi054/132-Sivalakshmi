import React from "react";
import Products from "../Products/Products";
import signup from "../Signup/Signup";
import Cart from "../Cart/Cart";
import { Route , Routes } from  "react-router-dom";

const Mobiles = ({productItems , 
    cartItems , 
    handleAddProduct , 
    handleRemoveProduct , 
    handleCartClerance}) => {
    return ( 
    <div>
        <Routes>
            <Route path="/" exact>
                <Products 
                productItems={productItems} 
                handleAddProduct={handleAddProduct}/> 
            </Route>
            <Route path ="/signup" exact>
              <signup />
              <Route path="/cart" exact>
                  <Cart 
                  cartItems={cartItems} 
                  handleAddProduct={handleAddProduct}
                  handleRemoveProduct={handleRemoveProduct}
                  handleCartClerance={handleCartClerance}/>

              </Route>
            </Route>
            </Routes> 
         </div>

    );

};

export default Mobiles;
