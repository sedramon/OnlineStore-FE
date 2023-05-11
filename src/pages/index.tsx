import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function HomePage() {
  return (
    <>
      <main
        className={`${styles.main} ${styles.center} ${inter.className} d-flex flex-column`}
      >
        <div className={styles.block1}>
          <div>
            <Image
              src="/images/pexels-photo-3861458.jpg"
              alt="image1"
              width={700}
              height={450}
              className={styles.homeImage}
            />
          </div>
          <div className="d-flex flex-column justify-content-center  m-3">
            <h1 className={styles.h1}>WELCOME TO PCAXE!</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
              maiores earum maxime, accusamus perspiciatis quos, minus harum
              repellendus doloribus officiis, dolorum laboriosam unde
              accusantium minima explicabo quia rem iusto nemo.Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Nihil maiores earum maxime,
              accusamus perspiciatis quos, minus harum repellendus doloribus
              officiis, dolorum laboriosam unde accusantium minima explicabo
              quia rem iusto nemo.
            </p>
          </div>
        </div>
        <div className={styles.block1}>
          <div className="d-flex flex-column justify-content-center  m-3">
            <h1 className={styles.h1}>WE OFFER GREAT DEALS!</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
              maiores earum maxime, accusamus perspiciatis quos, minus harum
              repellendus doloribus officiis, dolorum laboriosam unde
              accusantium minima explicabo quia rem iusto nemo.Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Nihil maiores earum maxime,
              accusamus perspiciatis quos, minus harum repellendus doloribus
              officiis, dolorum laboriosam unde accusantium minima explicabo
              quia rem iusto nemo.
            </p>
          </div>
          <div>
            <Image
              src="/images/pexels-photo-3861972.jpeg"
              alt="image1"
              width={700}
              height={450}
              className={styles.homeImage}
            />
          </div>
        </div>
      </main>
    </>
  );
}
