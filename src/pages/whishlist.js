import Navbar from "../components/navbar";
import Footer from "../components/footer";
import styles from "@/styles/Whishlist.module.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RegisterPopUp from "../components/register-popup";

export default function Whishlist() {
  const [whishlist, setWhishlist] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token")
    if (accessToken) {
      axios
        .get("http://localhost:8000/whishlist/whishlist/", {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("access_token"),
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setWhishlist(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  }, []);

  const deleteWhishlist = (id) => {
    axios
      .delete(`http://localhost:8000/whishlist/delete-wishlist/${id}/`, {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("access_token"),
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        axios
          .get("http://localhost:8000/whishlist/whishlist/", {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem("access_token"),
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            setWhishlist(res.data);
          })
          .catch((err) => {
            console.log(err.response);
          });
      });
    console.log(id);
  };

  return (
    <>
        <div className={styles.pageContainer}>
          <Navbar />
          <div className={styles.pageTitleContainer}>
            <h3 className={styles.title}>FAVORITES ({whishlist.length})</h3>
          </div>
            <div className={styles.pageWraper}>
              {whishlist.map((item) =>
                item.varient.types.map((item1) => {
                  console.log(item);
                  return (
                    <div key={item.id} class="card" id={styles.pageCard}>
                      <div onClick={() => deleteWhishlist(item.id)}>
                        <FavoriteIcon className={styles.like} />
                      </div>
                      <div className={styles.imageWrapper}>
                        <Link
                          href={`fashionproduct/${item.product.id}?variantId=${item.varient.id}&typeId=${item.types.id}`}
                        >
                          <Image
                            className={styles.image}
                            src={item1.images.mainImage}
                            alt="image"
                            width={220}
                            height={200}
                          />
                        </Link>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          <Footer />
        </div>
    </>
  );
}
