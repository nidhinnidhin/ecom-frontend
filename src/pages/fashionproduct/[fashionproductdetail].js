import Navbar from "../components/navbar";
import Footer from "../components/footer";
import styles from "@/styles/Detail.module.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";
import Image from "next/image";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState, useEffect } from "react";

export default function FashionProductDetail({ products }) {
  console.log("products", products);
  const [size, setSize] = useState("");
  const [cart, setCart] = useState([]);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedVarient, setSelectedVarient] = useState(0);

  const handleChange = (event) => {
    setSize(event.target.value);
    // console.log(event.target.value);
  };

  const addProductToCart = (id, products) => {
    let varientid = products.varients[selectedVarient].id
    let typeid = products.varients[selectedVarient].types[selectedColor].id
    axios
      .post(
        "http://localhost:8000/cart/",
        {
          product: id,
          count: 1,
          varient: varientid,
          types: typeid
        },
        {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("access_token"),
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        console.log("stored");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const addToWhishlist = (id) => {
    let varientid = products.varients[selectedVarient].id
    let typeid = products.varients[selectedVarient].types[selectedColor].id
    axios
      .post(
        "http://localhost:8000/whishlist/",
        {
          product: id,
          varient: varientid,
          types: typeid
        },
        {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("access_token"),
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        console.log("stored");
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
  const productUpdateSizeWise = (index1, index2) => {
    setSelectedVarient(index1)
    setSelectedColor(index2)
  }
  const productUpdateColorWise = (index1, index2) => {
    setSelectedVarient(index1)
    setSelectedColor(index2)
  }

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <div className={styles.productSmallImages}>
            {products.varients.map((item, index1) =>
              item.types.map((item1, index2) =>
                item1.images.subImages.map((subimages) => (
                  index1 === selectedVarient && index2 === selectedColor ?
                  <div>
                    <Image
                      className={styles.smallImage}
                      src={subimages.image}
                      alt="image"
                      width={80}
                      height={80}
                    />
                  </div>
                  : ""
                ))
              )
            )}
          </div>
          <div className={styles.productBigImage}>
            {products.varients.map((item, index1) =>
              item.types.map((item1, index2) => (
                index1 === selectedVarient && index2 === selectedColor ?
                <Image
                  className={styles.bigImage}
                  src={item1.images.mainImage}
                  alt="image"
                  width={500}
                  height={500}
                />
                :""
              ))
            )}
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.titleWrapper}>
            <h3>{products.name}</h3>
          </div>

          {products.varients.map((item, index) => (
            index === selectedVarient ?
            <div className={styles.descriptionWrapper}>
              <p>{item.description}</p>
              <h4>
                Price : <span>{item.price}</span>
              </h4>
            </div>
            :""
          ))}
          <h5 className={styles.selectText1}>Select variation</h5>
          <div className={styles.selectSizeWrapper}>
            {products.varients.map((item, index1) =>
              item.types.map((item1, index2) =>
                item1.fields.map((item2, index3) => (
                  <button onClick = {() => productUpdateSizeWise(index1, index2)} className={styles.variatonBtn}>{item2.value}</button>
                ))
              )
            )}
          </div>
          <h5>Colors Available</h5>
          <div className={styles.colorWrapper}>
            {products.varients.map((item, index1) =>
              item.types.map((item1, index2) => (
                <button
                  onClick={() => productUpdateColorWise(index1, index2)}
                  key={products.id}
                  className={styles.btnImages}
                  style={{ backgroundColor: item1.images.color }}
                ></button>
              ))
            )}
          </div>
          <div className={styles.btnsWrapper}>
            <button
              className={styles.addToCart}
              onClick={() => addProductToCart(products.id, products)}
            >
              ADD TO CART
            </button>
            <button className={styles.whishList} onClick = {() => addToWhishlist(products.id)}>
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
  const res = await axios.get(
    "http://localhost:8000/fashionproduct/fashionproductlist/"
  );
  const products = res.data;

  const paths = products.map((product) => ({
    params: { fashionproductdetail: product.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { fashionproductdetail } = params;

  const res = await axios.get(
    `http://localhost:8000/fashionproduct/fashionproductdetail/${fashionproductdetail}/`
  );
  const products = res.data;
  console.log(products);
  return {
    props: { products },
  };
}
