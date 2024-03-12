import Navbar from "../components/navbar";
import Footer from "../components/footer";
import styles from "@/styles/FashionProducts.module.css";
import Image from "next/image";
import Link from "next/link";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from "@mui/material";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

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
    "http://13.235.209.32/fashionproduct/fashionproductlist/"
  );
  const datas = await res.json();

  return {
    props: {
      posts: datas,
    },
  };
}

export default function FashionProductPage({ posts }) {
  console.log(posts);
  const [search, setSearch] = useState({
    searchValue: "",
    productList: [],
  });
  const [products, setProducts] = useState(posts);
  const [priceRange, setPriceRange] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;
  const totalPages = Math.ceil(posts.length / productsPerPage);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const handlePriceRangeChange = (event) => {
    const selectedPriceRange = event.target.value;
    setPriceRange(selectedPriceRange);

    if (selectedPriceRange === "") {
      setProducts(products);
    } else {
      const [minPrice, maxPrice] = selectedPriceRange.split("-").map(Number);
      const filteredProducts = posts.filter((product) => {
        const variantPrice = product.varients.reduce(
          (min, variant) => Math.min(min, variant.price),
          Number.MAX_SAFE_INTEGER
        );
        return variantPrice >= minPrice && variantPrice <= maxPrice;
      });
      setProducts(filteredProducts);
    }
  };

  const changeHandler = (e) => {
    setSearch({
      searchValue: e.target.value,
    });
    var searchValue = e.target.value.replace(/\s+/g, "+");

    axios
      .get("http://13.235.209.32/fashionproduct/search/?search=" + searchValue)
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
      });
    console.log(searchValue);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <>
      <div className={styles.pageContainer}>
        <Navbar />
        <div className={styles.pageTitleContainer}>
          <div>
            <h3 className={styles.title}>PRODUCTS</h3>
          </div>
          <div className={styles.dropdownContainer}>
            <select
              value={priceRange}
              onChange={handlePriceRangeChange}
              className={styles.dropdown}
            >
              <option value="">Filter by price</option>
              <option value="100-500">100 to 500</option>
              <option value="500-1000">500 to 1000</option>
              <option value="10000-55000">10000 to 55000</option>
              <option value="100000-500000">100000 to 500000</option>
            </select>
          </div>
        </div>
        {products.length != 0 ? (
          <div className={styles.pageWraper}>
            {currentProducts?.map((product, index) =>
              product.varients.map((item) =>
                item.types.map((item1) => (
                  <div key={product.id} class="card" id={styles.pageCard}>
                    <Link
                      href={`/fashionproduct/${product.id}?variantId=${item.id}&typeId=${item1.id}`}
                    >
                      <div className={styles.imageWrapper}>
                        <Image
                          src={item1.images.mainImage}
                          alt="image"
                          className={styles.mainImage}
                          width={200}
                          height={200}
                        />
                      </div>
                    </Link>
                    <div class="card-body">
                      <Link
                        href={`/fashionproduct/${product.id}?variantId=${item.id}&typeId=${item1.id}`}
                      >
                        <span className={styles.availabeVariation}>{product.varients.length}+ Variations available</span>
                      </Link>
                      
                      <h5 class="card-title" id={styles.cardTitle}>
                        {item.name}
                      </h5>
                      <Rating
                        name="read-only"
                        className={styles.rating}
                        value={item.rating}
                        readOnly
                      />
                      <span className={styles.starRating}>{item.rating}*</span>
                      <p class="card-text" id={styles.cardPrice}>
                        {item.price} ₹
                      </p>
                      <p class="card-text" id={styles.cardDescription}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))
              )
            )}
          </div>
        ) : (
          <div className={styles.noProducts}>
            <h5>No products available</h5>
          </div>
        )}
        <div className={styles.pagination}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChange}
            color="primary"
            variant="outlined"
            shape="rounded"
          />
        </div>
        <Footer />
      </div>
    </>
  );
}
