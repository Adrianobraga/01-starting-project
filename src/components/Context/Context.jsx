import { createContext,useState } from "react"
import { DUMMY_PRODUCTS } from "../../dummy-products.js";

 export const Context = createContext({
    items:[],
    addItem: () => {},
    updateCart: () => {}
 }) 
 
 export default function StoreContextProvider({children}){
    
    const [shoppingCart, setShoppingCart] = useState({
        items: [],
      });

      
   /*
     @method: handleAddItemToCart.
     @return: int;
     @args: id:int , updatedItems:Array , existingCartItemIndex: Int , existingCartItem:Array 
     Função ira adicionar ao carrinho de compra
    
  */

  function handleAddItemToCart(id) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id === id);
        updatedItems.push({
          id: id,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return {
        items: updatedItems,
      };
    });
  }

 
   /*
     @method: handleUpdateCartItemQuantity.
     @return: Array;
     @args: productId:Int , amount:Int , updatedItems:Array , updatedItemIndex:Int 
     Função ira acrescentar ou diminuir a quantidade de tem do carrinho
    
  */ 

  function handleUpdateCartItemQuantity(productId, amount) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === productId
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
      };
    });
  }

const ContextValue = {
    items:shoppingCart.items,
    addItem: handleAddItemToCart,
    updateCart: handleUpdateCartItemQuantity
}
    return(
    <Context.Provider value={ContextValue}>
        {children}
    </Context.Provider>
    
);
 }