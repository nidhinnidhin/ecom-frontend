import { setCartCount } from "../redux/cartCountSlice";

export const fetchCartCount = () => async (dispatch) => {
  console.log("total-count")
  try {
    const response = await fetch('http://localhost:8000/cart/api/cart/count/', {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("access_token"),
        "Content-Type": "application/json",
      },
    }); 
    const data = await response.json();
    console.log("total-count", data)
    dispatch(setCartCount(data.count));
  } catch (error) {
    console.error('Error fetching cart count:', error);
  }
};
