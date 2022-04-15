import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import swal from 'sweetalert';
import './Admin.css'; 



function AdminOrderedProduct() {
    
const [orderItems, setOrdersItems] = useState([]); 
const [Loading, setLoading] = useState(true); 
const [quantity, setQuantity] = useState([]); 

const {id} = useParams();


useEffect(() => { 
        

    let isMounted = true; 

    axios.get(`/api/admin-order-items/${id}`).then(res=> {
         
        if (isMounted) { 

            if(res.data.status === 200) 

            {
                setOrdersItems(res.data.adminorders);
                setQuantity(res.data.quantity); 
                setLoading(false); 
               
            } 
        }
    }); 
    return () => { 
        isMounted = false 
    };

   
    



}, [id]);

console.log(id)





var show_order_items = ""; 
if(Loading) {
    
    return <div class="loader">Loading...</div>


} else { 

    var product_status = ''; 



    show_order_items = orderItems.map((item, i) => { 

         return (
             <tr key={i}> 
                 <td>{item.name}</td>
                 <td><img src={`http://localhost:8000/${item.image}`} width="150px" height='150px' alt={item.name} /> </td>
                 <td>{item.quantity}</td>
                 <td> {item.saleprice > 0 ? <div className='price-font'>£{item.saleprice}</div> :  <div className='price-font'>£{item.price}</div> }</td>
                 <td> {item.saleprice > 0 ? <div className='price-font'>£{item.saleprice * item.quantity}</div> : <div className='price-font'> £{item.price * item.quantity}</div> } </td>
              
                 {/* <td>{item.status == 0 ? 'Undelivered': 'Delivered'}</td> */}
             </tr>
             );
         }); 

   
}

console.log(orderItems); 



    return (
        

        <div className="card px-4 mt-3">
            <div className="card-header">
                <h3>Student Orders</h3>              
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <h1>Items Ordered</h1>
                    <table className="table table-bordered table-striped table-dark table-hover">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Image</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                        {show_order_items}
                        </tbody>
                    </table>
                </div>
            </div>

            
            
        </div>
    )

  
}

export default AdminOrderedProduct;
