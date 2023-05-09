import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import useFetch from '@/hooks/useFetch';
import { Article } from '@/types/articles/Article';
import { Button } from 'reactstrap';
import Image from "next/image";

const inter = Inter({ subsets: ['latin'] })

export default function ShopPage() {
      const { data: articles, isLoading, error, refetch } = useFetch("http://localhost:8080/api/articles", "GET");


      const handleAddToCart = (articleId: string) => {
            console.log(`Added article with ID ${articleId} to cart`);
          };

          return (
            <div className={`${styles.main} ${styles.center} d-flex flex-column`}>
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
                        onClick={() => handleAddToCart(article.id)}
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