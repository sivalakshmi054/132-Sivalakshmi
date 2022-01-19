import React , {useState} from "react";
import data from "./Components/back/Data/Data";
import Header from "./Components/front/Header/Header";
import { BrowserRouter as Router } from "react-router-dom";
import Mobiles from "./Components/front/Mobiles/mobiles";

const App = () => {
  const {productItems} = data;
  const [cartItems , setCartItems] = useState([]);

  const handleAddProduct = (product) => {
    const ProductExit = cartItems.find((item) => item.id === product.id);
    if(ProductExit)
    {
      setCartItems(cartItems.map((item) => item.id === product.id ?
      {...ProductExit , quantity:ProductExit.quantity+1}: item)
      );
    }
    else{
      setCartItems([...cartItems , {...product , quantity:1}])
    }
  };

  const handleRemoveProduct = (product) => {
    const ProductExit = cartItems.find((item) => item.id === product.id);
    if(ProductExit.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.id !== product.id));
    }
    else{
      setCartItems(
        cartItems.map((item) => 
        item.id === product.id 
        ? {...ProductExit , quantity:ProductExit.quantity - 1}
        :item
        )
      );
        }
      };

      const handleCartClerance = () =>{
        setCartItems([]);
      }

  return(
      <div>
        <Router>
        <Header cartItems={cartItems}/>
      
      <Mobiles 
      productItems={productItems} 
      cartItems={cartItems} 
      handleAddProduct={handleAddProduct}
      handleRemoveProduct={handleRemoveProduct}
      handleCartClerance={handleCartClerance}/>
      </Router>
       </div>
         );
};

export default App;