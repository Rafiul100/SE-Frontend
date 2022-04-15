import React, {useEffect, useState} from 'react'
import axios from 'axios'
import CarouselContainer from '../CarouselContainer'
import {Link, useParams, useNavigate} from 'react-router-dom';
import './Home.css'; 

function StudentBuyHome() {


const [featured, setFeatured] = useState([]);
const [popular, setPopular] = useState([]);
const [sale, setSale] = useState([]);
const [Loading, setLoading] = useState(true); 


    useEffect(() => { 
        

        let isMounted = true; 
    
        axios.get(`/api/homepage-products`).then(res=> {
             
            if (isMounted) { 
    
                if(res.data.status === 200) 
    
                {
                   
                    setFeatured(res.data.featured); 
                    setPopular(res.data.popular); 
                    setSale(res.data.sale); 
                    // console.log(res.data.featured); 
                    // console.log(res.data.popular); 
                    // console.log(res.data.sale); 
                    setLoading(false); 
                  
                   
                } 
            }
        }); 
        return () => { 
            isMounted = false 
        };
    
    }, []);


    var listfeatured = ''
    listfeatured = featured.map((item, i) => {
        return (
            <div class="col mb-5"  key = {i}>
            <div class="card h-100 card-style">
                {/* <!-- Product image--> */}
                <div className="image"> 
                <img src={`http://localhost:8000/${item.image}`} className = 'homepage-image' alt={item.name} />
                </div>
                {/* <!-- Product details--> */}
                <div class="card-body p-4">
                    <div class="text-center">
                        {/* <!-- Product name--> */}
                        <h5 class="fw-bolder">{item.name}</h5>
                        {/* <!-- Product price--> */}
                      
                      {item.saleprice > 0 ?   <span className='featured-price'> £{item.saleprice}  </span>  :  <span className='featured-price'> £{item.price} </span>} <br />
                      
                       <span className=''> {item.category} / {item.subcategory} </span> 
                    </div>
                </div>
                {/* <!-- Product actions--> */}
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">

                    <Link to ={`/student-buy/new-essentials/new/${item.name}/${item.id}`}> 
                    <div class="text-center"><a className="btn btn-background-circle-black btn--small mt-auto featured-button" href="#">Add to cart</a></div>
                    </Link>
                </div>
            </div>
        </div>
         
              )
        
            }) 


            var listsale = ''
            listsale = sale.map((item, i) => {
                return (
                    <div class="col mb-5"  key = {i}>
                            <div class="card h-100 card-style">
                         
                            <div class="badge bg-dark text-white position-absolute sale-type">Sale</div> 
                            <div className="image">
                            <img src={`http://localhost:8000/${item.image}`} className = 'homepage-image' width="150px" alt={item.name} />
                            </div>
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <h5 class="fw-bolder">{item.name}</h5>
                                    {item.saleprice > 0 ? item.price.includes('.') && item.saleprice.includes('.') ?  <div><span class="text-muted text-decoration-line-through">£{item.price}</span> <span className='featured-price'> £{item.saleprice}</span> </div> : 
                                    item.price.includes('.') ? <div><span class="text-muted text-decoration-line-through">£{item.price}</span> <span className='featured-price'> £{item.saleprice}.00</span> </div> : 
                                    item.saleprice.includes('.') ? <div><span class="text-muted text-decoration-line-through">£{item.price}.00</span> <span className='featured-price'> £{item.saleprice}</span> </div>  : 
                                    <div><span class="text-muted text-decoration-line-through">£{item.price}.00</span> <span className='featured-price'> £{item.saleprice}.00</span> </div>:  
                                    item.price.includes('.') ? <div className='featured-price'> £{item.price}</div> : <div className='featured-price'> £{item.price}.00</div> }
                                    <span className=''> {item.category} / {item.subcategory} </span> 
                                </div>
                            </div>
                         
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <Link to ={`/student-buy/new-essentials/new/${item.name}/${item.id}`}> 
                                <div class="text-center"><a class="btn btn-background-circle-black btn--small mt-auto" href="#">Add to cart</a></div>
                                </Link>
                            </div>
                        </div>
               
                </div>
                 
                      )
                
                    }) 


            var listpopular = ''
            listpopular = popular.map((item, i) => {
                return (
                    <div class="col mb-5" key = {i}>
                    <div class="card h-100 popular-card card-style">
                        {/* <!-- Product image--> */}

                        <div className="image">
                        <img src={`http://localhost:8000/${item.image}`} className = 'homepage-image' width="150px" alt={item.name} />
                        </div>
                        {/* <!-- Product details--> */}
                        <div class="card-body p-4">
                            <div class="text-center">
                                {item.type == 'adminproduct' ? <span className='popular-type'>Admin Product</span> : <span className='popular-type'>Student Product</span>  }
                                {/* <!-- Product name--> */}
                                <h5 class="fw-bolder">{item.name}</h5>
                                {/* <!-- Product price--> */}
                               <span className='featured-price'> £{item.price} </span> <br />
                               <span className=''> {item.category} / {item.subcategory} </span> 
                            </div>
                        </div>
                        {/* <!-- Product actions--> */}
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            {item.type == 'adminproduct' ?  
                            <Link to ={`/student-buy/new-essentials/new/${item.name}/${item.id}`}> 
                            <div class="text-center"><a className="btn btn-background-circle-black btn--small mt-auto popular-button" href="#">Add to cart</a></div>  
                            </Link> : <Link to ={`/student-buy/used-essentials/used/${item.name}/${item.id}`}> 
                            <div class="text-center"><a className="btn btn-background-circle-black btn--small mt-auto popular-button" href="#">Add to cart</a></div>  
                            </Link> }
                          
                        </div>
                    </div>
                </div>
                 
                      )
                
             }) 
        



    if(Loading) {

        return <div class="loader">Loading...</div>
     
    
    } else { 


    return (

        <>

            <CarouselContainer />
      
 
    {/* <!-- Section--> */}
    <section class="py-3 home-container">
        <div class="container px-4 px-lg-5 mt-5">
        <h1 className='text-center subheading'>Featured Products</h1>
            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {listfeatured}
            </div>

            <h1 className='text-center  subheading'>ON SALE</h1>
            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            
            {listsale}
            
              
            </div>

            <div className="hello">
            <h1 className='text-center subheading'>Popular Products</h1>
            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            
            {listpopular}
            
            </div>
                    
            </div>

                
             
        </div>
    </section>
    {/* <!-- Footer--> */}
    <footer class="py-5 bg-dark">
        <div class="container"><p class="m-0 text-center text-white">Copyright &copy; Student Essentials 2021</p></div>
    </footer>
    </>
    )

    }
}

export default StudentBuyHome
