import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import {Link, useParams, useNavigate} from 'react-router-dom';
import './StudentBuy.css';



function Cart() {

    const navigate = useNavigate(); 
    const[loading, setLoading] = useState(true);
    const[Cart, setCart] = useState(true);
    //const [refresh, setRefresh] = useState(false); 
    
    useEffect(() => { 

        let isMounted = true; 

        axios.get(`/api/view-cart`).then(res=> { 
            if (isMounted) { 

                if(res.data.status === 200) 

                {
                    setCart(res.data.cart); 
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

    
    //checks which cart id was selected to be incremented or decremented in quantity 
    //change the total price in response to a quantity change
    const handleDecrement = (id) => { 
        setCart(cart => 
            cart.map( (item) => 
            id === item.id ? {...item, product_quantity: item.product_quantity - (item.product_quantity > 1 ? 1:0)} : item
           
            )
        )
        updateQuantity(id, "dec"); 
    }

    const handleIncrement = (id, stock) => { 
        setCart(cart => 
            cart.map( (item) => 
            id === item.id ? {...item, product_quantity: item.product_quantity + (item.product_quantity < stock ? 1:0)} : item
            )  
        )

        updateQuantity(id, "inc", stock); 
    }

    //the type parameter is used in laravel to know if it should update the cart item by incrementing or decrementing 
    function updateQuantity(id, type, stock) { 

        axios.put(`/api/update-cart-quantity/${id}/${type}/${stock}`).then(res=> { 
        
        }); 
    }


    const deleteItem = (e, id, quantity, price) => { 

       e.preventDefault(); 

        //the specific delete button which the student has clicked is stored.  
        const clicked = e.currentTarget;
        //changes the text of the button that was clicked from delete to removing
        clicked.innerText = "Removing"; 

        axios.delete(`/api/delete-cart-item/${id}`).then(res => { 

            if(res.data.status === 200) { 
                
                
                //once the row has been deleted from the database, the closest element which is "tr" is also deleted so that an empty table row is not shown.  
                clicked.closest("tr").remove(); 
                window.location.reload(false);
               
              

            } else if (res.data.status === 404) { 
                swal("Error", res.data.message, "error");
                clicked.innerText = "Remove"; 
            }

        })

        
    }

   

    if (loading) 
    {
        return <div class="loader">Loading...</div>

    } 



    var totalPrice = 0; 
    var cart = ''; 
    if(Cart.length > 0 ) { 

       cart = <div className="table-responsive">
        <table className="table table-bordered table-dark">
            <thead>
                <tr>
                    <th>Seller</th>
                    <th>Image</th>
                    <th>Product</th>
                    <th className="text-center">Price</th>
                    <th className="text-center">Quantity</th>
                    <th className="text-center">Total Price</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {Cart.map((item, i) => {
                    {console.log(item.product_type)}
                    if (item.product_type == 'studentproduct') { 
                    totalPrice += item.studentproduct.price * item.product_quantity 
                    return (
                <tr key = {i}>
                    <td>Student: {item.studentproduct.student_name}</td>
                  <td width="20%">
                      <img src={`http://localhost:8000/${item.studentproduct.image}`} alt={item.studentproduct.name} width='100px' height='100px'/>
                    </td>  
                    <td>{item.studentproduct.name}</td>
                    <td width="15%" className="text-center">£{item.studentproduct.price}</td>
                    <td width="15%">
                        <div className="input-group">
                        <button type='button' onClick={() => handleDecrement(item.id)} className="input-group-text">-</button>
                        <div className="form-control text-center">{item.product_quantity}</div>
                         <button type ='button'  onClick={() => handleIncrement(item.id, item.studentproduct.stock)} className="input-group-text">+</button>
                        </div>
                        </td>
                        
                            <td width="15%" className="text-center">£{(item.studentproduct.price * item.product_quantity).toFixed(2)}</td>
                            
                            <td width="10%">
                                <button type='button' className="btn btn-danger btn-sm" onClick={(e) => deleteItem(e, item.id, item.product_quantity, item.studentproduct.price)}>
                                    Remove
                                </button>
                            </td>
                </tr>

                )
                } else  { 
                    totalPrice += item.product.saleprice > 0 ? item.product_quantity * item.product.saleprice : item.product_quantity * item.product.price
                    return (
                <tr key = {i}>
                    <td>Admin</td>
                  <td width="20%">
                      <img src={`http://localhost:8000/${item.product.image}`} alt={item.product.name} width='100px' height='100px'/>
                    </td>  
                    <td>{item.product.name}</td>
                    <td width="15%" className="text-center"> {item.product.saleprice > 0 ? <div className='price-font'>£{item.product.saleprice}</div> :  <div className='price-font'>£{item.product.price}</div>} </td>
                    <td width="15%">
                        <div className="input-group">
                        <button type='button' onClick={() => handleDecrement(item.id)} className="input-group-text">-</button>
                        <div className="form-control text-center">{item.product_quantity}</div>
                         <button type ='button'  onClick={() => handleIncrement(item.id, item.product.stock)} className="input-group-text">+</button>
                        </div>
                        </td>
                        
                            <td width="15%" className="text-center"> {item.product.saleprice > 0 ? <div className='price-font'> £{(item.product.saleprice * item.product_quantity).toFixed(2)}</div> :  <div className='price-font'> £{(item.product.price * item.product_quantity).toFixed(2)}</div> }</td>
                            
                            <td width="10%">
                                <button type='button' className="btn btn-danger btn-sm" onClick={(e) => deleteItem(e, item.id, item.product_quantity, item.product.price)}>
                                    Remove
                                </button>
                            </td>
                </tr>

                )

                   
                }
                    
            })}
            </tbody>
        </table>
        
        <div className="col-md-8">
                            <div className="col-md-4">
                                <div className="card card-body mt-3 card-style">
                                    <h4>Total Cart Price:
                                        <span className="float-end">£{(totalPrice).toFixed(2)}</span>
                                    </h4>
                                    <hr />
                                    <Link to = '/student-buy/checkout' className='btn btn-background-circle-black'>Checkout</Link>
                                </div>
                            </div>
                        </div>
       
    </div>

    } else { 
        cart = <div>
            <div className="card card-body py5 text-center shadow-sm card-style">
                <h4>Your Essentials Cart is Empty</h4>
            </div>
            </div>

    }



  return  (

            <>
            <div className="py-3 details-nav-style">
                <div className="container">
                    <h6> Home / Cart </h6>
                </div>
            </div>
            <div className='cart-container'>

            <div className="py-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">

                        {cart}
                         
                        </div>

            
                    </div>
                </div>
            </div>
        </div>
        </>








  )
}

export default Cart;
