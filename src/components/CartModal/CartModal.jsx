import { forwardRef, useImperativeHandle, useRef, useContext } from "react";
import { createPortal } from "react-dom";
import Cart from "../Cart/Cart";
import Context from "../Context/Context.jsx";

const CartModal = forwardRef(function Modal() {
  const { cartItems, onUpdateCartItemQuantity, title, actions, ref } =
    useContext(Context);
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog id="modal" ref={dialog}>
      <h2>{title}</h2>
      <Context.Provider
        value={{
          items: cartItems,
          onUpdateItemQuantity: onUpdateCartItemQuantity,
        }}
      >
        <Cart
          items={cartItems}
          onUpdateItemQuantity={onUpdateCartItemQuantity}
        />
      </Context.Provider>
      <form method="dialog" id="modal-actions">
        {actions}
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default CartModal;
