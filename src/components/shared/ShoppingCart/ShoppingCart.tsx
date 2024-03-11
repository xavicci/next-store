"use client";
import { FaShoppingCart } from "react-icons/fa";
import styles from './ShopingCart.module.sass'
import {useShoppingCart} from "app/hooks/useShoppingCart";

export const ShoppingCart = () => {
const {cart} = useShoppingCart();
const [isOpen,setIsOpen]= useState(false);
const handleOpen = () => setIsOpen(!isOpen);

  return (
    <button className={styles.ShoppingCart} onClick={handleOpen}>
      <span className={styles.ShoppingCart__counter}>
        {cart.length}
      </span>
      <FaShoppingCart />
        <div className={styles.ShoppingCart__items}>
            {
                cart.map(item =>(
                    <p key={item?.id}>{item?.title}</p>
                ))
            }
        </div>
    </button>
  )
}