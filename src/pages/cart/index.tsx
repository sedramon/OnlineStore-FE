import UserContext from "@/UserContext";
import { useFetchCart } from "@/hooks/useFetchCart";
import styles from "@/styles/Home.module.css";
import { useContext } from "react";
import { Button, Table } from "reactstrap";
import { useState } from "react";

export default function CartPage() {
  const context = useContext(UserContext);
  const [refetchCount, setRefetchCount] = useState(0);
  const userCart = useFetchCart(
      `http://localhost:8080/api/carts/user/${context.userContext.id}`,
      () => setRefetchCount(refetchCount + 1)
    );

    const handleDelete = (articleId: string) => {
      if (!userCart) {
        return;
      }
      const updatedArticleList = userCart.articleList.filter(
        (article) => article.id !== articleId
      );
      userCart.articleList = updatedArticleList;
      fetch(`http://localhost:8080/api/carts/${userCart.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userCart),
      })
        .then(() => setRefetchCount(refetchCount + 1))
        .catch((error) => {
          console.log("Error updating cart:", error);
        });
    };

  return (
      <main className={`${styles.main} d-flex justify-content-center`}>
        <div>
          <h1 className={`${styles.h1} m-3`}>
            WELCOME {context.userContext.username}
          </h1>
          {userCart && userCart.articleList && userCart.articleList.length > 0 ? (
            <div>
            <Table bordered variant="dark" hover className={styles.table}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userCart.articleList.map((article, index) => (
                  <tr key={article.id}>
                    <td>{article.title}</td>
                    <td>{article.category.name}</td>
                    <td>${article.price.toFixed(2)}</td>
                    <td><Button variant="primary" color="danger" onClick={() => handleDelete(article.id)}>Remove</Button></td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="d-flex justify-content-center align-self-center">
                  <Button variant="primary" color="primary">Checkout</Button>
            </div>
            </div>
          ) : (
            <div>
              <h1>Your cart is currently empty.</h1>
            </div>
          )}
        </div>
      </main>
    );
}
