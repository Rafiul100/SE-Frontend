import React, { useState } from 'react';
import axios from 'axios';
import AdminProduct from './AdminProduct';


function SideBar({show}) {

    const [category, setCategory] = useState([]); 
    const [Essentials, setEssentials] = useState([]); 
    
    
    const handleInput = (e) => { 
        e.persist(); 
        setCategory({...category, [e.target.name]:e.target.value}); 


    
    }


    const getCategory = () => { 

        console.log(category) 

        const data = { 
            subcategory: category.subcategory, 

        }

        axios.post(`/api/get-subcategory`, data).then(res=> { 

            if (res.data.status === 200) { 

                setEssentials(res.data.products); 

           
                console.log(res.data.products) 


            } else if (res.data.status === 404) { 

                setEssentials(res.data.message);
                console.log(res.data.message) 

            }
        
        });  

    }





   



  return (
      <div className= {show ? 'sidenav active' : 'sidenav'}>
          <ul className='sidebar-ul'>
 
              <li>
              <label className='category-label'>Stationary:</label>
              <div class="custom-select">
            <select name='subcategory' onChange={handleInput} value={category.subcategory}>
                <option value="">---</option>
                <option value="Pens">Pens</option>
                <option value="Filing and Folders">Filing and Folders</option>
                <option value="Pencil Cases">Pencil Cases</option>
                <option value="Pads and Paper">Pads and Paper</option>
                <option value="Calenders/Planners">Calenders/Planners</option>
                <option value="Calculators<">Calculators</option>
            </select>
            <span className='custom-arrow'></span>

            </div>
                </li>

                <li>
                <label className='category-label'>Toiletry:</label>
                <div class="custom-select">
            <select name='subcategory' onChange={handleInput} value={category.subcategory}>
                <option value="sjhidfodhsi">Pens</option>
                <option value="vfvd">Filing and Folders</option>
                <option value="vfd">Pencil Cases</option>
                <option value="">Pads and Paper</option>
                <option value="">Calenders/Planners</option>
                <option value="">Calculators</option>
            </select>
            <span className='custom-arrow'></span>
            </div>
                </li>
                <li>
                <label className='category-label'>Books:</label>
                <div class="custom-select">
            <select>
                
                <option value="">Pens</option>
                <option value="">Filing and Folders</option>
                <option value="">Pencil Cases</option>
                <option value="">Pads and Paper</option>
                <option value="">Calenders/Planners</option>
                <option value="">Calculators</option>
            </select>
            <span className='custom-arrow'></span>
          
            </div>
            <button className='btn btn-border-underline category-button' onClick={getCategory}>Category</button>
                </li>
                <li className='filter-buy-list'>
                <div className="row-1">
                <span className='filter-buy-name'>Latest</span> 
                <input  type="radio" name = "buy-filter" id="latest" value = "Stationary" />
                </div>
                <div className="row-2">
                <span className='filter-buy-name'>Price</span> 
                <input type="radio" name = "buy-filter" id="price" value = "price" />
                </div>
                <div className="row-3">        
                <span className='filter-buy-name'>Name</span> 
                <input type="radio" name = "buy-filter" id="latest" value = "Stationary" />

                </div>
                <button className='btn btn-border-underline' onClick={getCategory}>Filter</button>

      
                </li>
            
          </ul>
         
      </div>
  ); 

 
}

export default SideBar;
