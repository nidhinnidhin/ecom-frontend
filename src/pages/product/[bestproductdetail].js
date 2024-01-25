import Navbar from "../components/navbar";
import Footer from "../components/footer";
import styles from "@/styles/Detail.module.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";
import Image from "next/image";

export default function ProductDetail({ product }) {
  console.log(product);
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <div className={styles.productSmallImages}>
            <Image
              className={styles.smallImage}
              src={product.image2}
              alt="image"
              width={80}
              height={80}
            />
            <Image
              className={styles.smallImage}
              src={product.image3}
              alt="image"
              width={80}
              height={80}
            />
            <Image
              className={styles.smallImage}
              src={product.image4}
              alt="image"
              width={80}
              height={80}
            />
            <Image
              className={styles.smallImage}
              src={product.image5}
              alt="image"
              width={80}
              height={80}
            />
          </div>
          <div className={styles.productBigImage}>
            <Image
              className={styles.bigImage}
              src={product.image1}
              alt="image"
              width={500}
              height={500}
            />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.titleWrapper}>
            <h3>{product.name}</h3>
          </div>
          <div className={styles.descriptionWrapper}>
            <p>{product.description}</p>
            <h4>
              Price : <span>{product.price}</span>
            </h4>
          </div>
          <div className={styles.selectTexts}>
            <h5 className={styles.selectText1}>Select size</h5>
            <h6 className={styles.selectText2}>Select guide</h6>
          </div>
          <div className={styles.selectSizeWrapper}>
            <button className={styles.sizes}>{product.size}</button>
          </div>
          <div className={styles.btnsWrapper}>
            <button className={styles.addToCart}>ADD TO CART</button>
            <button className={styles.whishList}>
              Whishlist <FavoriteBorderIcon />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  const res = await axios.get("http://localhost:8000/bestproduct/bestproductlist/");
  const products = res.data;

  const paths = products.map((product) => ({
    params: { bestproductdetail: product.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { bestproductdetail } = params;

  const res = await axios.get(`http://localhost:8000/bestproduct/bestproductdetail/${bestproductdetail}/`);
  const product = res.data;

  return {
    props: { product },
  };
}
