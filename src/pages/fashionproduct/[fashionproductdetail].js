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
import CustomSnackbar from "../customSnackbar";
import { useRouter } from "next/router";
import { fetchCartCount } from "@/utils/cartUtils";
import { useDispatch } from "react-redux";
import Rating from "@mui/material/Rating";

export default function FashionProductDetail({ products }) {
  const dispatch = useDispatch();
  console.log("products", products);
  const [size, setSize] = useState("");
  const [cart, setCart] = useState([]);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedVarient, setSelectedVarient] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [selectedColorBtn, setselectedColorBtn] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  
  
  const router = useRouter();
  const { variantId, typeId } = router.query;
  console.log(variantId, typeId);
  
  useEffect(() => {
    if (variantId) {
      setSelectedVarient(variantId);
    }
    if (typeId) {
      setSelectedColor(typeId);
      setselectedColorBtn(typeId);
    }
  }, [variantId, typeId]);
  
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleChange = (event) => {
    setSize(event.target.value);
  };

  const addProductToCart = (id, products) => {
    let varientid = selectedVarient
    let typeid = selectedColor
    axios
      .post(
        "http://localhost:8000/cart/",
        {
          product: id,
          count: 1,
          varient: varientid,
          types: typeid,
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
        dispatch(fetchCartCount());
        setSnackbarSeverity("success");
        setSnackbarMessage("Product added to cart.");
        setSnackbarOpen(true);
      })
      .catch((err) => {
        console.log(err.response);
        setSnackbarSeverity("error");
        setSnackbarMessage("Login, if you are not loged in!");
        setSnackbarOpen(true);
      });
  };
  const addToWhishlist = (id) => {
    let varientid = selectedVarient
    let typeid = selectedColor
    const accessToken = localStorage.getItem("access_token");
    if(!accessToken){
      setSnackbarSeverity("error");
      setSnackbarMessage("Login, if you are not loged in!");
      setSnackbarOpen(true);
    }
    console.log(varientid);
    console.log(typeid);
    axios
      .post(
        "http://localhost:8000/whishlist/",
        {
          product: id,
          varient: varientid,
          types: typeid,
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
        setSnackbarSeverity("success");
        setSnackbarMessage("Product added to whishlist.");
        setSnackbarOpen(true);
      })
      .catch((err) => {
        console.log(err.response.data);
        setSnackbarSeverity("error");
        setSnackbarMessage(err.response.data);
        setSnackbarOpen(true);
      });
  };
  const productUpdateSizeWise = (varientId, typeId, image) => {
    setSelectedVarient(varientId);
    setSelectedColor(typeId);
    setSelectedImage(image);
  };
  const productUpdateColorWise = (varientId, typeId, image) => {
    setSelectedVarient(varientId);
    setSelectedColor(typeId);
    setSelectedImage(image);
    setselectedColorBtn(varientId);
  };
  

  return (
    <div className={styles.container}>
      <Navbar />
      <CustomSnackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <div className={styles.productBigImage}>
            {products.varients.map((item, index1) =>
              item.types.map((item1, index2) =>
                item.id == selectedVarient && item1.id == selectedColor ? (
                  <Image
                    className={styles.bigImage}
                    src={selectedImage != null ? selectedImage : item1.images.mainImage}
                    alt="image"
                    width={400}
                    height={400}
                  />
                ) : (
                  ""
                )
              )
            )}
          </div>
          <div className={styles.productSmallImages}>
            {products.varients.map((item, index1) =>
              item.types.map((item1, index2) =>
                item1.images.subImages.map((subimages) => {
                  console.log("item1", item1.images.mainImage);
                  return item.id == selectedVarient &&
                    item1.id == selectedColor ? (
                    <div>
                      <Image
                        className={styles.smallImage}
                        src={subimages.image}
                        alt="image"
                        width={80}
                        height={80}
                        onClick={() => setSelectedImage(subimages.image)}
                      />
                    </div>
                  ) : (
                    ""
                  );
                })
              )
            )}
          </div>
        </div>
        <div className={styles.right}>
          {products.varients.map((item, index) =>
            item.id == selectedVarient ? (
              <div className={styles.titleWrapper}>
                <h3 className={styles.productName}>{item.name}</h3>
                <div className={styles.brandWrapper}>
                  <span className={styles.brandText}>Brand:</span>
                  <div className={styles.brand}>{item.brand}</div>
                </div>
                <div className={styles.descriptionWrapper}>
                  <p className={styles.productDescription}>
                    {item.description}
                  </p>
                  <Rating
                    name="read-only"
                    className={styles.rating}
                    value={item.rating}
                    readOnly
                  />
                  <span className={styles.starRating}>{item.rating}*</span>
                  <h4 className={styles.productPrice}>
                    Price : <span>{item.price} ₹</span>
                  </h4>
                </div>
              </div>
            ) : (
              ""
            )
          )}
          <h5 className={styles.selectText1}>Select variation</h5>
          <div className={styles.selectSizeWrapper}>
            {products.varients.map((item, index1) =>
              item.types.map((item1, index2) =>
                item1.fields.map(
                  (item2) =>
                    item.id == selectedVarient &&
                    item1.id == selectedColor && (
                      <button
                        onClick={() =>
                          productUpdateSizeWise(
                            item.id,
                            item1.id,
                            item1.images.mainImage
                          )
                        }
                        className={styles.variatonBtn}
                      >
                        {item2.value}
                      </button>
                    )
                )
              )
            )}
          </div>
          <h5 className={styles.productColor}>Colors Available</h5>
          <div className={styles.colorWrapper}>
            {products.varients.map((item, index1) =>
              item.types.map((item1, index2) => (
                <button
                  onClick={() =>
                    productUpdateColorWise(
                      item.id,
                      item1.id,
                      item1.images.mainImage
                    )
                  }
                  key={products.id}
                  className={styles.btnImages}
                  style={{
                    backgroundColor: item1.images.color,
                    border:
                      selectedColorBtn == item1.id ? "3px solid #3f51b5" : "",
                  }}
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
            <button
              className={styles.whishList}
              onClick={() => addToWhishlist(products.id)}
            >
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
  const { fashionproductdetail, variantId, typeId } = params;

  const res = await axios.get(
    `http://localhost:8000/fashionproduct/fashionproductdetail/${fashionproductdetail}?variantId=${variantId}&typeId=${typeId}`
  );

  const products = res.data;
  console.log(products);
  return {
    props: { products },
  };
}
