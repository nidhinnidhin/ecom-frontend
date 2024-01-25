import * as React from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import styles from "@/styles/Cart.module.css";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function Cart() {
  const [quantity, setQuantity] = useState([]);
  const [datas, setDatas] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8000/cart/cartlist/", {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("access_token"),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setDatas(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  console.log(datas);

  const CartDelete = (id) => {
    console.log(id);
    axios
      .delete(`http://localhost:8000/cart/cartdelete/${id}/`, {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("access_token"),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("deleted", res.data);
        axios
          .get(`http://localhost:8000/cart/cartlist/`, {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem("access_token"),
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            setDatas(res.data);
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err.response);
          });
      });
  };

  const cartCountIncrement = (id, count, index) => {
    const incrementBody = {
      cart_id: id,
      is_increment: true,
    };
    axios
      .post(`http://localhost:8000/cart/cart-count-update/`, incrementBody, {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("access_token"),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        let temp_cart = datas;
        temp_cart[index].count = temp_cart[index].count + 1;
        setDatas([...temp_cart]);
      });
  };

  const cartCountDecrement = (id, count, index) => {
    const decrementBody = {
      cart_id: id,
      is_increment: false,
    };
    axios
      .post(`http://localhost:8000/cart/cart-count-update/`, decrementBody, {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("access_token"),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        let temp_cart = datas;
        temp_cart[index].count = temp_cart[index].count - 1;
        setDatas([...temp_cart]);
      });
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.titleWrapper}>
        <ShoppingBagOutlinedIcon />
        <h4>My Cart</h4>
      </div>
      <hr />
      <div className={styles.wrapper}>
        <div className={styles.left}>
          {datas.map((item, index) => (
            <div>
              <div className={styles.productWrapper}>
                <div className={styles.imageWrapper}>
                  <Link href={`fashionproduct/${item.product.id}`}>
                    <Image
                      src={item.types.images.mainImage}
                      alt="image"
                      width={100}
                      height={100}
                      className={styles.image}
                    />
                  </Link>
                </div>
                <div className={styles.productDescriptionWrapper}>
                  <h5>{item.varient.name}</h5>
                  <p>{item.varient.description}</p>
                </div>
                <div className={styles.priceWrapper}>
                  <h5>Price</h5>
                  <h5>{item.varient.price}</h5>
                </div>
                <div className={styles.quantityWrapper}>
                  <button
                    className={styles.countBtn}
                    onClick={() => {
                      if (item.count > 1) {
                        cartCountDecrement(item.id, item.count, index);
                      }
                    }}
                  >
                    -
                  </button>
                  <h5 className={styles.count}>{item.count}</h5>
                  <button
                    className={styles.countBtn}
                    onClick={() =>
                      cartCountIncrement(item.id, item.count, index)
                    }
                  >
                    +
                  </button>
                </div>
                <div className={styles.totalWrapper}>
                  <h5>Total</h5>
                  <h5>{(item.count * item.varient.price || 0).toFixed(2)}</h5>
                </div>
              </div>
              <div className={styles.cartBtnWrapper}>
                <button
                  className={styles.cartBtn}
                  onClick={() => CartDelete(item.id)}
                >
                  Remove
                </button>
                <button className={styles.cartBtn}>Edit</button>
              </div>
              <hr />
            </div>
          ))}
        </div>

        <div className={styles.right}>
          <div className={styles.summary}>
            <div>
              <h3 className={styles.summaryTitle}>Summary</h3>
            </div>
            <div className={styles.shippingWrapper}>
              <span className={styles.summaryText}>Shipping cost</span>
              <span className={styles.summaryText}>12</span>
            </div>
            <div className={styles.discountWrapper}>
              <span className={styles.summaryText}>Discount</span>
              <span className={styles.summaryText}>12</span>
            </div>
            <div className={styles.taxWrapper}>
              <span className={styles.summaryText}>Tax</span>
              <span className={styles.summaryText}>12</span>
            </div>
            <div className={styles.subTotalWrapper}>
              <span className={styles.summaryText}>Estimated Total</span>
              <span className={styles.summaryText}>12,000</span>
            </div>
            <div className={styles.checkoutWrapper}>
              <button className={styles.checkoutBtn}>
                <LockOutlinedIcon />
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
