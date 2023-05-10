import UserContext from '@/UserContext';
import useFetch from '@/hooks/useFetch';
import styles from '@/styles/Home.module.css'
import { Cart } from '@/types/carts/Cart';
import { useContext } from "react";

export default function CartPage() {
      const context = useContext(UserContext);

      const { data: carts } = useFetch("http://localhost:8080/api/carts", "GET");


      const currentUserCart = carts.find((cart : Cart) => cart.user.id == context.userContext.id)

      return (
            <main className={`${styles.main} d-flex justify-content-center`}>
                  <div>
                        <h1 className={`${styles.h1} m-3`}>CART PAGE WORKS!</h1>
                        <h1 className={`${styles.h1} m-3`}>WELCOME {context.userContext.username}</h1>
                        <h1>{currentUserCart}</h1>
                  </div>
            </main>
      );
}