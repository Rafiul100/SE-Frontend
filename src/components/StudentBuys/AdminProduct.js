import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StudentPages/StudentBuy.css'; 
import {BsFillArrowRightSquareFill} from 'react-icons/bs';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';




function AdminProduct({data}) {

  const [Essentials, setEssentials] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [SideNav, setSideNav] = useState(false); 
  const [category, setCategory] = useState({
    subcategory: 'all', 
}); 
const type = 'new'


  //const [background, setBackground] = useState(); 
  const [buyFilter, setBuyFilter] = useState([]); 
  const [pageNumber, setPageNumber] = useState(0); 

  //how many products shown on one page - 10 products per page 
  const productsPerPage = 12;
  //page 4 would mean 40 products have been shown 4 * 10 (products for each page) = 40
  const pagesVistied = pageNumber * productsPerPage; 


  useEffect(() => {
  
    axios.get(`/api/all-admin-product`).then(res => {
        if(res.status === 200) { 
  
          setEssentials(res.data.products); 
          console.log(res.data.products); 
  
              setTimeout(function(){
                  setLoading(false);
             }, 1000);
        }  
    }); 
  
  
  
  //   if(Essentials.length <=  3) { 
  
  //   console.log(Essentials); 
  
  //   console.log('3')
  // setBackground(true);
  //   }   else { 
    
  //   console.log('all') 
  //   setBackground(false); 
  //   }
  
    
  }, [])




  const handleInput = (e) => { 
    e.persist(); 
    setCategory({...category, [e.target.name]:e.target.value}); 

}


const handleFilter = (e) => { 
  e.persist(); 
  setBuyFilter({...buyFilter, [e.target.name]:e.target.value}); 

}

const changeFilter = (e) => {
  e.preventDefault(); 

  const data = {
    filter: buyFilter.buyFilter, 
    subcategory: category.subcategory,
    type: type,
 }

 axios.post(`/api/buy-filter`, data).then(res => {
  if(res.data.status === 200) { 
    console.log(res.data.product); 
      setEssentials(res.data.product); 
     
    
   
  } else if (res.data.status === 404){ 
      swal("Error", res.data.message, "error")

  }

  })

}




const getCategory = () => { 

  setLoading(true);

    //console.log(category) 

    const data = { 
        subcategory: category.subcategory, 
        type: type, 

    }

    

    axios.post(`/api/get-subcategory`, data).then(res=> { 

        if (res.data.status === 200) { 

            setEssentials(res.data.products); 
            setLoading(false);

            
    // if(Essentials.length <=  3) { 

    //   console.log('3')
    //   setBackground(true); 
    // }   else { 
    
    // console.log('all') 
    // setBackground(false);
    
    // }
     
        } else if (res.data.status === 404) { 

            swal("Warning", res.data.message, 'warning'); 
           
            setLoading(false);
         

        }
    
    });  

}


const Addtocart = (e, id) => { 
  e.preventDefault(); 

  const data = { 
      product_id: id,
      product_quantity: 1, 
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


  


    const Addtowishlist = (e, id) => {
      e.preventDefault(); 
    
      const data = { 
          product_id: id,
      }
    
    
      axios.post(`/api/add-wishlist/${type}`, data).then(res => {
    
          
              if (res.data.status === 200) 
              {
                  swal("Success", res.data.message, "success") 
              } else if (res.data.status === 404) {
    
                swal("Warning", res.data.message, "warning") 
    
              }
    
    
      });
    
    
    }

  
    var listItems = '';  
//slice pages from pages visited to the number of products that can be shown on a page, e.g. 30-40
listItems = Essentials.slice(pagesVistied, pagesVistied + productsPerPage).map((item, i) => {
return (
        <div className='box-2' key = {i}>
          <div className="image">
          <img src={`http://localhost:8000/${item.image}`} alt={item.name} />
          </div>
          
          <div className="info">
            <div data-testid = 'adminname' className="title">{item.name} </div>
            <div className="subInfo">
            {item.saleprice > 0 ? item.price.includes('.') && item.saleprice.includes('.') ?  <div><span class="text-muted text-decoration-line-through">£{item.price}</span> <span className='admin-saleprice'> £{item.saleprice}</span> </div> : 
            item.price.includes('.') ? <div><span class="text-muted text-decoration-line-through">£{item.price}</span> <span className='admin-saleprice'> £{item.saleprice}.00</span> </div> : 
            item.saleprice.includes('.') ? <div><span class="text-muted text-decoration-line-through">£{item.price}.00</span> <span className='admin-saleprice'> £{item.saleprice}</span> </div>  : 
            <div><span class="text-muted text-decoration-line-through">£{item.price}.00</span> <span className='admin-saleprice'> £{item.saleprice}.00</span> </div>:  
            item.price.includes('.') ? <div className='admin-saleprice'> £{item.price}</div> : <div className='admin-saleprice'> £{item.price}.00</div> }
              <div className="type">Type: {item.type}</div>
           
            </div>
          </div>

          <div className="overlay">
              <a href="#" onClick={(e) => Addtocart(e, item.id)} className='fas fa-shopping-cart cart-delay'></a>
              <a href="#"  onClick={(e) => Addtowishlist(e, item.id)} className='fas fa-heart heart-delay'></a>
              <Link className='fas fa-search search-delay' to = {`${type}/${item.name}/${item.id}`} > </Link>
          </div>
       
        </div>
 
      )

    }) 


    const refreshEssentials = () => { 


      window.location.reload(false);


    }
  

    if (loading) 
    {
        return <div class="loader">Loading...</div>
    }

    //console.log({listItems})

    //rounds up the number of pages 
    const pageCount = Math.ceil(Essentials.length / productsPerPage);

    const changePage = ({selected}) => { 
      setPageNumber(selected); 
    }
    return (      
 
      <div className='box-container'>
        <header className='side-header'> <BsFillArrowRightSquareFill onClick={() => setSideNav(!SideNav)}/> 
        <h1 className='side-header-name' onClick={refreshEssentials}>New Essentials</h1>
        </header>
      
        <div className= {SideNav ? 'sidenav active' : 'sidenav'}>
          <ul className='sidebar-ul'>
 
              <li>
              <label className='category-label'>Stationary:</label>
              <div class="custom-select">
            <select className = 'stationary-category' name='subcategory' onChange={handleInput} value={category.subcategory}>
              <option>--</option>
                <option value="Pens">Pens</option>
                <option value="Filing and Folders">Filing and Folders</option>
                <option value="Pencil Cases">Pencil Cases</option>
                <option value="Pads and Paper">Pads and Paper</option>
                <option value="Calenders/Planners">Calender and Planner </option>
                <option value="Calculators">Calculators</option>
            </select>
            <span className='custom-arrow'></span>

            </div>
                </li>

                <li>
                <label className='category-label'>Toiletry:</label>
                <div class="custom-select">
            <select className = 'toiletry-category' name='subcategory' onChange={handleInput} value={category.subcategory}>
                <option>--</option>
                <option value="Toothbrushes">Toothbrushes/pastes</option>
                <option value="ShowerGel and Shampoo">Shower Gels/Shampoo's</option>
                <option value="Razors and Saving Cream">Razor/Shaving Creams</option>
                <option value="GroomingKit">Grooming Kits</option>
                <option value="Towels">Towels</option>
            </select>
            <span className='custom-arrow'></span>
            </div>
                </li>

                <li>
                <label className='category-label'>Furniture:</label>
                <div class="custom-select">
            <select className = 'furniture-category' name='subcategory' onChange={handleInput} value={category.subcategory}>
                <option>--</option>
                <option value="Duvet and pillows">Duvet and pillows</option>
                <option value="lamp">Lamps</option>
                <option value="Pins and WallBoard">Pins and WallBoards</option>
                <option value="Basket">Baskets</option>
                <option value="mirror">Mirrors</option>
                <option value="Extention lead and adaptors">Extention and adaptors</option>
                <option value="Storage boxes">Storage boxes</option>
            </select>
            <span className='custom-arrow'></span>
            </div>
                </li>

                <li>
                <label className='category-label'>Books:</label>
                <div class="custom-select">
            <select className = 'books-category' name='subcategory' onChange={handleInput} value={category.subcategory}>
                <option>--</option>
                <option value="Academic">Academic books</option>
                <option value="Fiction">Fictional</option>
            </select>
            <span className='custom-arrow'></span>
          
            </div>
            <button className='btn btn-border-underline category-admin-button btn--small' onClick={getCategory}>Category</button>
                </li>
                <li className='filter-buy-list'>
                <div className="row-1">
                <span className='filter-buy-name'>Latest</span> 
                <input  type="radio" name = "buyFilter" id="latest" value = "latest" onChange={handleFilter} />
                <span className='filter-buy-name'>Oldest</span> 
                <input  type="radio" name = "buyFilter" id="oldest" value = "oldest" onChange={handleFilter} />
                </div>
                <div className="row-2">
                <span className='filter-buy-name'>Price: High to Low</span> 
                <input type="radio" name = "buyFilter" id="price" value = "price-high"  onChange={handleFilter} />
                <span className='filter-buy-name'>Low to High</span> 
                <input type="radio" name = "buyFilter" id="price" value = "price-low"  onChange={handleFilter} />
                </div>
                <div className="row-3">        
                <span className='filter-buy-name'>Popularity</span> 
                <input type="radio" name = "buyFilter" id="latest" value = "popularity"  onChange={handleFilter} />
                </div>
                <button type='button' className='btn btn-border-underline filter-button  btn--small' onClick={changeFilter}>Filter</button>       
                </li>
            
          </ul>
         
      </div>
        <div className={SideNav ? 'container-nav-on' : 'container-nav-off'}> 
          {listItems} 
          <div className="pagecontianer">
          <ReactPaginate
          previousLabel = {"Previous"}
          nextLabel = {"Next"}
          pageCount = {pageCount}
          onPageChange={changePage}
          containerClassName = {"pagination-container"}
          previousLinkClassName = {"previous-button"}
          nextLinkClassName = {"next-button"}
          disabledClassName = {"paginationDisabled"}
          activeClassName = {"paginationActive"} /> 
          </div>
        </div>
        
       
    
        </div>
   

    )

}

export default AdminProduct;
