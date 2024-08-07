import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin6Line } from "react-icons/ri";
import { decrementQuantity, incrementQuantity, removeFromCart } from '../Slices/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { BuyBook } from '../services/operations/Payment';

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth)

  // console.log(token)
  const user = localStorage.getItem("user")
  const navigate = useNavigate();
  // console.log("Cartitems",cartItems)

  // Calculate total price for each item
  const calculateTotalPrice = (item) => {
    return item.quantity * item.price;
  }


  // Calculate total price for all items
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      return total + calculateTotalPrice(item);
    }, 0);
  }
  // console.log("cartItems",cartItems)
  async function paymenthandler () {
    const books = cartItems.map((book) => book._id)

    const resp = await BuyBook(token, books, user, navigate, dispatch);
    // console.log(resp);
  }
  return (
    <div className="min-h-[500px] px-5">
      <h1 className="text-center mt-5 text-4xl mb-2">Your Bag</h1>
      {cartItems && cartItems.length > 0 ? (
        <div className='lg:py-10 flex justify-between lg:flex-row flex-col gap-4'>
          <div className='lg:w-2/3 w-full shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'>
            {cartItems.map((item, idx) => (
              <div key={idx} className='flex items-center mt-2 border py-2'>
                <div className='lg:w-[120px] w-[190px] h-[150px]'>
                  <img src={item.thumbnail} alt="" className='w-full h-full object-contain' />
                </div>
                <div className='w-full px-5 pt-3 font-medium flex items-center justify-between'>
                  <div>
                    <h2 className='text-xl lg:text-2xl  leading-6 lg:leading-7'>{item.bookName}</h2>
                    <p className='mb-2'>  <b>Author: </b> {item.bookAuthor}</p>
                    <p><b>Availability: </b> {item.bookStock}</p>
                    <p className="text-red-500 text-2xl">{item.price}</p>
                    <div className='flex items-center my-2'>
                      <button className='text-3xl px-[10px] border border-black hover:border-slate-200 hover:bg-slate-200'
                        onClick={() => dispatch(decrementQuantity({ id: item._id }))}>-</button>
                      <p className='mx-3 text-2xl font-bold'>{item.quantity}</p>
                      <button className='text-3xl px-[10px] border border-black hover:border-slate-200 hover:bg-slate-200'
                        onClick={() => dispatch(incrementQuantity({ id: item._id }))}>+</button>
                    </div>

                    <h2 className=''>Total Amount: {calculateTotalPrice(item)}</h2></div>
                  <RiDeleteBin6Line className='text-red-500 text-2xl cursor-pointer' onClick={() => dispatch(removeFromCart(item._id))} />
                </div>
              </div>
            ))}
          </div>
          <div className='relative lg:w-[30%] w-full px-5 py-4 bg-white min-h-[250px] lg:rounded-lg shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'>
            <h1 className="text-center text-3xl mb-5">Order Summary</h1>
            <div className=''>
              {/* <div className='flex justify-between items-center my-5 text-xl'><p>Discount Amount</p> 250</div> */}
              {cartItems.map((item, idx) => (
                <div key={idx}>
                  <div className='flex justify-between items-center text-xl'>
                    <p className=''>{item.bookName}</p>
                    <p>{calculateTotalPrice(item)}</p>
                  </div>

                  <p className='text-base mb-4'>Quantity {item.quantity}</p>
                </div>
              ))}
              <span className='block border border-[#333] w-full mt-5 mb-2'></span>
              <div className='flex justify-between items-center text-xl font-bold'><p>Total Amount</p> {calculateTotalAmount()}</div>

              <button onClick={paymenthandler} className='text-white bg-green-600 hover:bg-green-500 w-full py-3 text-lg rounded mt-6'>
                CheckOut</button>

            </div>
          </div>
        </div>
      ) : (
        <h1 className='text-4xl font-bold text-center mt-20'>Your Bag is Empty </h1>
      )}
    </div>
  )
}

export default Cart;
