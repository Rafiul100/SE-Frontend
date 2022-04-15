import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import {Link, useParams, useNavigate} from 'react-router-dom';
import './Subscribe.css'; 

function Subscribe() {

    
    const navigate = useNavigate(); 
    const[errors, setError] = useState([]);
    const[loading, setLoading] = useState(true);

    const [StudentDetails, setStudentDetials] = useState({
        firstname: '', 
        lastname:'',
        phoneNo:'',
        email:'',
        address:'',
        city:'',
        postcode:'', 
    }); 


    const[product, setProduct] = useState([]);
    const[alreadysub, setAlreadySub] = useState({
        type: ''
    });
    const[subscription, setSubscription] = useState({
        quantity: '1',
        interval: '1w', 
    });


    const {type} = useParams();
    const {id} = useParams();


    useEffect(() => { 

        let isMounted = true; 

        axios.get(`/api/view-subscription-details/${type}/${id}`).then(res=> { 
            if (isMounted) { 

                if(res.data.status === 200) 

                {
                    setStudentDetials(res.data.user); 
                    setLoading(false); 
                    setProduct(res.data.product); 
                    setAlreadySub({type: res.data.subscribed})
                  
                   
                } else if (res.data.status === 401) {
                    swal("Warning", res.data.message, "warning")
                } else if (res.data.status === 404) {
                    navigate('/'); 
                    swal("Warning", res.data.message, "warning")
                }
            }
        }); 
        return () => { 
            isMounted = false 
        };

    }, [navigate, type, id]);

    const handleInput = (e) => { 
        e.persist();
        setStudentDetials({...StudentDetails, [e.target.name]: e.target.value}); 
    }


    const handleSubscription = (e) => { 
        e.persist();
        setSubscription({...subscription, [e.target.name]: e.target.value}); 
    }


    const placeSubscription = (e) => { 
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
            quantity: subscription.quantity,
            interval: subscription.interval,
            type: type,
            product_id: id, 

        } 

        console.log(data); 


        axios.post(`/api/place-subscription-order`, data).then(res => { 

            if(res.data.status === 200) { 
                swal("Subscribed Successfully", "You have subscribed to the product", "success"); 
                setError([]); 
                // navigate('/student-buy');
            } else if (res.data.status === 422) { 

                swal("Fields are missing or do not meet constraits", "", "error"); 
                setError(res.data.errors); 

            } else if (res.data.status === 404) {

                swal("Warning", "quantity is over the stock limit", "warning"); 


            } else if (res.data.status === 401) {

                swal("Error", "You have already subscribed to this product", "error"); 
            }

        }); 
       
    }

    const removeSubscription = (e) => {
        e.persist(); 
   
   
        axios.delete(`/api/remove-subscription/${id}/${type}`).then(res => {
           if(res.data.status === 200) { 
   
               swal("Success", res.data.message, "success"); 
               
   
                 setTimeout(function(){
                     setLoading(false);
                }, 1000);
           }  else if (res.data.status == 404) {
   
               swal("Warning", res.data.message, "warning"); 
   
           }
   
           
       }); 
   
     }

   

    if (loading) { 
        return  <div class="loader">Loading...</div>
    } else {


  return (

    
<>
    <div className="py-3 details-nav-style">
    <div className="container">
        <h6> Home / Subscribe </h6>
    </div>
</div>
  

<div className='subscribe-background'> 
<div className="py-4">
<div className="container">

    <div className="row">

<div className="col-md-4"> 
<div className="card product-subscribe-card card-style">
<img src={`http://localhost:8000/${product.image}`} alt={product.name} className="w-50" />

<h2>{product.name}</h2>

<p className='sub-des'>{product.description}</p>

<div className="product-info">
  {product.stock > 0 ? <h4> {product.stock} <span className='text-success'> in stock</span></h4>   : null}  

  {type == 'new' ?  product.saleprice > 0 ?  <div className='sub-saleprice'><span class="text-muted text-decoration-line-through">£{product.price}</span> <span className='featured-price'> £{product.saleprice}</span> </div>  :     
  <h4 className='subscribe-price'>£{product.price}</h4> :  
  <h4 className='subscribe-price'>£{product.price}</h4> }

    
</div>
    
    </div>
</div> 


    <div className="col-md-7">
    <div className="card card-style">
        <div className="card-header">
            <h4>Student Details</h4>
            <span className='text-danger subscribe-note'>When subscribing there will be an immediate purchase of the product and then a purchase after every interval chosen.</span>
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

                <div className="col-md-6">
                    <div className="form-group mb-3">
                        <label htmlFor="post">Quantity:</label>
                        <select name="quantity"  className="interval-dropdown" onChange={handleSubscription} value={subscription.quantity}>
                        <option value='1'>1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <small className="text-danger">{errors.subcategory}</small>
                    </select>
                        <small className='text-danger'>{errors.postcode}</small>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group mb-3">
                        <label htmlFor="post">Interval:</label> <br />
                        <select name="interval"  className="interval-dropdown" onChange={handleSubscription} value={subscription.interval}>
                        <option value='1w'>1 week</option>
                        <option value='1w'>2 weeks</option>
                        <option value="3w">3 weeks</option>
                        <option value="4w">4 weeks</option>
                        <option value="2m">2 months</option>
                        <option value="3m">3 months (every semester)</option>
                        <option value="4m">4 months</option>
                        <small className="text-danger">{errors.subcategory}</small>
                    </select>
                        <small className='text-danger'>{errors.postcode}</small>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="form-group text-center">
                        {alreadysub.type != 'subbed' ?   <button type='button' className='btn btn-success mx-1' onClick={(e)=>  placeSubscription(e, 'cod')}>Subscribe</button> :   <button type='button' className='btn btn-danger mx-1' onClick={(e)=>  removeSubscription(e, 'cod')}>Unsubscribe</button>}
                    </div>
                </div>
            </div>
        </div>
    </div>  
</div>
</div>
</div>

</div>

</div>
</>
  )

}
}

export default Subscribe