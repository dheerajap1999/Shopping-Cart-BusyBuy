import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCartShopping, faIndianRupeeSign} from '@fortawesome/free-solid-svg-icons'
import { toast, ToastContainer } from "react-toastify";
import { addToCart } from '../redux/reducers/productReducer';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Home() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const productList = useSelector(state => state.product.productList);
    const isLogIn = useSelector(state=> state.user.isLoggedIn)
    const [prodList, setProdList] = useState([]);
    const [priceRange, setPriceRange] = useState(0);
    
    // Functions for filtering products by price and adding them to cart
    
    function handleRangeSearch(e) {
        e.preventDefault();
        const value = parseFloat(e.target.value); // Convert the input value to a number
        if (!isNaN(value)) {
            // If value is a number, update the price range
            setPriceRange(value);
            const filteredProducts = productList.filter((item) =>
                item.ProductPrice <= value
            );
            setProdList(filteredProducts);
        } else {
            // If value is a string, perform product search
            const searchQuery = e.target.value.toLowerCase();
            const filteredProducts = productList.filter((item) =>
                item.ProductName.toLowerCase().includes(searchQuery)
            );
            setProdList(filteredProducts);
        }
    }
    
    
    
    function handelSubmitCart(e, product) {
        e.preventDefault();
        if (isLogIn==="true") {
            dispatch(addToCart(product));
            toast.success(`${product.ProductName} added to cart`);
        }
        else{
            toast.warn("User need to register !!!");
            setTimeout(() => {
                navigate('/signup');
            }, 2000);
        }
    }

  return (
    <>
    <form className="row g-3">
    <div className="col-3 m-3 ">
        <input className="form-control me-2 " type="search" onChange={handleRangeSearch} placeholder="Search" aria-label="Search"></input>
    </div>
    <div className="col-3">
        <label for="customRange2" className="form-label">Price range <p className='fw-bold'><FontAwesomeIcon icon={faIndianRupeeSign} /> 0 - {priceRange}</p></label>
        <input type="range" className="range fw-bold" min="0" step="500" value={priceRange} onChange={handleRangeSearch} max="50000" id="customRange2"/>
    </div>
    </form>

    <div className='container d-flex'>
        <div className="row row-cols-1 row-cols-md-4 g-4">
            {(prodList.length > 0 ? prodList : productList).map((product, index) => {
                return (
                    <div className="col" style={{width:'280px'}} key={index}>
                        <div className="card shadow">
                            <img src={product.ProductLink} className="card-img-top img-fluid"style={{ height: "250px"}} alt={`${product.ProductName}-image`} />
                            <div className="card-body bg-light ">
                                <p className="card-text text-center fw-bold fs-5">{product.ProductName}</p>
                                <h5 className="card-title">Rs: {product.ProductPrice}</h5>
                                <button onClick={(e)=>handelSubmitCart(e,product)} className='btn btn-success w-100'>  Add to cart <FontAwesomeIcon icon={faCartShopping} /></button>
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

export default Home