import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import {Link, useParams, useNavigate} from 'react-router-dom';
import '../StudentPages/StudentBuy.css'; 

function ProductDetail(props) {

    const navigate = useNavigate(); 
    const[loading, setLoading] = useState(true); 
    const [Product, setProduct] = useState([]); 
    const [quantity, setQuantity] = useState(1);
    const [stockerror, setStockError] = useState('')
    const [User, setUser] = useState([]);
    const [showImage, setShowImage] = useState([]);
    const [SellerStyle, setSellerStyle] = useState([]); 
    const [reviews, setReviews] = useState([]); 

    const {type} = useParams();
    const {product} = useParams();
    const {id} = useParams();


    const sellerStyle = () => { 
        if (window.innerWidth <= 1100) { 
            setSellerStyle(false); 
        } else { 
            setSellerStyle(true);
        }
    }; 


    window.addEventListener('resize', sellerStyle);
    

    useEffect(() => { 
        

        let isMounted = true; 

        axios.get(`/api/view-product-details/${type}/${product}/${id}`).then(res=> {
             
            if (isMounted) { 

                if(res.data.status === 200) 

                {
                    setProduct(res.data.product); 
                    setUser(res.data.user);
                    setShowImage({ image: `http://localhost:8000/${res.data.image}`}); 
                    setLoading(false); 
                   
                } else if (res.data.status === 400) {
                    navigate('/student-buy/new-essentials'); 
                    swal("Warning", res.data.message, "warning")

                } else if (res.data.status === 401) { 

                    navigate('/student-buy/used-essentials'); 
                    swal("Warning", res.data.message, "warning")
                }
            }
        }); 


        axios.get(`/api/student-feedback/${id}`).then(res => {

            if (isMounted) {

                if (res.data.status === 200) 
                {

                    setReviews(res.data.feedback); 

                }

            }

        });

        return () => { 
            isMounted = false 
        };

    }, [type, product, id, navigate]);


   

    const handleDecremet = () => {
        if(quantity > 1) {
        setQuantity(prevCount => prevCount - 1); 
        setStockError('');
    } 

    }


    const handleIncrement = () => { 

        if(quantity < Product.stock) {
        setQuantity(prevCount => prevCount + 1); 

        }  else { 

           setStockError('maximum stock reached')
           
        }

    } 

    const Addtocart = (e) => { 
        e.preventDefault(); 

        const data = { 
            product_id: Product.id,
            product_quantity: quantity, 
        }
        
        axios.post(`/api/add-to-cart/${type}`, data).then(res=> { 
            if(res.data.status === 200) { 
                swal("Success", res.data.message, "success"); 
            } else if (res.data.status === 409) { 
                swal("Warning", res.data.message, "warning"); 
            } else if (res.data.status === 404) { 
                swal("Warning", res.data.message, "warning"); 
            } 
        }); 

    }

    var sellerInfo = ''; 
    if (User) { 

        sellerInfo = <div className={SellerStyle ? 'float-end seller-container' : 'seller-container'}> 
               
            <h5 className='sellers-headers'> Sellers Information</h5>  

            {(showImage.image == 'http://localhost:8000/noimage') ? <img className='seller-img'  src= "http://bootdey.com/img/Content/avatar/avatar1.png" />    :  <img className='seller-img'  src={showImage.image}/>  }
            <span className='seller-header'> <span className='headers-info'></span> {User.username}</span> 
            <span className='seller-header'> <span className='headers-info'>University:</span>  {User.university ? User.university : 'Not given'}</span> 
            <span className='seller-header'> <span className='headers-info'>Phone no:</span>  {User.phoneNo ? User.phoneNo : 'Not given'}</span>

        </div>
    }


    var backbtn = ''; 
    if (User) { 
      backbtn =  <Link to = '/student-buy/used-essentials'>
        <button className='btn back-button'>Go back</button>
        </Link>
    } else { 

      backbtn =   <Link to = '/student-buy/new-essentials'>
        <button className='btn back-button'>Go back</button>
        </Link>
    }


    const Addtowishlist = (e) => {
        e.preventDefault(); 


        const data = { 
            product_id: Product.id,
        }

        console.log(data); 

        axios.post(`/api/add-wishlist/${type}`, data).then(res => {

            
                if (res.data.status === 200) 
                {
                    swal("Success", res.data.message, "success") 
                } else if (res.data.status === 404) {
                    swal("Warning", res.data.message, "warning") 

                }


        });


    }


    var reviewlist = '';
    if (reviews.length > 0) {


        
        reviewlist =  reviews.map((item) => {


        return (
 <div class="review-card">
        <div class="review-flex">
            <div class=""> <img class="profile-pic" src={`http://localhost:8000/${item.image}`} width="175px" alt={item.name}/> </div>
            <div class="d-flex flex-column">
                <h3 class="mt-2 mb-0">{item.username}</h3>
                <div>
                    {item.classified == 'Very good' ?  <p class="text-left"> Very Good <span class="fa fa-star star-active ml-3"></span> <span class="fa fa-star star-active"></span> <span class="fa fa-star star-active"></span> <span class="fa fa-star star-active"></span> <span class="fa fa-star star-active"></span> </p>  : null }    
                    {item.classified == 'Good' ?  <p class="text-left"> Good <span class="fa fa-star star-active ml-3"></span> <span class="fa fa-star star-active"></span> <span class="fa fa-star star-active"></span> <span class="fa fa-star star-active"></span> <span class="fa fa-star star-inactive"></span></p>  : null } 
                    {item.classified == 'Average' ?  <p class="text-left"> Average <span class="fa fa-star star-active ml-3"></span> <span class="fa fa-star star-active"></span> <span class="fa fa-star star-active"></span> <span class="fa fa-star star-inactive"></span> <span class="fa fa-star star-inactive"></span></p>  : null } 
                    {item.classified == 'Bad' ?  <p class="text-left"> Bad <span class="fa fa-star star-active ml-3"></span> <span class="fa fa-star star-active"></span> <span class="fa fa-star star-inactive"></span> <span class="fa fa-star star-inactive"> <span class="fa fa-star star-inactive"></span></span></p>  : null }
                    {item.classified == 'Very Bad' ?  <p class="text-left"> Very Bad <span class="fa fa-star star-active ml-3"></span> <span class="fa fa-star star-inactive"></span> <span class="fa fa-star star-inactive"></span> <span class="fa fa-star star-inactive"></span> <span class="fa fa-star star-inactive"></span></p>  : null } 
                </div>
            </div>
            <div class="ml-auto review-date">
                <p class="pt-5 pt-sm-3">{item.created_at}</p>
            </div>
        </div>
        <div class="row text-left">
            <p class="feedback-text">"{item.text}"</p>
        </div>
    </div>  
            )

})   

    }
    else { 


        reviewlist =    <div className="card card-body py5 text-center shadow-sm">
                        <h4>No reviews for this product</h4>
                        </div>

    }




    if (loading) 
    {
        return <div class="loader">Loading...</div>

    }  else {

        var stock = ''; 
      if(Product.stock > 0)   {
        stock = <div> 
<label className="btn-sm btn-success px-4 mt-2">In Stock</label>

    <div className="row">
        <div className="col-md-3 mt-3">
            <div className="input-group">
                {/*button that increments and decrements quantity to purchase using state hook*/}
                <button type='button' onClick={handleDecremet} className="input-group-text">-</button>
                <div className="form-control text-center">{quantity}</div>
                <button type ='button' onClick={handleIncrement} className="input-group-text">+</button>
            
            </div>
            <span className='stock-error'>{stockerror}</span>
            
        </div>
            <div className="col-md-3 mt-3">
                <button  type ='button' className="btn btn-primary w-100" onClick={Addtocart}>Add To Cart</button>
            </div>
            </div>
            </div>
    } else { 

        stock = <div> 
        <label className="btn-sm btn-danger px-4 mt-2">Out Of Stock</label>
        </div>


    }
 
}

  
return (

    <>
    <div className="py-3 details-nav-style">
    <div className="container details-nav">
        {backbtn}
        <h6 className='details-nav-info'> {Product.subcategory} / {Product.name} </h6>
    </div>
</div>
    <div className='details-container'>
        <div className="py-3">
            <div className="product-details-container">
                <div className="row">

                   <div className="col-md-3 border-end">
                       <img src={`http://localhost:8000/${Product.image}`} alt={Product.name} className="detials-img" />
                   </div>

                   <div className="col-md-9">
                       <h4>
                       Essential: <span> </span>  
                       {Product.name}
                           <span className="float-end badge btn-sm type-style badge-pill">Type: {Product.type}</span> <br/>
                       </h4>
                       {sellerInfo}
                       <p className='pro-des'> {Product.description}</p>
                       <h4 className="mb-1 product-information">
                        {type == 'used' ? Product.price.includes('.') ?  <div className="price"> £{Product.price} </div> : <div className="price"> £{Product.price}.00</div> : 
                       
                        Product.saleprice > 0 ? Product.price.includes('.') && Product.saleprice.includes('.') ?  <div><span class="text-muted text-decoration-line-through">£{Product.price}</span> <span> £{Product.saleprice}</span> </div> : 
                        Product.price.includes('.') ? <div><span class="text-muted text-decoration-line-through">£{Product.price}</span> <span> £{Product.saleprice}.00</span> </div> : 
                        Product.saleprice.includes('.') ? <div><span class="text-muted text-decoration-line-through">£{Product.price}.00</span> <span> £{Product.saleprice}</span> </div>  : 
                        <div><span class="text-muted text-decoration-line-through">£{Product.price}.00</span> <span> £{Product.saleprice}.00</span> </div>:  
                        Product.price.includes('.') ? <div> £{Product.price}</div> : <div> £{Product.price}.00</div>}

                       <span className='delivery'>(Delivery Estimate: {Product.delivery})</span>
                       </h4>
                    
                    
                       <div>
                        {stock} 
                        </div>
                           <button type = 'button'  className="btn cart-button mt-3" onClick={Addtowishlist}>Add To Wishlist</button> 
                           {Product.stock > 0 ? <Link to = {`/student-buy/subscribe/${type}/${Product.id}`}> <span className="btn btn-dark mt-3 subscribe-btn">Subscribe</span> </Link> : null }  
                       </div>
                    
                     
                   </div>
            

                </div>
            </div>




        <h3 className='review-title'>Student Reviews</h3>
    
            {reviewlist}
    

        </div>

        </>
    
)


}




export default ProductDetail;
