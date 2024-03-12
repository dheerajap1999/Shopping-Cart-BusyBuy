import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setUser, checkLogin } from '../redux/reducers/userReducer';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Signup() {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  function handleChange(e) {
    const { id, value } = e.target;
    setUserData(prevUserData => ({
      ...prevUserData,
      [id]: value
    }));
  }

  function handelUserRegister(e){
    e.preventDefault();
    dispatch(setUser(userData));
    dispatch(checkLogin("true"));
    setUserData({});
    if (document.getElementById("username").value !== "" && document.getElementById("userEmail").value !== "" &&
    document.getElementById("userPassword").value !== ""){
      navigate('/')
      document.getElementById("username").value = "";
      document.getElementById("userEmail").value = "";
      document.getElementById("userPassword").value = "";
    }
    else(toast.error("Enter the user details first"))
  }

  return (
    <>
    <h2 className='text-center bg-light'>Sign-Up Page</h2>
    <div className='d-flex  justify-content-center '> 
        <form className='card shadow-sm p-3  mt-5' onSubmit={(e)=>handelUserRegister(e)} style={{'width':'35rem'}}>
        <div className="mb-3">
                <label htmlFor="username" className="form-label fw-bold">Name</label>
                <input type="text" className="form-control" value={userData.username} onChange={handleChange} id="username"/>
            </div>
            <div className="mb-3">
                <label htmlFor="userEmail" className="form-label fw-bold">Email address</label>
                <input type="email" className="form-control"  onChange={handleChange} value={userData.useEmail} id="userEmail" aria-describedby="emailHelp"/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="userPassword" className="form-label">Password</label>
                <input type="password" className="form-control" value={userData.userPassword} onChange={handleChange} id="userPassword"/>
            </div>
            <button type="submit" className="btn btn-primary fw-bold">Create User</button>
        </form>
    </div>
    <ToastContainer />
  </>
  )
}

export default Signup