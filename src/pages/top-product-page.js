import Navbar from "./components/navbar";
import Footer from "./components/footer";
import styles from "@/styles/TopDeals.module.css";
import Image from "next/image";
import Link from 'next/link';

export async function getServerSideProps(context) {
  const res = await fetch("http://localhost:8000/topproduct/topproductlist/");
  const datas = await res.json();

  return {
    props: {
      posts: datas,
    },
  };
}

export default function TopProductPage({ posts }) {
  return (
    <>
      <div className={styles.pageContainer}>
        <Navbar />
        <div className={styles.pageTitleContainer}>
          <h3 className={styles.title}>TOP DEALS</h3>
        </div>
        <div className={styles.pageWraper}>
          {posts?.length === 0 ? (
            <div>Loading...</div>
          ) : (
            posts?.map((post) => (
              <div class="card" id={styles.pageCard}>
                <Link href={`topproduct/${post.id}`}>
                  <Image src={post.image1} alt="image" width={220} height={200} />
                </Link>
                <div class="card-body">
                  <h5 class="card-title">{post.name}</h5>
                  <p class="card-text">{post.description}</p>
                  <p class="card-text">{post.price}</p>
                </div>
              </div>
            ))
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}
