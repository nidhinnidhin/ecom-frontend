import * as React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
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
import { loadStripe } from "@stripe/stripe-js";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useRouter } from "next/router";
import EditNoteIcon from "@mui/icons-material/EditNote";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import {
  useStripe,
  useElements,
  PaymentElement,
  Elements,
} from "@stripe/react-stripe-js";
import CustomSnackbar from "./customSnackbar";
import { fetchCartCount } from "@/utils/cartUtils";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import RegisterPopUp from "../components/register-popup";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

export default function Cart() {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [quantity, setQuantity] = useState([]);
  const [datas, setDatas] = useState([]);
  const [address, setAddress] = useState([]);
  const [showStripe, setShowStripe] = useState(false);
  const [secret, setSecret] = useState("");
  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");
  const [townOrCity, setTownOrCity] = useState("");
  const [state, setState] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const handleEditFormOpen = () => setOpenEditForm(true);
  const handleEditFormClose = () => setOpenEditForm(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [errors, setErrors] = useState({});
  const [paymentError, setPaymentError] = useState(null);
  const dispatch = useDispatch();

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    switch (name) {
      case "fullName":
        setFullName(value);
        break;
      case "mobile":
        setMobile(value);
        break;
      case "addressLine1":
        setAddressLine1(value);
        break;
      case "addressLine2":
        setAddressLine2(value);
        break;
      case "landmark":
        setLandmark(value);
        break;
      case "pincode":
        setPincode(value);
        break;
      case "townOrCity":
        setTownOrCity(value);
        break;
      case "state":
        setState(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(mobile)) {
      newErrors.mobile = "Invalid mobile number";
    }
    if (!addressLine1.trim()) {
      newErrors.addressLine1 = "Address line 1 is required";
    }
    if (!addressLine2.trim()) {
      newErrors.addressLine2 = "Address line 2 is required";
    }
    if (!landmark.trim()) {
      newErrors.landmark = "Landmark is required";
    }
    if (!pincode.trim() || !townOrCity.trim()) {
      newErrors.pincode = "This field is required";
    } else if (!/^\d{6}$/.test(pincode)) {
      newErrors.pincode = "Invalid pincode";
    }
    if (!state.trim()) {
      newErrors.state = "State is required";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const address_data = {
        fullName: fullName,
        mobile: mobile,
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        landmark: landmark,
        pincode: pincode,
        townOrCity: townOrCity,
        state: state,
      };
      axios
        .post(
          `http://localhost:8000/checkout/address-save/`,
          { address_data },
          {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem("access_token"),
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => {
          console.log("address saved");
          setSnackbarSeverity("success");
          setSnackbarMessage("Address saved");
          setSnackbarOpen(true);
        })
        .catch((err) => {
          setSnackbarSeverity("error");
          setSnackbarMessage("Error occured");
          setSnackbarOpen(true);
          console.log(err.response);
        });
      handleClose();
    }
  };

  const router = useRouter();

  const stripePromise = loadStripe(
    "pk_test_51LVzIiSHbelfXOXs2UwOPxn0UZuulmI2mtyUOnivfXahojRw7F5PsI6ngrI7eXke5oJ5yOSRpDPv8gQECEGfl4Jb00Ujnj9dD1"
  );
  const handleDeleteItem = (itemId) => {
    setSelectedItemId(itemId);
    setShowDeleteConfirmation(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token")
    if (accessToken) {
      axios
        .get("http://localhost:8000/cart/cartlist/", {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("access_token"),
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res.data);
          setDatas(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token")
    if (accessToken) {
      axios
        .get("http://localhost:8000/address/address-list/", {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("access_token"),
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setAddress(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token")
    if (accessToken) {
      axios
        .get(`http://localhost:8000/address/address-detail/`, {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("access_token"),
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setFullName(res.data.fullName);
          setMobile(res.data.mobile);
          setAddressLine1(res.data.addressLine1);
          setAddressLine2(res.data.addressLine2);
          setLandmark(res.data.landmark);
          setPincode(res.data.pincode);
          setTownOrCity(res.data.townOrCity);
          setState(res.data.state);
          console.log("edit-address", res.data);
        });
    }
  }, []);

  const handleConfirmDelete = () => {
    const id = selectedItemId;
    axios
      .delete(`http://localhost:8000/cart/cartdelete/${id}/`, {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("access_token"),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("deleted", res.data);
        dispatch(fetchCartCount());
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
            setShowDeleteConfirmation(false);
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

  const checkoutAllPrdoducts = () => {
    axios
      .get("http://localhost:8000/checkout/test-checkout/", {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("access_token"),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        handleOpen();
        setSecret(res.data.client_secret);
        setShowStripe(true);
      });
  };

  const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [checkoutLoading, setCheckoutLoading] = useState(false);

    const handleSubmit = async (event) => {
      event.preventDefault();
      setCheckoutLoading(true);
      if (!stripe || !elements) {
        console.log("Loading");
        return;
      }

      const result = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });
      if (result.error) {
        console.log(result);
        alert("Payment failed.");
        setShowStripe(false);
      } else {
        console.log(result);

        axios
          .get(`http://localhost:8000/checkout/cart-checkout/`, {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem("access_token"),
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            console.log("Success");
            setSnackbarSeverity("success");
            setSnackbarMessage("Order confirmed");
            setSnackbarOpen(true);
            router.push("/orders");
          })
          .catch((err) => {
            setSnackbarSeverity("error");
            setSnackbarMessage("Error occured");
            setSnackbarOpen(true);
            console.log(err.response);
          });
      }
    };
    return (
      <form onSubmit={handleSubmit} className={styles.form}>
        <PaymentElement />
        <div style={{ textAlign: "right" }}>
          <button disabled={!stripe} className={styles.payButton}>
            Pay <PaymentOutlinedIcon />
          </button>
        </div>
      </form>
    );
  };

  let total = 0;
  let tax = 0;
  let discount = 0;
  let shipping_cost = 0;
  let grand_total = 0;
  return (
    <>
      <div className={styles.container}>
          <div>
            <CustomSnackbar
              open={snackbarOpen}
              onClose={handleSnackbarClose}
              message={snackbarMessage}
              severity={snackbarSeverity}
            />
            <Navbar />
            <div className={styles.titleWrapper}>
              <ShoppingBagOutlinedIcon />
              <h4>My Cart</h4>
            </div>
            <hr />
            {datas.length == 0 && (
              <div className={styles.cart_title}>
                <h5>
                  No products added{" "}
                  <Link href="/fashion-product-page">Products</Link>
                </h5>
              </div>
            )}
            <div className={styles.wrapper}>
              <div className={styles.left}>
                {datas.map((item, index) => {
                  total += item.count * item.varient.price;
                  tax += (total * 2) / 100;
                  discount += (total * 5) / 100;
                  shipping_cost += total / 20;
                  grand_total += total + tax - discount + shipping_cost;
                  return (
                    <div key={item.id} className={styles.productContainer}>
                      <div className={styles.productWrapper}>
                        <div className={styles.imageWrapper}>
                          <Link
                            href={`fashionproduct/${item.product.id}?variantId=${item.varient.id}&typeId=${item.types.id}`}
                          >
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
                          <h5 className={styles.productTitle}>
                            {item.varient.name}
                          </h5>
                          <p className={styles.productDescription}>
                            {item.varient.description}
                          </p>
                        </div>
                        <div className={styles.priceWrapper}>
                          <h5 className={styles.productPrice}>Price</h5>
                          <h5 className={styles.productPrice}>
                            {item.varient.price} ₹
                          </h5>
                        </div>
                        <div className={styles.quantityWrapper}>
                          {item.count > 1 ? (
                            <button
                              className={styles.countBtn}
                              onClick={() => {
                                if (item.count > 1) {
                                  cartCountDecrement(
                                    item.id,
                                    item.count,
                                    index
                                  );
                                }
                              }}
                            >
                              -
                            </button>
                          ) : (
                            ""
                          )}
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
                          <h5 className={styles.grandTotalPrice}>Total</h5>
                          <h5 className={styles.grandTotalPrice}>
                            {(item.count * item.varient.price || 0).toFixed(2)}{" "}
                            ₹
                          </h5>
                        </div>
                      </div>
                      <div className={styles.cartBtnWrapper}>
                        <button
                          className={styles.cartBtn}
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          Delete
                        </button>
                        <Dialog
                          open={showDeleteConfirmation}
                          onClose={handleCloseDeleteConfirmation}
                        >
                          <DialogTitle>Confirm Delete</DialogTitle>
                          <DialogContent>
                            Are you sure you want to delete this item from your
                            cart?
                          </DialogContent>
                          <DialogActions>
                            <Button
                              onClick={handleCloseDeleteConfirmation}
                              color="primary"
                            >
                              Cancel
                            </Button>
                            <Button onClick={handleConfirmDelete} color="error">
                              Delete
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </div>
                      <hr className={styles.hr} />
                    </div>
                  );
                })}
              </div>

              <div className={styles.right}>
                {datas.length != 0 && (
                  <div className={styles.summary}>
                    <div>
                      <h3 className={styles.summaryTitle}>Summary</h3>
                    </div>
                    <div className={styles.shippingWrapper}>
                      <span className={styles.summaryText}>Shipping cost</span>
                      <span className={styles.summaryText}>
                        {shipping_cost}.00 ₹
                      </span>
                    </div>
                    <div className={styles.discountWrapper}>
                      <span className={styles.summaryText}>Discount</span>
                      <span className={styles.summaryText}>
                        {discount.toFixed(2)} ₹
                      </span>
                    </div>
                    <div className={styles.taxWrapper}>
                      <span className={styles.summaryText}>Tax</span>
                      <span className={styles.summaryText}>
                        {tax.toFixed(2)} ₹
                      </span>
                    </div>
                    <div className={styles.subTotalWrapper}>
                      <span className={styles.summaryText}>
                        Estimated Total
                      </span>
                      <span className={styles.summaryText}>
                        {grand_total.toFixed(2)} ₹
                      </span>
                    </div>
                    <div className={styles.checkoutWrapper}>
                      {showStripe ? (
                        <Elements
                          stripe={stripePromise}
                          options={{ clientSecret: secret }}
                        >
                          <CheckoutForm />
                        </Elements>
                      ) : (
                        <button
                          class="btn btn-success w-100 d-flex align-items-center justify-content-center"
                          onClick={checkoutAllPrdoducts}
                          id={styles.payWithStripe}
                        >
                          <LockOutlinedIcon />
                          Pay with stripe
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <div>
                    <div className={styles.addressTitle}>
                      <h6>Create address</h6>
                    </div>
                    <div className={styles.container}>
                      <div className={styles.wrapper}>
                        <form onSubmit={handleSubmit}>
                          <div>
                            <div class="input-group mb-3">
                              <input
                                type="text"
                                name="fullName"
                                class="form-control"
                                onChange={handleChange}
                                value={fullName}
                                placeholder="Full name (First and Last name)"
                              />
                            </div>
                            {errors.fullName && (
                              <span className={styles.errorMsg}>
                                {errors.fullName}
                              </span>
                            )}
                            <div class="input-group mb-3">
                              <input
                                type="number"
                                name="mobile"
                                id={styles.numberInput}
                                class="form-control"
                                onChange={handleChange}
                                value={mobile}
                                placeholder="Mobile"
                              />
                            </div>
                            {errors.mobile && (
                              <span className={styles.errorMsg}>
                                {errors.mobile}
                              </span>
                            )}
                            <div class="input-group mb-3">
                              <input
                                type="text"
                                name="addressLine1"
                                class="form-control"
                                onChange={handleChange}
                                value={addressLine1}
                                placeholder="House no., Building, Appartment"
                              />
                            </div>
                            {errors.addressLine1 && (
                              <span className={styles.errorMsg}>
                                {errors.addressLine1}
                              </span>
                            )}
                            <div class="input-group mb-3">
                              <input
                                type="text"
                                name="addressLine2"
                                class="form-control"
                                onChange={handleChange}
                                value={addressLine2}
                                placeholder="Area, Street, Sector, Village"
                              />
                            </div>
                            {errors.addressLine2 && (
                              <span className={styles.errorMsg}>
                                {errors.addressLine2}
                              </span>
                            )}
                            <div class="input-group mb-3">
                              <input
                                type="text"
                                name="landmark"
                                class="form-control"
                                onChange={handleChange}
                                value={landmark}
                                placeholder="Landmark"
                              />
                            </div>
                            {errors.landmark && (
                              <span className={styles.errorMsg}>
                                {errors.landmark}
                              </span>
                            )}
                            <div class="input-group mb-3">
                              <input
                                type="text"
                                name="pincode"
                                placeholder="Pincode (6-digit)"
                                aria-label="Pincode"
                                value={pincode}
                                class="form-control"
                                onChange={handleChange}
                              />
                              <input
                                type="text"
                                name="townOrCity"
                                placeholder="Town/City"
                                aria-label="Town City"
                                value={townOrCity}
                                class="form-control"
                                onChange={handleChange}
                              />
                            </div>
                            {errors.pincode && (
                              <span className={styles.errorMsg}>
                                {errors.pincode}
                              </span>
                            )}
                            <div class="input-group mb-3">
                              <input
                                type="text"
                                name="state"
                                class="form-control"
                                onChange={handleChange}
                                value={state}
                                placeholder="State"
                              />
                            </div>
                            {errors.state && (
                              <span className={styles.errorMsg}>
                                {errors.state}
                              </span>
                            )}
                          </div>
                          <div className={styles.btn}>
                            <button type="submit" class="btn btn-primary">
                              <BookmarksOutlinedIcon />
                              Continue payment
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </Box>
              </Modal>
            </div>
            <Footer />
          </div>
      </div>
    </>
  );
}
