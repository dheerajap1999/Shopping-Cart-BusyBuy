import React, { useEffect, useState } from 'react';
import {Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faCartShopping, faTruck, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from "react-toastify";
import {useDispatch,useSelector} from 'react-redux'
import { removeFromCart, increaseQuantity, decreaseQuantity, orderCart } from '../redux/reducers/productReducer';

import 'react-toastify/dist/ReactToastify.css';
function AddToCart() {
  const cartList = useSelector(state => state.product.cartList);
  const dispatch = useDispatch();
  const [total, setTotal] =useState(0);

  useEffect(()=>{
    let totalPrice = 0;
    cartList.forEach(item => {
      totalPrice += item.ProductPrice * item.ProductQuantity;
    });
    setTotal(totalPrice);
},[cartList]);

  
  function increaseProduct(e,product) {
    e.preventDefault();
    dispatch(increaseQuantity(product));
  }

  function decreaseProduct(e,product) {
    e.preventDefault();
    if (product.ProductQuantity > 1) {
        dispatch(decreaseQuantity(product));
    }
  }

  function removeCart(e,product) {
    e.preventDefault();
    dispatch(removeFromCart(product));
    toast.info(`${product.ProductName} removed from cart`)
  }
  
  
  function handelOrder(e,cartList){
    e.preventDefault();
    if (cartList.length >0){
      dispatch(orderCart(cartList))
      toast.success("order placed Successfully")
    }else{
      toast.warning("Please select any product")
    }
  }

  return (
    <>
    <h2 className='text-center'>Items in Cart</h2>
    <div className="container d-flex justify-content-between mb-3">
        <div className='d-flex justify-content-start'><h3>Total Price:</h3> &nbsp;<h3> {total} </h3> </div>
       <button className='btn btn-success fw-bold'> <Link to={'/myorder'} onClick={(e)=>(handelOrder(e,cartList))} style={{color:'white', textDecoration:'none'}}> Place Order </Link> <FontAwesomeIcon icon={faTruck} /> </button>
    </div>

       <div className='container d-flex bg-light'>
        <div className="row row-cols-1 row-cols-md-4 g-4">
            {cartList.map((product, index) => {
                return (
                    <div className="col" style={{width:'280px'}} key={index}>
                        <div className="card shadow">
                            <img src={product.ProductLink} className="card-img-top img-fluid"style={{ height: "250px" }} alt={`${product.ProductName}-image`} />
                            <div className="card-body bg-light ">
                                <p className="card-text text-center fw-bold fs-5">{product.ProductName}</p>
                                <div className='d-flex justify-content-between'>
                                <h5 className="card-title">Rs: {product.ProductPrice}</h5>
                                <div className='d-flex justify-content-between'>
                                <button className='btn btn-sm border' onClick={(e)=>decreaseProduct(e,product)}><FontAwesomeIcon icon={faMinus}/></button> &nbsp;<h5>{product.ProductQuantity}</h5> &nbsp;<button onClick={(e)=>increaseProduct(e,product)} className='btn btn-sm border'><FontAwesomeIcon icon={faPlus} /></button>
                                </div>
                                </div>
                                <button onClick={(e)=>removeCart(e,product)} className='btn btn-danger w-100 mt-2'> <Link style={{color:'white',textDecoration: 'none'}} to={'/addToCart'}> Remove from cart </Link><FontAwesomeIcon icon={faCartShopping} /></button>
                            </div>
                        </div>
                    </div>
                )
            })}
            </div>
        </div>
        <ToastContainer />
    </>
  )
}

export default AddToCart