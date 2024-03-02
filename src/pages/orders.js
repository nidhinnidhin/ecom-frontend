import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from "@/styles/Orders.module.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import RegisterPopUp from "../components/register-popup";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function Orders() {
  const [datas, setDatas] = useState([])
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      axios
        .get("http://13.235.209.32/cart/cart-checkout-list/", {
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
  return (
    <>
      <div>
        <Navbar />
        <div className={styles.titleWrapper}>
          <span className={styles.title}>Your Orders({datas.length})</span>
        </div>
        <div className={styles.container}>
          <TableContainer className={styles.wrapper} component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              {datas.map((data) =>
                data.varient.types.map((data1) => {
                  return (
                    <TableBody key={data.id}>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Link
                            href={`fashionproduct/${data.product.id}?variantId=${data.varient.id}&typeId=${data.types.id}`}
                          >
                            <Image
                              src={data1.images.mainImage}
                              alt="image"
                              width={100}
                              height={100}
                              className={styles.image}
                            />
                          </Link>
                        </TableCell>
                        <TableCell align="left">{data.varient.name}</TableCell>
                        <TableCell align="left">
                          {data.varient.price * data.count} ₹
                        </TableCell>
                        <TableCell align="left">{data.count} Qty</TableCell>
                        <TableCell className={styles.status} align="right">
                          {data.delivery_status}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  );
                })
              )}
            </Table>
          </TableContainer>
        </div>
        <Footer />
      </div>
    </>
  );
}
