import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import swal from 'sweetalert';
import './Admin.css'; 

function ViewProduct() {


    const [ViewProduct, setProduct] = useState([]); 
    
    const [Loading, setLoading] = useState(true); 
    const [adminFilter, setAdminFilter] = useState([]); 
    const [selected, setSelected] = useState('');
    //const [ChangeText, setText] = useState('Delete'); 
    //const [ChangeColour, setColour] = useState('btn btn-sm btn-danger'); 
    //const [ChangeStatus, setStatus] = useState([]); 
    const [search, setSearch] = useState(""); 




    const handleInput = (e) => { 

        setAdminFilter({...adminFilter, [e.target.name]:e.target.value})

    }


    const changeFilter = (e) => { 
        e.preventDefault(); 

        const data = {
            category: adminFilter.categoryfilter, 
         }


         console.log(data); 


        axios.post(`/api/admin-filter`, data).then(res => {
            if(res.data.status === 200) { 
                console.log(res.data.product); 
                setProduct(res.data.product); 
               
              
             
            } else if (res.data.status === 404){ 
                swal("Error", res.data.message, "error")

            }

            })
    }


const viewProduct = () => { 

    axios.get(`/api/view-product`).then(res=> { 
        if(res.data.status === 200) { 
            setProduct(res.data.products); 
            setLoading(false);
        
        }
    })

    setLoading(true);
    setSelected('show-admin-view'); 

}    



useEffect(() => {

viewProduct(); 


}, [])

 

const viewStudent = () => { 

    axios.get(`/api/view-allstudentproduct`).then(res=> { 
        if(res.data.status === 200) { 
            setProduct(res.data.products); 
            setLoading(false);
        
        }
    })

    setLoading(true);
    setSelected('show-student-view'); 

}


//show student name when clicking view student product button
const student_data = (item) => { 
 
     if (selected == 'show-student-view') { 
         return   <td>{item.student_name}</td>
     } else if (selected == 'show-admin-view') { 
         return null; 
     } 

     setLoading(false);
 
}

/*const changeStatus = (item, i) => { 


    const user_id = localStorage.getItem('auth_id');

            if (ChangeText == 'Add' && item.id == i) { 
                setStatus({ status: '1',
            })
            return <button className='btn btn-sm btn-danger'>Delete</button>

            } else if (ChangeText == 'Delete' && item.id == i) { 
               
                setStatus({ status: '0',
             })

             return <button className='btn btn-sm btn-success'>Add</button>
            }
        
            const data = { 
                status: ChangeStatus.status,
                user_id: user_id,
                item: item.id, 
            }

    axios.post(`/api/change-status`, data).then(res =>  {
    }); 

} */

//change the edit link from admin to student and vice versa
const edit_data = (item) => { 

    if (selected == 'show-student-view') { 
        return  <td><Link to = {`/admin/edit-student-product/${item.id}`} className='btn btn-success btn-sm'>Edit</Link></td>
    } else if (selected == 'show-admin-view') { 
        return  <td><Link to = {`/admin/edit-product/${item.id}`} className='btn btn-success btn-sm'>Edit</Link></td>
    }

    setLoading(false);

} 



const change_search = () => { 

    if (selected == 'show-student-view') { 
        return ( <>
            <label className='search-student-label' htmlFor="search">Search By Student Username:</label>
            <input type="text" id = "search" className='search-student' name = "search" placeholder='Search...' onChange={e => setSearch(e.target.value)}/>
            </>
            )
    } else if (selected == 'show-admin-view') {

       return  (<form onSubmit={changeFilter}  className="admin-filters"action="">
        {/* <div className="admin-filter">All <input type="radio" name="categoryfilter"  value = {null} onChange={handleInput}  /></div> */}
          <div className="admin-filter">Stationary <input type="radio" name="categoryfilter"  value = "Stationary" onChange={handleInput}  /></div> 
          <div className="admin-filter">Toiletry <input type="radio" name="categoryfilter" value = "Toiletry" onChange={handleInput}  /> </div>
          <div className="admin-filter">Furniture <input type="radio" name="categoryfilter" value = "Furniture" onChange={handleInput}  /> </div>
          <div className="admin-filter">Books  <input type="radio" name="categoryfilter" value = "Books" onChange={handleInput} /></div>    
          <button type = 'submit' className='btn filter-button-style btn-sm'>Filter</button>    
          </form>   )
        
    }
    setLoading(false);
}


const deleteProduct = (e, id) => { 

    e.preventDefault(); 

    //the specific delete button which the student has clicked is stored.  
    const clicked = e.currentTarget;
    //changes the text of the button that was clicked from delete to removing
    clicked.innerText = "Removing"; 

    axios.delete(`/api/delete-admin-item/${id}`).then(res => { 

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

} 


else { 
    var product_status = ''; 
    var product_featured = ''; 
    var product_sale = ''; 
    show_product = ViewProduct.filter(val => {
        if (search === '' ) { 
            return val; 
        } else if (
            //checks if student name in database matches or includes the characters found in the search field in lowercase. 
            val.student_name.toLowerCase().includes(search.toLocaleLowerCase())
        )  { 
            return val;
        }
    } ) .map((item, i) => { 
       //change the view to show if the product has the status of being hidden(deleted) or shown.
       if (item.status == '1' && selected == 'show-admin-view') { 

        product_status = <div className='hidden-status-container'> Hidden
        <button onClick={(e) => deleteProduct(e, item.id)} className='btn btn-danger btn-sm'>Delete</button>
        </div>

       } else if (item.status == '1')  { 
           product_status = 'Hidden'
       } else { 
           product_status = 'Shown'
       }


       if (item.featured == "1") { 
        product_featured =  "Featured"
       } else {
        product_featured =  null; 
       }


       if (item.sale == "1") { 
        product_sale =  " Sale"
       } else {
        product_sale =  null; 
       }


        return (
            <tr key={i}> 
                {student_data(item)}
                <td>{item.name}</td>
                {/*location of the image is found through a laravel path where it is stored  */}
                <td><img src={`http://localhost:8000/${item.image}`} width="125px" alt={item.name} /></td>
                <td>{item.category}</td>
                <td>{item.subcategory}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                {/*edit link will direct admin to a unique endpoint based on what product has been selected for editing*/}
                {edit_data(item, i)}
                <td>{product_status} <br />
                    {product_featured} 
                    {product_sale}</td>
            </tr>
            );
        }); 
}


//show student column if view student product button is clicked
const student_column = () => { 

    if (selected == 'show-student-view') { 
        return <th>Student Username</th>
    } else if (selected == 'show-admin-view') { 
        return null; 
    }

    setLoading(false);

} 


/*const edit_column = () => { 


    if (selected == 'show-student-view') { 
        return <th>Add/Delete</th>
    } else if (selected == 'show-admin-view') { 
        return <th>Edit</th>
    }

} */


    return (
        <div className="card px-4 mt-3">
            <div className="card-header">
                <h3>View Product </h3>
                <div className="admin-functionalities">
                <button type = 'submit' className='btn btn-danger btn-sm float-end view-student' onClick={viewStudent}>View Student Product</button> 
                <button className='btn btn-dark btn-sm float-end view-admin' onClick={viewProduct}> View Admin Product</button>
                {change_search()}
                </div>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered table-striped table-dark table-hover">
                        <thead>
                            <tr>
                                {student_column()}
                                <th>Product Name</th>
                                <th>Image</th>
                                <th>Category</th>
                                <th>Sub-Category</th>
                                <th>Product Description</th>
                                <th>Price</th>
                                <th>Edit</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        {show_product}
                        </tbody>
                    </table>
                </div>
            </div>
            
        </div>
    )
}

export default ViewProduct
