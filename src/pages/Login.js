import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkLogin } from '../redux/reducers/userReducer';
import { ToastContainer, toast } from 'react-toastify'

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(state=>state.user.userData);
    function handelLoginSubmit(e){
      e.preventDefault();
      const loginEmail = e.target.elements.loginEmail.value;
      const loginPassword = e.target.elements.loginPassword.value;
      // Find user with matching email
      const user = userData.find(user => user.userEmail === loginEmail );

      // Check if user exists and password matches
      if (user && user.userPassword === loginPassword) {
        toast.success('Login successful!');
        dispatch(checkLogin("true"));
        setTimeout(()=>{
          navigate('/');
        },2000)
        // Perform further actions such as navigating to dashboard
      } else {
        toast.error('Invalid email or password');
      }
    }
  return (
  <>
    <h2 className='text-center bg-light'>Login Page</h2>
    <div className='d-flex  justify-content-center '> 
        <form className='card shadow-sm p-3 mt-5' onSubmit={(e)=>handelLoginSubmit(e)} style={{'width':'35rem'}} >
            <div className="mb-3">
                <label htmlFor="userEmail" className="form-label fw-bold">Email address</label>
                <input type="email" className="form-control" id="loginEmail" aria-describedby="emailHelp"/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="userPassword" className="form-label fw-bold">Password</label>
                <input type="password" className="form-control" id="loginPassword"/>
            </div>
            <button type="submit" className="btn btn-primary fw-bold">Submit</button>
        </form>
    </div>
    <ToastContainer />
  </>
  )
}

export default Login