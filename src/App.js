import Navbar from "./components/Navbar";
import AddToCart from "./pages/AddToCart";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import Login from "./pages/Login";
import MyOrder from "./pages/MyOrder";
import SignUp from "./pages/Signup";
import {Routes, Route, BrowserRouter } from 'react-router-dom';
import confStore from "./store";
function App() {
  return (
  <>
    <Provider store={confStore}>
    <BrowserRouter basename="/Shopping-Cart-BusyBuy" >
    <Routes>
      <Route path="/" element={<Navbar />} >
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/addToCart" element={<AddToCart />}/>
        <Route path="/myorder" element={<MyOrder />}/>
      </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
  </>
  );
}
 
export default App;
