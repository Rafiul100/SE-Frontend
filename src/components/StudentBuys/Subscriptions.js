import React, { useEffect, useState } from 'react';
import './Wishlist.css'; 
import axios from 'axios';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

function Subsriptions() {



  const [subscription, setSubscription] = useState([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
  
    axios.get(`/api/get-subscriptions`).then(res => {
        if(res.data.status === 200) { 

            setSubscription(res.data.subscriptions); 
           

              setTimeout(function(){
                  setLoading(false);
             }, 1000);
        }  

        
    }); 


  }, [])


  const removeSubscription = (e, id, type) => {
     e.persist(); 


     axios.delete(`/api/remove-subscription/${id}/${type}`).then(res => {
        if(res.data.status === 200) { 

            swal("Success", res.data.message, "success"); 
            window.location.reload(false);

              setTimeout(function(){
                  setLoading(false);
             }, 1000);
        }  else if (res.data.status == 404) {

            // swal("Warning", res.data.message, "warning"); 
            console.log(res.data.message); 

        }

        
    }); 

  }


  if (loading) 
  {
      return <div class="loader">Loading...</div>
  } else {

  var listItems = '';  
if (subscription.length > 0) {
  listItems = subscription.map((item, i) => {
  return (
            <div key = {i} class="cart-item d-md-flex justify-content-between wishlist-item card-style">
            <div class="px-3 my-3">

           {item.type == 'adminproduct' ? 

           <div className="cart-item-product">
           <Link to = {`/student-buy/new-essentials/new/${item.name}/${item.id}`} >
                    <div class="cart-item-product-thumb"><img src={`http://localhost:8000/${item.image}`} alt={item.name}/></div>
            </Link> 
                    <div class="cart-item-product-info">
                        <h4 class="cart-item-product-title">{item.name}</h4>
                        <div className="subcriptions-info">
                        <span className="sub-info">Quantity: {item.quantity}</span>
                        {item.interval == '1w' ?  <span className="sub-info">Interval: 1 week</span> : null}
                        {item.interval == '2w' ?  <span className="sub-info">Interval: 2 weeks</span> : null}
                        {item.interval == '3w' ?  <span className="sub-info">Interval: 3 weeks</span> : null}
                        {item.interval == '4w' ?  <span className="sub-info">Interval: 4 weeks</span> : null}
                        {item.interval == '2m' ?  <span className="sub-info">Interval: 2 months</span> : null}
                        {item.interval == '3m' ?  <span className="sub-info">Interval: 3 months</span> : null}
                        {item.interval == '4m' ?  <span className="sub-info">Interval: 4 months (every semester)</span> : null}
                        {item.saleprice == '0.00' ?   <div class="text-lg text-body font-weight-medium pb-1 sub-info">Total cost: £{item.price * item.quantity}</div> :  <div class="text-lg text-body font-weight-medium pb-1 sub-info">Total cost: £{item.saleprice * item.quantity}</div>}
                        </div>
                       
                        {/* <span>Availability: {item.stock > 0 ? <span class="text-success font-weight-medium">{item.stock} In stock </span> : <span class="text-danger font-weight-medium">Out of stock</span> } </span> */}
                   
                        <button className='btn btn-sm btn-danger' onClick={(e)=>  removeSubscription(e, item.id, item.type)}>Unsubscribe</button>
                    </div>
         </div>
                 : 

          
            <div className="cart-item-product">
            <Link to = {`/student-buy/used-essentials/used/${item.name}/${item.id}`} >
            <div class="cart-item-product-thumb"><img src={`http://localhost:8000/${item.image}`} alt={item.name}/></div>
            </Link> 
            <div class="cart-item-product-info">
                <h4 class="cart-item-product-title">{item.name}</h4>
                
                {/* <span>Availability: {item.stock > 0 ? <span class="text-success font-weight-medium">{item.stock} In stock </span> : <span class="text-danger font-weight-medium">Out of stock</span> } </span> */}
                <div className="subcriptions-info">
                <span className="sub-info">Quantity: {item.quantity}</span>
                {item.interval == '1w' ?  <span className="sub-info">Interval: 1 week</span> : null}
                {item.interval == '2w' ?  <span className="sub-info">Interval: 2 weeks</span> : null}
                {item.interval == '3w' ?  <span className="sub-info">Interval: 3 weeks</span> : null}
                {item.interval == '4w' ?  <span className="sub-info">Interval: 4 weeks</span> : null}
                {item.interval == '2m' ?  <span className="sub-info">Interval: 2 months</span> : null}
                {item.interval == '3m' ?  <span className="sub-info">Interval: 3 months</span> : null}
                {item.interval == '4m' ?  <span className="sub-info">Interval: 4 months (every semester)</span> : null}
                <div class="text-lg text-body font-weight-medium pb-1 sub-info">Total cost: £{item.price * item.quantity}</div>
                </div>

                <button className='btn btn-sm btn-danger' onClick={(e)=>  removeSubscription(e, item.id, item.type)}>Unsubscribe</button>
            </div>
            </div>
         
                            
                }
             
           
            </div>
        </div>
   
        )
  
      }) 

    } else {

        listItems =    <div className="col-md-10">
        <div className="card card-body py5 text-center shadow-sm card-style">
            <h4>You have no current subscriptions</h4>
        </div>
        </div>


    }

}



  return (

    <div className='wishlist-container-style'> 
    
    <div class="col-lg-8 pb-5 wishlist-container">


        {listItems}


 
    {/* <div class="custom-control custom-checkbox">
        <input class="custom-control-input" type="checkbox" checked="" id="inform-me"/>
        <label class="custom-control-label" for="inform-me">Inform me when item from my wishlist is available</label>
    </div> */}
</div>

</div>

  )
}

export default Subsriptions; 