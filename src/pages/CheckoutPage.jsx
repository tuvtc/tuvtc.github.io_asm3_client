// import du lieu va css
import React from "react";
import Navbar from "../components/Navbar";
import { renderPrice } from "../helper/helper";
import "./CheckoutPage.css";
import { useSelector, useDispatch } from "react-redux";
import api from '../api/api'
import { cartActions } from '../redux/cart'
import { useNavigate } from "react-router-dom";

// Component ProdOrd
function ProdOrd(props) {
  const { item } = props
  // Render du lieu cua dofng product
  return (
    <>
      <p className="d-flex gap-2 justify-content-between">
        <span className="fw-semibold">{item.name}</span>
        <span className="text-body-tertiary">{`${renderPrice(item.price)} VND x ${item.quantity}`} </span>
      </p>
      <hr />
    </>
  );
  
}

// Component CheckoutPage
function CheckoutPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [userInfo, setUserInfo] = React.useState({
    fullName: '',
    email: '',
    phone: '',
    address: ''
  })
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = cartItems.reduce(
    (currentTotal, item) => currentTotal + item.price * item.quantity,
    0
  );

  const onChange = (e) => {
    const { name, value } = e.target
    setUserInfo({
      ...userInfo,
      [name]: value
    })
  }
  
  const onPlaceOrder = async () => {
    // Tao data theo state hien tai

    const data = {
      ...userInfo,
      products: cartItems.map(({ _id: product, quantity, price }) => ({
        product,
        quantity,
        price
      })),
      totalBill: totalPrice
    }

    try {
      await api.createOrder(data)
      // Reset cart ve trang thai ban dau
      dispatch(cartActions.RESET_CART())
      alert('Ban da tao order thanh cong! Vui long check email')
      // Redirect qua Home
      navigate('/')
    } catch (e) {
      alert(e.response?.data?.message[0])
    }

  }

// Render du lieu cua all
  return (
    <div className="container">
      <Navbar />
      <div className="cart-banner bg-body-tertiary d-flex justify-content-between align-items-center p-4 text-uppercase fst-italic fw-semibold mb-4">
        <div className="text-black fs-3">Checkout</div>
        <div>
          <span className="text-black">home / cart / </span>
          <span className="text-body-tertiary">checkout</span>
        </div>
      </div>
      <div className="fst-italic">
        <h3 className="text-uppercase">billing details</h3>
        <div className="d-flex gap-3">
          <div className="flex-grow-1">
            <p className="text-uppercase fs-5 my-3">Full name:</p>
            <input
              onChange={onChange}
              name="fullName"
              value={userInfo.fullName}
              className="p-3 w-100"
              type="text"
              placeholder="Enter Your Full Name Here!"
            />
            <p className="text-uppercase fs-5 my-3">Email:</p>
            <input
              onChange={onChange}
              name="email"
              value={userInfo.email}
              className="p-3 w-100"
              type="text"
              placeholder="Enter Your Email Here!"
            />
            <p className="text-uppercase fs-5 my-3">Phone number:</p>
            <input
              onChange={onChange}
              name="phone"
              value={userInfo.phone}
              className="p-3 w-100"
              type="text"
              placeholder="Enter Your Phone Number Here!"
            />
            <p className="text-uppercase fs-5 my-3">address:</p>
            <input
              onChange={onChange}
              name="address"
              value={userInfo.address}
              className="p-3 w-100"
              type="text"
              placeholder="Enter Your Address Here!"
            />
            <p onClick={onPlaceOrder} className="text-white bg-dark p-3 fs-5 checkout-btn mt-3">
              Place order
            </p>
          </div>
          <div className="p-4 bg-body-tertiary">
            <div className="text-uppercase fst-italic">
              <h4 className="py-3">Your order</h4>
              {cartItems.map((item) => {
                return <ProdOrd item={item} />})}
              <p className="d-flex justify-content-between">
                <span className="fw-semibold">Total</span>
                <span className="fs-5">{renderPrice(totalPrice)} VND</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
