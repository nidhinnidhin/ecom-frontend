import Navbar from "./components/navbar";
import Footer from "./components/footer";
import styles from "@/styles/FashionProducts.module.css";
import Image from "next/image";
import Link from "next/link";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import axios from 'axios';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export async function getServerSideProps(context) {
  const res = await fetch(
    "http://localhost:8000/fashionproduct/fashionproductlist/"
  );
  const datas = await res.json();

  return {
    props: {
      posts: datas,
    },
  };
}

export default function FashionProductPage({ posts }) {
  // console.log(posts);
  const [search, setSearch] = useState({
    searchValue: "",
    productList: [],
  });
  const [products, setProducts] = useState(posts)
  const changeHandler = (e) => {
    setSearch({
      searchValue: e.target.value,
    });
    var searchValue = e.target.value.replace(/\s+/g, "+");

    axios
      .get("http://localhost:8000/fashionproduct/search/?search=" + searchValue)
      .then((res) => {
        setProducts(res.data)
        console.log(res.data)
      });
    console.log(searchValue);
  };
  return (
    <>
      <div className={styles.pageContainer}>
        <Navbar />
        <div className={styles.pageTitleContainer}>
          <h3 className={styles.title}>FASHION PRODUCTS</h3>
          <Search className={styles.search}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={changeHandler}
            />
          </Search>
        </div>
        <div className={styles.pageWraper}>
          {products?.map((product) =>
            product.varients.map((item) =>
              item.types.map((item1) => (
                <div class="card" id={styles.pageCard}>
                  <Link href={`fashionproduct/${product.id}`}>
                    <Image
                      src={item1.images.mainImage}
                      alt="image"
                      width={220}
                      height={200}
                    />
                  </Link>
                  <div class="card-body">
                    <h5 class="card-title">{product.name}</h5>
                    <p class="card-text">{item.description}</p>
                    <p class="card-text">{item.price}</p>
                  </div>
                </div>
              ))
            )
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}
