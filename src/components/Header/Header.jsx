import { useRef, useContext } from "react";
import {Context} from "../Context/Context.jsx";

import CartModal from "../CartModal/CartModal.jsx";

export default function Header() {
  const { items } = useContext(Context);
  const modal = useRef();

  const cartQuantity = items.length;


    /*
     @method: handleOpenCartClick.
     @return: Event; 
     função para fazer o carrinho aparecer
    
    */ 

  function handleOpenCartClick() {
    modal.current.open();
  }

  let modalActions = <button>Close</button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button>Close</button>
        <button>Checkout</button>
      </>
    );
  }

  return (
    <>
  
        <CartModal  
          ref={ modal }
          title={ "Your Cart"}
          actions = {modalActions} 
          />
      <header id="main-header">
        <div id="main-title">
          <img src="logo.png" alt="Elegant model" />
          <h1>Elegant Context</h1>
        </div>
        <p>
          <button onClick={handleOpenCartClick}>Cart ({cartQuantity})</button>
        </p>
      </header>
    </>
  );
}
