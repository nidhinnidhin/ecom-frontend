import * as React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import styles from "@/styles/CategoryProduct.module.css";
import Link from "next/link";

export default function CategoryProductsList() {
  const router = useRouter();
  const { id } = router.query;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products/category/${id}/`
        );
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching products by category:", error);
      }
    };

    if (id) {
      fetchProductsByCategory();
    }
  }, [id]);
  return (
    <div>
      <Navbar />
      <div className={styles.wrapper}>
        {products?.length === 0 ? (
          <div className={styles.emptyInformation}>
            <h3>Sorryy.. no products in this category</h3>
          </div>
        ) : (
          products?.map((product) => (
            <div key={product.id} class="card" id={styles.pageCard}>
              <Link href={`/categoryproductdetail/${product.id}`}>
                <Image
                  src={product.image}
                  alt="image"
                  width={120}
                  height={100}
                  className={styles.categoryProductImage}
                />
              </Link>
              <div class="card-body">
                <h5 class="card-title">{product.name}</h5>
                <p class="card-text">{product.description}</p>
                <p class="card-text">{product.price}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
}
