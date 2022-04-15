import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import swal from 'sweetalert';



function SellHome() {
    
const [orders, setOrders] = useState([]); 
const [subscription, setSubscription] = useState([]); 
const [Loading, setLoading] = useState(true); 

const current = new Date();

var day = current.getDate().toString().length; 

var today; 

(day == '1') ? today = `${current.getFullYear()}-0${current.getMonth()+1}-0${current.getDate()}` 
:  today = `${current.getFullYear()}-0${current.getMonth()+1}-${current.getDate()}`;


// console.log(today); 

const deleteOrder = (e, id) => { 

    e.preventDefault(); 

    //the specific delete button which the student has clicked is stored.  
    const clicked = e.currentTarget;
    //changes the text of the button that was clicked from delete to removing
    clicked.innerText = "Removing"; 

    axios.post(`/api/delete-student-order/${id}`).then(res => { 

        if(res.data.status === 200) { 
            
            console.log(res.data.order); 
            //once the row has been deleted from the database, the closest element which is "tr" is also deleted so that an empty table row is not shown.  
            clicked.closest("tr").remove(); 
            // window.location.reload(false);
           
          

        } else if (res.data.status === 404) { 
            swal("Error", res.data.message, "error");
            clicked.innerText = "Remove"; 
        }

    })
}

useEffect(() => { 
        

    let isMounted = true; 

    axios.get(`/api/student-orders`).then(res=> {
         
        if (isMounted) { 

            if(res.data.status === 200) 

            {
                setOrders(res.data.orders); 
                console.log(res.data.orders); 
                setSubscription(res.data.subscription); 
                console.log(res.data.subscription);
                console.log(res.data.submessage); 
                setLoading(false); 
              

               
            } 
        }
    }); 
    return () => { 
        isMounted = false 
    };

}, []);


var show_orders = ""; 
var show_subscriptions = ""; 
if(Loading) {
    
    return <div class="loader">Loading...</div>


} else { 

    if (orders.length > 0) { 

        {/* //sort the orders by expiry date  */}
        {orders.sort((a, b) => { 
            let d1 = new Date(a.delivery);
            let d2 = new Date (b.delivery);
    
            if (d1.getUTCMonth() > d2.getUTCMonth()) {
                return 1; 
            } else if (d1.getUTCMonth() < d2.getUTCMonth()) {
                return -1;
            } else { 
                return d1.getUTCDate() - d2.getUTCDate(); 
            }
        })}
    
            show_orders    = <div className="table-responsive">
                        
            <table className="table table-bordered table-striped table-dark table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tracking No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone No</th>
                        <th>Delivery (Year/Month/Day)</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
       
        {orders.map((item) => { 

        if (today > item.delivery) { 
            return (
            <tr key={item.id}> 
            <td>{item.id}</td>
            <td>{item.tracking_no}</td>
            <td>{item.firstname} {item.lastname}</td>
            <td>{item.email}</td>
            <td>{item.phoneNo}</td>
            <td>Expired
            <button type='button' className="btn btn-danger btn-sm order-delete-btn" onClick={(e) => deleteOrder(e, item.id)}>
                Delete
            </button>
            </td>
            <td><Link to = {`/student-sell/ordered-products/${item.id}`} className='btn btn-success btn-sm'>View</Link></td>
            {/* <td>{item.status == 0 ? 'Undelivered': 'Delivered'}</td> */}
        </tr>
            )
    
    
        } else { 
           
    
        return (
                <tr key={item.id}> 
                    <td>{item.id}</td>
                    <td>{item.tracking_no}</td>
                    <td>{item.firstname} {item.lastname}</td>
                    <td>{item.email}</td>
                    <td>{item.phoneNo}</td>
                    <td>{item.delivery}</td>
                    <td><Link to = {`/student-sell/ordered-products/${item.id}`} className='btn btn-success btn-sm'>View</Link></td>
                    {/* <td>{item.status == 0 ? 'Undelivered': 'Delivered'}</td> */}
                </tr>
    
        ) 
                
        }
    
            })} 
                
                </tbody>
            </table>
        </div>
    
    
    
        } else { 
    
            show_orders  = <div>
            <div className="card card-body py5 text-center shadow-sm">
                <h4>No orders have been made</h4>
            </div>
            </div>
        }

    
        if (subscription.length > 0) {


            show_subscriptions =    <div className="table-responsive">
                       
            <table className="table table-bordered table-striped table-dark table-hover">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Interval</th>
                        <th>Total price per interval</th>
                       
                    </tr>
                </thead>
                <tbody>
                 
            {subscription.map((item, i) => { 
                return (
                 <tr key={i}>
                 <td><img src={`http://localhost:8000/${item.userimage}`} width="75px" height='75px' alt={item.name} /> {item.user}  </td> 
                 <td><img src={`http://localhost:8000/${item.productimage}`} width="75px" height='75px' alt={item.name} /> {item.name}  </td>
                 <td>{item.quantity}</td>
                 <td>£{item.price}</td>
                 {item.interval == '1w' ?  <td>1 week</td> : null}
                 {item.interval == '2w' ?  <td>2 weeks</td> : null}
                 {item.interval == '3w' ?  <td>3 weeks</td> : null}
                 {item.interval == '4w' ?  <td>4 weeks</td> : null}
                 {item.interval == '2m' ?  <td>2 months</td> : null}
                 {item.interval == '3m' ?  <td>3 months (every semester)</td> : null}
                 {item.interval == '4m' ?  <td>4 months</td> : null}
                 <td>£{item.quantity * item.price}</td>
               
                 </tr>
                )
        })}
                </tbody>
                </table>
                </div>
        
            } else {
        
                show_subscriptions  = <div>
                <div className="card card-body py5 text-center shadow-sm">
                    <h4>No subscriptions have been made</h4>
                </div>
                </div>
        
        
            }
   
}


    return (
        <div className="card px-4 mt-3">

            <div className="card-header">
                <h1>Student Orders</h1>  
                      
            </div>
            <div className="card-body">
                {show_orders}
         
            </div>


            <div className="card-header">
                <h1>Subscriptional Orders</h1>              
            </div>
            <div className="card-body">
                {show_subscriptions}
              
            </div>

            
            {/* <div className="card-body">
                <div className="table-responsive">
                <h1>Delivered</h1>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tracking No.</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone No</th>
                                <th>Delivery (Year/Month/Day)</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {show_uncompleted_orders}
                        </tbody>
                    </table>
                </div>
            </div> */}
            
        </div>
    )

}

export default SellHome; 
