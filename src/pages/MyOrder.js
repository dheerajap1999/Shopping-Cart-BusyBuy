import React from 'react';
import { useSelector } from 'react-redux';

function MyOrder() {
    const myOrderList = useSelector(state => state.product.orderList);

    // Calculate total price
    const totalPrice = myOrderList.reduce((total, item) => {
        return total + (item.ProductQuantity * item.ProductPrice);
    }, 0);

    return (
        <>
            <table className="table table-info table-striped table-hover table-bordered">
                <thead className='table-primary'>
                    <tr>
                        <th className='fw-bold' scope="col">Sr No.</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Product Quantity</th>
                        <th scope="col">Product Price</th>
                        <th scope="col">Product Total</th>
                    </tr>
                </thead>
                <tbody>
                    {myOrderList.map((item, index) => (
                        <tr key={index}>
                            <td className='fw-bold'>{index + 1}</td>
                            <td className='fw-bold'>{item.ProductName}</td>
                            <td className='fw-bold'>{item.ProductQuantity}</td>
                            <td className='fw-bold'>{item.ProductQuantity} * {item.ProductPrice}</td>
                            <td className='fw-bold'>{item.ProductPrice * item.ProductQuantity}</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="4" className='fw-bold text-start'>Total</td>
                        <td className='fw-bold'>{totalPrice}</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default MyOrder;
