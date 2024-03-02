import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import styles from "@/styles/Navbar.module.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartCount } from "../utils/cartUtils";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import logo from "../static/images/removed-logo.png";
import Link from "next/link";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

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
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 3px",
  },
}));

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState({
    searchValue: "",
    productList: [],
  });
  const [accessToken, setAccessToken] = useState("");
  const [isProducts, setIsProducts] = useState("");
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const handleClick = () => {
    axios
      .post("http://13.235.209.32/account/logout/blacklist/", {
        refresh_token: localStorage.getItem("refresh_token"),
      })
      .then((res) => {
        localStorage.removeItem("access_token", res.data.access);
        localStorage.removeItem("refresh_token", res.data.refresh);
        router.push("/login");
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const cart = () => {
    router.push("/cart");
  };
  const Account = () => {
    router.push("/edit-account");
    handleMenuClose();
  };
  const Whishlist = () => {
    router.push("/whishlist");
    handleMenuClose();
  };
  const Orders = () => {
    router.push("/orders");
    handleMenuClose();
  };

  const dispatch = useDispatch();
  const cartCount = useSelector((state) => state.cartCount.count);

  useEffect(() => {
    dispatch(fetchCartCount());
    setAccessToken(localStorage.getItem("access_token"));
  }, [dispatch]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const changeHandler = (e) => {
    setSearch({
      searchValue: e.target.value,
    });
    var searchValue = e.target.value.replace(/\s+/g, "+");
    setIsProducts(searchValue);

    axios
      .get("http://13.235.209.32/fashionproduct/search/?search=" + searchValue)
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
      });
    console.log(searchValue);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={Account}>My account</MenuItem>
      <MenuItem onClick={Whishlist}>My whishlist</MenuItem>
      <MenuItem onClick={Orders}>My orders</MenuItem>
      {accessToken && <MenuItem onClick={handleClickOpen}>Log out</MenuItem>}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Logout"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {accessToken && (
            <Button onClick={handleClick} color="error" autoFocus>
              Logout
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen} className={styles.profileMenu}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p className={styles.userProfile}>Profile</p>
      </MenuItem>
    </Menu>
  );

  const SearchProducts = () => {
    return (
      <div>
        <div className={styles.pageWraper}>
          {products?.map((product, index) =>
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
                    <h5 class="card-title" id={styles.cardTitle}>
                      {item.name}
                    </h5>
                    <p class="card-text" id={styles.cardDescription}>
                      {item.description}
                    </p>
                    <p class="card-text" id={styles.cardPrice}>
                      {item.price}
                    </p>
                  </div>
                </div>
              ))
            )
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <Box className={styles.nav} sx={{ flexGrow: 1 }}>
        <AppBar className={styles.navbar} style={{color:"black", background:"#fff"}} position="static">
          <Toolbar>
            <Link href="/">
              <Image
                src={logo}
                alt="image"
                width={100}
                height={50}
                className={styles.logo}
              />
            </Link>
            <Search className={styles.search}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                id={styles.search_input}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={changeHandler}
              />
            </Search>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="black"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="black"
              >
                <MoreIcon />
              </IconButton>
            </Box>
            <Box>
              <IconButton onClick={cart} aria-label="cart">
                <StyledBadge badgeContent={cartCount} color="secondary">
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
            </Box>
          </Toolbar>
          {isProducts.length != 0 && <SearchProducts />}
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    </>
  );
}
