import React, { useEffect, useState } from 'react';
import '../Wishlist.css'; 
import axios from 'axios';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

function Wishlist() {



  const [wishlist, setWishlist] = useState([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
  
    axios.get(`/api/get-wishlist`).then(res => {
        if(res.data.status === 200) { 

          setWishlist(res.data.wishlist); 

              setTimeout(function(){
                  setLoading(false);
             }, 1000);
        }  

        
    }); 


  }, [])


  const removeWish = (e, id) => {
     e.persist(); 


     axios.delete(`/api/remove-wishlist/${id}`).then(res => {
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
if (wishlist.length > 0) {
  listItems = wishlist.map((item, i) => { 
  return (
            <div key = {i} class="cart-item d-md-flex justify-content-between wishlist-item card-style"><span onClick={(e)=>  removeWish(e, item.id)} class="remove-item">X</span>
            <div class="px-3 my-3">

           {item.type == 'adminproduct' ? 
           
           <Link class="cart-item-product" to = {`/student-buy/new-essentials/new/${item.name}/${item.id}`} >
                    <div class="cart-item-product-thumb"><img  src={`http://localhost:8000/${item.image}`} alt={item.name}/></div>
                    <div class="cart-item-product-info">
                        <h4 class="cart-item-product-title">{item.name}</h4>
                        {item.saleprice == '0.00' ?   <div class="text-lg text-body font-weight-medium pb-1 sub-info">£{item.price}</div> :  <div class="text-lg text-body font-weight-medium pb-1 sub-info">£{item.saleprice}</div>}
                        <span>Availability: {item.stock > 0 ? <span class="text-success font-weight-medium">{item.stock} In stock </span> : <span class="text-danger font-weight-medium">Out of stock</span> } </span>
                    </div>
                </Link> : 

            <Link class="cart-item-product" to = {`/student-buy/used-essentials/used/${item.name}/${item.id}`} >
            <div class="cart-item-product-thumb"><img   src={`http://localhost:8000/${item.image}`} alt={item.name}/></div>
            <div class="cart-item-product-info">
                <h4 class="cart-item-product-title">{item.name}</h4>
                <div class="text-lg text-body font-weight-medium pb-1">£{item.price}</div><span>Availability: {item.stock > 0 ? <span class="text-success font-weight-medium">{item.stock} In stock </span> : <span class="text-danger font-weight-medium">Out of stock</span> } </span>
            </div>
            </Link> 
                                
                }
            
            </div>
        </div>
   
        )
  
      }) 

    } else {

        listItems =    <div className="col-md-10">
        <div className="card card-body py5 text-center shadow-sm card-style">
            <h4>Your Wishlist Is Empty</h4>
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

export default Wishlist