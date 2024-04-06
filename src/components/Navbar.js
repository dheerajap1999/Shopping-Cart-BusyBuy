import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShop, faUserPlus,faRightToBracket,  faCartArrowDown, faCartShopping } from '@fortawesome/free-solid-svg-icons'
// import styles from './CSS/Navbar.module.css';
import { Outlet ,NavLink, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { checkLogin } from '../redux/reducers/userReducer'
import {clearCart} from '../redux/reducers/productReducer'

function Navbar() {
  const isLoggedIn = useSelector(state=> state.user.isLoggedIn)
  // const cartList = useSelector(state => state.product.cartList);
  // const userData = useSelector(state=>state.user.userData);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handelLogout(e){
    e.preventDefault();
    dispatch(checkLogin("false"));
    dispatch(clearCart());
    navigate('/signup');
  }
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid d-flex">
            <a className="justify-content-between navbar-brand fw-bold"> <FontAwesomeIcon icon={faShop} style={{color: "#B197FC",textDecoration: 'none'}} /> <NavLink to={'/'} style={{textDecoration: 'none'}} > Busy Buy </NavLink></a>
            <div>
                <button className='btn btn-primary'> <NavLink style={{color:'white',textDecoration: 'none'}} to={'/myorder'}> My Order </NavLink> <FontAwesomeIcon icon={faCartArrowDown} /> </button>
                <button className='btn btn-primary ms-4 me-2'> <NavLink style={{color:'white',textDecoration: 'none'}} to={'/addToCart'}> Cart </NavLink> <FontAwesomeIcon icon={faCartShopping} /> </button>
                {isLoggedIn==="true" ? (
                <button  className='btn ms-4 me-2 btn-danger' onClick={(e)=>handelLogout(e)}> 
                     Logout
                    <FontAwesomeIcon icon={faRightToBracket} />
                </button>
            ) : 
            <button className='btn ms-4 me-2 btn-primary'> 
                    <NavLink style={{color:'white',textDecoration: 'none'}} to={'/login'}> Login </NavLink> 
                    <FontAwesomeIcon icon={faRightToBracket} />
                </button>            
            }
            <button className={isLoggedIn=== "true"? 'd-none' : 'btn btn-primary ms-4 me-2'}> <NavLink style={{color:'white',textDecoration: 'none'}} to={'/signup'}> Sign Up  </NavLink> <FontAwesomeIcon icon={faUserPlus} /></button>
            </div>
        </div>
    </nav>
    < ToastContainer />
    <Outlet/>
    </>
  )
}

export default Navbar