import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import useFetch from '@/hooks/useFetch';
import { Article } from '@/types/articles/Article';
import { Button } from 'reactstrap';
import Image from "next/image";
import UserContext from '@/UserContext';
import { useContext } from "react";

const inter = Inter({ subsets: ['latin'] })

export default function ShopPage() {
    const context = useContext(UserContext);
      const { data: articles, isLoading, error, refetch } = useFetch("http://localhost:8080/api/articles", "GET");


      const handleAddToCart = async (articleId: string, articleTitle: string, articleDesc: string, articlePrice: number, articleCategoryId: string, articleCategoryName: string) => {
        try {
          const response = await fetch(`http://localhost:8080/api/carts/user/${context.userContext.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: articleId,
              title: articleTitle,
              description: articleDesc,
              category: {
                id: articleCategoryId,
                name: articleCategoryName
              },
              price: articlePrice
            })
          });
      
          if (!response.ok) {
            throw new Error('Failed to add article to cart');
          }
      
          console.log(`Added article with ID ${articleId} to cart`);
        } catch (error) {
          console.error(error);
        }
      };

          return (
            <div className={`${styles.main} d-flex flex-column justify-content-center align-items-center`}>
              <h1 className={`${styles.h1} mb-5`}>Shop Page</h1>
              <div className={styles.grid}>
                {articles.map((article: Article) => (
                  <div key={article.id} className={styles.card}>
                    <div className={styles.cardImage}>
                      <Image
                        src={"/images/placeholder.jpg"}
                        alt="Article Image"
                        width={230}
                        height={200}
                      />
                    </div>
                    <div className={`${styles.cardContent} d-flex flex-column justify-content-center`}>
                      <h2 className={styles.cardTitle}>
                        {article.title}
                      </h2>
                      <p className={styles.cardDescription}>{article.description}</p>
                      <p className={styles.cardDescription}>{article.category.name}</p>
                      <p className={styles.cardPrice}>${article.price}</p>
                      <Button
                        variant="primary" className="mt-3"
                        onClick={() => handleAddToCart(article.id, article.title, article.description, article.price, article.category.id, article.category.name)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
}