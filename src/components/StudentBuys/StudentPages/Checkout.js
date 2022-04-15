import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import ReactDOM from 'react-dom'; 
import {Link, useParams, useNavigate} from 'react-router-dom';
import './StudentBuy.css'; 




function Checkout() {

    const navigate = useNavigate(); 
    const[loading, setLoading] = useState(true);
    const[Cart, setCart] = useState([]);
    const[errors, setError] = useState([]);
    const[deliverycount, setDeliveryCount] = useState([]);

    const [StudentDetails, setStudentDetials] = useState({
        firstname: '', 
        lastname:'',
        phoneNo:'',
        email:'',
        address:'',
        city:'',
        postcode:'', 
    }); 

    var totalPrice = 0; 
   

    useEffect(() => { 

        let isMounted = true; 

        axios.get(`/api/view-cart`).then(res=> { 
            if (isMounted) { 

                if(res.data.status === 200) 

                {
                    setCart(res.data.cart); 
                    setStudentDetials(res.data.user); 
                    setLoading(false); 
                   
                } else if (res.data.status === 401) {

                    navigate('/'); 
                    swal("Warning", res.data.message, "warning")
                }
            }
        }); 
        return () => { 
            isMounted = false 
        };

    }, [navigate]);


    const handleInput = (e) => { 
        e.persist();
        setStudentDetials({...StudentDetails, [e.target.name]: e.target.value}); 


    }


    var paypal_data = { 
        firstname: StudentDetails.firstname,
        lastname: StudentDetails.lastname,
        phoneNo: StudentDetails.phoneNo,
        email: StudentDetails.email,
        address: StudentDetails.address,
        city: StudentDetails.city,
        postcode: StudentDetails.postcode,
        payment_type: 'Paypal',  
        payment_id: '', 
    } 

    //paypal functionality
    const PaypalButton = window.paypal.Buttons.driver("react", {React, ReactDOM}); 
    const createOrder = (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                //change value back to totalprice for real application, to test application use 0.1
                // value: totalPrice,
                value: '0.1', 
              },
            },
          ],
        });
      };
      const onApprove = (data, actions) => {
          //check all information about the order being processed. (e.g. quantity, payment cost/id etc)
          //save the details into the database
          return actions.order.capture().then(function(details) {
              console.log(details); 
              //get the details id from paypal and stores it as payment_id in database
              paypal_data.payment_id = details.id; 

              axios.post(`/api/place-order`, paypal_data).then(res => { 

                if(res.data.status === 200) { 
                    //swal("Order Placed Successfully", res.data.message, "success"); 
                    setError([]); 
                    navigate('/student-buy'); 
                    window.location.reload(false);
                } else if (res.data.status === 422) { 
    
                    swal("Fields are missing or do not meet constraits", "", "error"); 
                    setError(res.data.errors); 
                }
            }); 


        })
      };


    const placeOrder = (e, payment_type) => { 
        e.preventDefault(); 

        var data = { 
            firstname: StudentDetails.firstname,
            lastname: StudentDetails.lastname,
            phoneNo: StudentDetails.phoneNo,
            email: StudentDetails.email,
            address: StudentDetails.address,
            city: StudentDetails.city,
            postcode: StudentDetails.postcode,
            payment_type: 'Cash on delivery',  
            payment_id: '', 
        } 


        switch (payment_type) {

        case 'cod' : 

        axios.post(`/api/place-order`, data).then(res => { 

            if(res.data.status === 200) { 
                swal("Order Placed Successfully", res.data.message, "success"); 
                setError([]); 
                navigate('/student-buy'); 
            } else if (res.data.status === 422) { 

                swal("Fields are missing or do not meet constraits", "", "error"); 
                setError(res.data.errors); 

            }

        }); 
        break; 

        case 'paypal': 
        axios.post(`/api/validate-info`, data).then(res=> { 
            if(res.data.status === 200) { 
                setError([]);
      
   
            } else if (res.data.status === 422) { 
                swal('Fields are missing or do not meet constraits', "", "error"); 
                setError(res.data.errors);
            }

        })
        break; 

    }

    }


    // const delivery = (count) => { 

    //     let isMounted = true; 

    //     if (isMounted) { 

    //         setDeliveryCount(...deliverycount, count); 

    //     }

    //     return () => { 
    //         isMounted = false 
    //     };

    // }


    function getArrayMax(array){
        return Math.max.apply(null, array);
     }




    if (loading) { 
        return  <div class="loader">Loading...</div>
    }


 
    var totalPrice = 0; 
    var checkout = ''; 
    var delivery = []; 
    var maxdelivery = ''; 
    if(Cart.length > 0) { 

       checkout = <div> 

<div className="row">
                <div className="col-md-6">
                    <table className='table border-dark'>
                        <thead>
                            <tr>
                                <th width="50%">Product</th>
                                <th>Price</th>
                                <th>Quantity </th>
                                <th>Total</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Cart.map((item, i) => {
                                if (item.product_type == 'adminproduct') { 

                                    delivery.push(item.product.delivery); 


                                totalPrice += item.product.saleprice > 0 ? item.product_quantity * item.product.saleprice : item.product_quantity * item.product.price

                         return (
                            <tr key = {i}>
                                <td> <img src={`http://localhost:8000/${item.product.image}`} alt={item.product.name} width='100px' height='100px'/> 
                                {item.product.name}
                               </td>
                                <td> {item.product.saleprice > 0 ? <div className='price-font'>£{item.product.saleprice} </div>: <div className='price-font'>£{item.product.price} </div> }</td>
                                <td>{item.product_quantity}</td>
                                <td> {item.product.saleprice > 0 ? <div className='price-font'>£{item.product_quantity * item.product.saleprice}</div> : <div className='price-font'>£{item.product_quantity * item.product.price}</div> }</td>
                                </tr>
                            )
                         } else { 

                            delivery.push(item.studentproduct.delivery); 
                          
                            totalPrice += item.studentproduct.price * item.product_quantity 
                            return (
                               <tr key = {i}>
                                   <td> <img src={`http://localhost:8000/${item.studentproduct.image}`} alt={item.studentproduct.name} width='100px' height='100px'/>
                                   {item.studentproduct.name}
                                  </td>
                                   <td>£{item.studentproduct.price}</td>
                                   <td>{item.product_quantity}</td>
                                   <td>£{item.product_quantity * item.studentproduct.price}</td>
                                   </tr>
                               )

                         }
                            })}
                            <tr>

                                <td colSpan="2" className='text-end fw-bold'>Total</td>
                                <td colSpan="2" className='text-end fw-bold'>£{totalPrice}</td>
                                
                            </tr>
                                 
                            </tbody>
                  
                    </table>
              
                    <h4 className='total-delivery-date'>To be delivered in: {maxdelivery = getArrayMax(delivery)} days</h4>

                </div>

                
                <div className="col-md-5">
                    <div className="card card-style">
                        <div className="card-header">
                            <h4>Student Details</h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <label htmlFor="firstname">First Name:</label>
                                        <input type="text" name="firstname" className='form-control' onChange={handleInput} value = {StudentDetails.firstname} />
                                        <small className='text-danger'>{errors.firstname}</small>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <label htmlFor="phone">Last Name:</label>
                                        <input type="text" name="lastname" className='form-control' onChange={handleInput} value = {StudentDetails.lastname} />
                                        <small className='text-danger'>{errors.lastname}</small>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <label htmlFor="phone">Phone Number:</label>
                                        <input type="text" name="phoneNo" className='form-control' onChange={handleInput} value = {StudentDetails.phoneNo} />
                                        <small className='text-danger'>{errors.phoneNo}</small>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <label htmlFor="email">Email Address:</label>
                                        <input type="text" name="email" className='form-control' onChange={handleInput} value = {StudentDetails.email} />
                                        <small className='text-danger'>{errors.email}</small>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group mb-3">
                                        <label htmlFor="address">Full Address:</label>
                                        <input type="text" name="address" className='form-control' onChange={handleInput} value = {StudentDetails.address} />
                                        <small className='text-danger'>{errors.address}</small>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <label htmlFor="city">City:</label>
                                        <input type="text" name="city" className='form-control' onChange={handleInput} value = {StudentDetails.city} />
                                        <small className='text-danger'>{errors.city}</small>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <label htmlFor="post">Post Code:</label>
                                        <input type="text" name="postcode" className='form-control' onChange={handleInput} value = {StudentDetails.postcode} />
                                        <small className='text-danger'>{errors.postcode}</small>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group text-end">
                                        <button type='button' className='btn btn-success mx-1' onClick={(e)=>  placeOrder(e, 'cod')}>Place Order</button>
                                        <button type='button' className='btn btn-dark mx-1' data-bs-toggle="modal" data-bs-target="#paypalModal" onClick={(e) => placeOrder(e, 'paypal')}>Paypal</button>
                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>

         

       </div> 
    }
    else { 

        checkout = <div>
        <div className="card card-body py5 text-center shadow-sm">
            <h4>Your Essentials Cart is Empty</h4>
        </div>
        </div>

       }

    return (
   
<>
<div class="modal fade in" id="paypalModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Pay with Paypal</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <hr/> 
                <PaypalButton
                createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={(data, actions) => onApprove(data, actions)}
                />
            </div>
            </div>
        </div>
</div>


    <div className="py-3 details-nav-style">
        <div className="container">
            <h6> Home / Checkout </h6>
        </div>
    </div>

<div className='checkout-container'>

    <div className="py-4">
        <div className="container">
            {checkout}
            
        </div>
    </div>
</div>
</>

    ) 
}

export default Checkout;
