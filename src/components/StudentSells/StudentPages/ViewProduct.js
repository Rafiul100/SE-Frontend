import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import swal from 'sweetalert';
import './StudentSell.css'; 

function ViewProduct() {


    const [ViewProduct, setProduct] = useState([]); 
    
    const [Loading, setLoading] = useState(true); 
    const [adminFilter, setAdminFilter] = useState([]); 
    const student_id = localStorage.getItem('auth_id'); 


    const handleInput = (e) => { 

        setAdminFilter({...adminFilter, [e.target.name]:e.target.value})

    }



    const changeFilter = (e) => { 
        e.preventDefault(); 

        const data = {
            student_id: student_id,
            category: adminFilter.categoryfilter, 
         }


        axios.post(`/api/student-filter`, data).then(res => {
            if(res.data.status === 200) { 
              
                setProduct(res.data.product); 
               
              
             
            } else if (res.data.status === 404){ 
                swal("Error", res.data.message, "error")

            }

            })
    }



useEffect(() => {

    const data = {
        student_id: student_id, 
    }



    axios.post(`/api/view-student-product`, data).then(res=> { 
        if(res.data.status === 200) { 
            setProduct(res.data.products); 
            setLoading(false);
        
        }
    })


}, [])


const deleteProduct = (e, id) => { 

    e.preventDefault(); 

    //the specific delete button which the student has clicked is stored.  
    const clicked = e.currentTarget;
    //changes the text of the button that was clicked from delete to removing
    clicked.innerText = "Removing"; 

    axios.delete(`/api/delete-student-item/${id}`).then(res => { 

        if(res.data.status === 200) { 
            
            
            //once the row has been deleted from the database, the closest element which is "tr" is also deleted so that an empty table row is not shown.  
            clicked.closest("tr").remove(); 

            // window.location.reload(false);
            
           
        } else if (res.data.status === 404) { 
            swal("Error", res.data.message, "error");
            clicked.innerText = "Remove"; 
        }

    })

    



}

var show_product = ""; 
if(Loading) {
    
    return <div class="loader">Loading...</div>


} else { 

if (ViewProduct.length > 0) {
    var product_status = ''; 
    
    
   show_product =   <table className="table table-bordered table-striped table-dark table-hover">
              
   <thead>
   <tr>
       <th>Name</th>
       <th>Image</th>
       <th>Category</th>
       <th>Sub-Category</th>
       <th>Product Description</th>
       <th>Price</th>
       <th>Edit</th>
       <th>Status</th>
   </tr>
</thead>
      
   {ViewProduct.map((item, i) => { 
       //change the view to show if the product has the status of being hidden(deleted) or shown.
       if (item.status == '1') { 
           
           product_status = <div className='hidden-status-container'> Hidden
           <button onClick={(e) => deleteProduct(e, item.id)} className='btn btn-danger btn-sm'>Delete</button>
               </div>
        
       } else { 
           product_status = 'Shown'
       }
        return (
            <>
              
                <tbody>
                    <tr key={i}> 
                        <td>{item.name}</td>
                        {/*location of the image is found through a laravel path where it is stored  */}
                        <td><img src={`http://localhost:8000/${item.image}`} width="125px" alt={item.name} /></td>
                        <td>{item.category}</td>
                        <td>{item.subcategory}</td>
                        <td>{item.description}</td>
                        <td>{item.price}</td>
                        {/*edit link will direct admin to a unique endpoint based on what product has been selected for editing*/}
                        <td><Link to = {`/student-sell/edit-product/${item.id}`} className='btn btn-success btn-sm'>Edit</Link></td>
                        <td>{product_status}</td>
                    </tr>
                </tbody>
           
           
            </>
            );
 
        })}

</table>



    } else {

        show_product = <div>
        <div className="card card-body py5 text-center shadow-sm">
            <h4>No products to view</h4>
        </div>
        </div>



    }
}


    return (
        <div className="card px-4 mt-3">
            <div className="card-header">
                <h3>View Product </h3>
                <div className="student-functionalities">
                <Link to = "/student-sell/add-product" className='btn  btn-dark btn-sm float-end view-student'>Add Product</Link>
                 <form onSubmit={changeFilter}  className="student-filters"action="">
              {/* <div className="admin-filter">All <input type="radio" name="categoryfilter"  value = {null} onChange={handleInput}  /></div> */}
                <div className="student-filter">Stationary <input type="radio" name="categoryfilter"  value = "Stationary" onChange={handleInput}  /></div> 
                <div className="student-filter">Furniture<input type="radio" name="categoryfilter" value = "Furniture" onChange={handleInput}  /> </div>
                <div className="student-filter">Books  <input type="radio" name="categoryfilter" value = "Books" onChange={handleInput} /></div>   
                <div className="student-filter">Notes <input type="radio" name="categoryfilter" value = "Notes" onChange={handleInput} /></div>    
                <button type = 'submit' className='btn filter-button-style btn-sm'>Filter</button>    
                </form>     
                </div>        
              
            </div>
            <div className="card-body">
                <div className="table-responsive">
                   {show_product}
                </div>
            </div>
            
        </div>
    )
}

export default ViewProduct
