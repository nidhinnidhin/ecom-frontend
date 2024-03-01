import * as React from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import styles from "@/styles/FashionProducts.module.css";
import Link from "next/link";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Pagination } from "@mui/material";
import Rating from "@mui/material/Rating";

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

const PriceFilterDropdown = styled("select")(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  right: theme.spacing(2),
}));

export default function CategoryProductsList() {
  const router = useRouter();
  const { id } = router.query;
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 2;

  const beDomain = "http://localhost:8000";

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await axios.get(
          `${beDomain}/fashionproduct/api/product/category/${id}/`
        );
        setProducts(response.data);
        setFilteredProducts(response.data);
        console.log("data", response.data);
      } catch (error) {
        console.error("Error fetching products by category:", error);
      }
    };

    if (id) {
      fetchProductsByCategory();
    }
  }, [id]);

  useEffect(() => {
    filterProductsByPriceRange(selectedPriceRange);
  }, [selectedPriceRange]);

  const filterProductsByPriceRange = (priceRange) => {
    if (!priceRange) {
      setFilteredProducts(products);
      return;
    }

    const [minPrice, maxPrice] = priceRange.split("-").map(Number);
    const filtered = products.filter((product) => {
      const minProductPrice = Math.min(
        ...product.varients.map((variant) => variant.price)
      );
      return minProductPrice >= minPrice && minProductPrice <= maxPrice;
    });
    setFilteredProducts(filtered);
  };

  const handlePriceRangeChange = (event) => {
    const range = event.target.value;
    setSelectedPriceRange(range);
  };

  const handleChangePage = (event, page) => {
    setCurrentPage(page);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <>
      <div className={styles.pageContainer}>
        <Navbar />
        <div className={styles.pageTitleContainer}>
          {filteredProducts.map((items, index) => (
            <h3 key={index} className={styles.title}>{items.category.name}</h3>
          ))}
          <select
            value={selectedPriceRange}
            onChange={handlePriceRangeChange}
            className={styles.dropdown}
          >
            <option value="">Filter by price</option>
            <option value="100-1000">100 to 1000</option>
            <option value="1000-10000">1000 to 10000</option>
            <option value="10000-100000">10000 to 100000</option>
            <option value="100000-500000">100000 to 500000</option>
          </select>
        </div>
        {currentProducts.length != 0 ? (
          <div className={styles.pageWraper}>
            {currentProducts.map((product, index) =>
              product.varients.map((item) =>
                item.types.map((item1) => {
                  console.log(item1);
                  return (
                    <div key={item.id} class="card" id={styles.pageCard}>
                      <Link href={`/fashionproduct/${product.id}?variantId=${item.id}&typeId=${item1.id}`}>
                        <Image
                          src={`${beDomain}${item1.images.mainImage}`}
                          alt="image"
                          className={styles.mainImage}
                          width={200}
                          height={200}
                        />
                      </Link>
                      <div class="card-body">
                        <div>
                      <Link
                          href={`/fashionproduct/${product.id}?variantId=${item.id}&typeId=${item1.id}`}
                        >
                          <span className={styles.availabeVariation}>
                            {product.varients.length}+ Variations available
                          </span>
                        </Link>
                        </div>
                        <h5 className={styles.name}>{item.name}</h5>
                        <Rating name="read-only" className={styles.rating} value={item.rating} readOnly />
                        <span className={styles.starRating}>{item.rating}*</span>
                        <p className={styles.price}>{item.price}</p>
                        <p id={styles.cardProductDescription} class="card-text">
                          {item.description}
                        </p>
                        ...
                      </div>
                    </div>
                  );
                
                })
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
            count={Math.ceil(filteredProducts.length / productsPerPage)}
            page={currentPage}
            onChange={handleChangePage}
            variant="outlined"
            shape="rounded"
            color="primary"
          />
        </div>
        <Footer />
      </div>
    </>
  );
}
