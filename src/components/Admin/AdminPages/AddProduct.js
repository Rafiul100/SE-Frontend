import axios from 'axios';
import React, {useState} from 'react'; 
import swal from 'sweetalert';
import './Admin.css'; 
import {Link} from 'react-router-dom';


function AddProduct() {


    const [addProduct, setAddProduct] = useState({
        name: '',
        price: '',
        saleprice: '0', 
        stock: '',
        category: '', 
        subcategory: '',
        type: '', 
        delivery: '', 
        description: '',
       
    });

const [image, setImage] = useState([]); 
const [errors, setError] = useState([]); 
const [checkboxes, setCheckBoxes] = useState([]);

//handle the checkbox data, and store thier checked or unchecked value into the checkboxes usestate.
const handleCheckbox = (e) => { 
e.persist(); 
setCheckBoxes({...checkboxes, [e.target.name]:e.target.checked}); 
}


const handleInput = (e) => { 
    e.persist(); 
    setAddProduct({...addProduct, [e.target.name]:e.target.value}); 
}


const handleImage = (e) => { 
    setImage({ image: e.target.files[0]}); 
}


function show() {
    if (document.getElementById('stationary').checked) { 
        document.getElementById('show-sta').style.display = 'block';
        document.getElementById('show-toi').style.display = 'none';
        document.getElementById('show-book').style.display = 'none';
        document.getElementById('show-fur').style.display = 'none';

    }  else if  (document.getElementById('toiletry').checked)  { 
        document.getElementById('show-toi').style.display = 'block';
        document.getElementById('show-sta').style.display = 'none';
        document.getElementById('show-book').style.display = 'none';
        document.getElementById('show-fur').style.display = 'none';

    } else if (document.getElementById('furniture').checked) { 

        document.getElementById('show-fur').style.display = 'block';
        document.getElementById('show-sta').style.display = 'none';
        document.getElementById('show-book').style.display = 'none';
        document.getElementById('show-toi').style.display = 'none';

    }

        else { 
            document.getElementById('show-book').style.display = 'block';
            document.getElementById('show-sta').style.display = 'none';
            document.getElementById('show-toi').style.display = 'none';
            document.getElementById('show-fur').style.display = 'none';
        }
    return; 
}



const submitProduct = (e) => { 
    e.preventDefault();  

    console.log(addProduct); 
    //console.log(image)

    const formData = new FormData(); 
   
    //required
    formData.append('name', addProduct.name); 
    formData.append('price', addProduct.price); 
    formData.append('stock', addProduct.stock); 
    formData.append('category', addProduct.category);
    formData.append('subcategory', addProduct.subcategory); 
    formData.append('type', addProduct.type); 
    formData.append('delivery', addProduct.delivery); 
    formData.append('saleprice', addProduct.saleprice); 

    //optional
    formData.append('image', image.image); 
    formData.append('description', addProduct.description); 
    formData.append('featured', checkboxes.featured ? '1':'0'); 
    formData.append('sale', checkboxes.sale ? '1':'0'); 
    formData.append('status', checkboxes.status ? '1':'0'); 

    console.log(formData); 

    axios.post(`/api/add-product`, formData).then(res=> { 
        if (res.data.status === 200) { 
            swal("Success", res.data.message, "success"); 
            //once a successful product add, set the state of checkboxes, errors and image as empty. this is so that admin can add another product if required. 
            setAddProduct ({...addProduct, 
                name: '',
                price: '',
                saleprice: '', 
                stock: '',
                category: '',
                subcategory: '',
                type: '', 
                delivery: '', 
                description: '',
                   
            });
            setError([]); 
            setCheckBoxes({...checkboxes, 
            featured: '',
            popular: '',
            status: '', });
            setImage({...image,
                image: '',
            });

            console.log(res.data.count); 
      
        }
        else if (res.data.status === 422) { 
            swal("Required fields are missing and/or does not meet constraints", "", "error");
            setError(res.data.errors); 
        } else if (res.data.status === 404) {

            swal("Warning", res.data.message, "warning");

        }
    
    });

}

    return (
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h3>Add Product</h3>
                
                    <Link to = "/admin/view-product" className='btn btn-dark btn-sm float-end'>View Product</Link>
                </div>
                <div className="card-body">
                <form onSubmit={submitProduct} encType="multipart/form-data">

                <ul className="nav nav-tabs add-container" id="myTab" role="tablist">
                <li className="nav-item required" role="presentation">
                <button className="nav-link active" id="required-tab" data-bs-toggle="tab" data-bs-target="#required" type="button" role="tab" aria-controls="required" aria-selected="true">Section 1</button>
                </li>
                <li className="nav-item optional" role="presentation">
                <button class="nav-link" id="optional-tab" data-bs-toggle="tab" data-bs-target="#optional" type="button" role="tab" aria-controls="optional" aria-selected="false">Section 2</button>
                </li>
                </ul>
                <div class="tab-content" id="myTabContent">

                <div class="tab-pane card-body border fade show active" id="required" role="tabpanel" aria-labelledby="required-tab">
                
                <div className="form-group mb-3">
                    <label>Name:</label>
                    <input type="text" name = "name" className="form-control" onChange={handleInput} value={addProduct.name} />
                    <small className="text-danger">{errors.name}</small>
                </div>
                <div className="form-group mb-3">
                    <label>Price (??):</label>
                    <input type="text" name = "price" className="form-control" onChange={handleInput} value={addProduct.price} />
                    <small className="text-danger">{errors.price}</small>
                </div>
                <div className="form-group mb-3">
                    <label>Optional (if not given, keep a default value of 0) - Sale Price (??):</label>
                    <input type="text" name = "saleprice" className="form-control"  onChange={handleInput} value={addProduct.saleprice} />
                    <small className="text-danger">{errors.saleprice}</small>
                </div>
                <div className="form-group mb-3">
                    <label>Stock:</label>
                    <input type="text" name = "stock" className="form-control" onChange={handleInput} value={addProduct.stock} />
                    <small className="text-danger">{errors.stock}</small>
                </div>
                <div className="form-group mb-3 radio-category-container">
                    <label>Category:</label> 
                    <div className="radio-category"><span className='category-span'>Stationary</span> <input type="radio" name = "category" id="stationary" value = "Stationary" onClick={show} onChange={handleInput} /> </div>
                    <div className="radio-category"><span className='category-span'>Toiletry</span><input type="radio" name = "category" id="toiletry" value = "Toiletry" onClick={show} onChange={handleInput}/>  </div>
                    <div className="radio-category"><span className='category-span'>Furniture</span><input type="radio" name = "category" id="furniture" value = "Furniture" onClick={show} onChange={handleInput}/>  </div>
                    <div className="radio-category"><span className='category-span'>Book</span> <input type="radio" name = "category" id ="books" value = "Books"  onClick={show} onChange={handleInput}/> </div> 
                </div>
                <div id="show-sta">
                    <label>Sub Category:</label>
                    <select name="subcategory"  className="form-control" onChange={handleInput} value={addProduct.subcategory}>
                        <option>Stationaries</option>
                        <option value="Pens">Pens</option>
                        <option value="Filing and Folders">Filing and Folders</option>
                        <option value="Pencil Cases">Pencil Cases</option>
                        <option value="Pads and Paper">Pads and Paper</option>
                        <option value="Calenders/Planners">Calenders/Planners</option>
                        <option value="Calculators">Calculators</option>
                    </select>
                    <small className="text-danger">{errors.subcategory}</small>
                </div>

                <div id="show-toi" >
                    <label>Sub Category:</label>
                    <select name="subcategory" className="form-control" onChange={handleInput} value={addProduct.subcategory}>
                    <option>Toiletry</option>
                    <option value="Toothbrushes">Toothbrush/paste</option>
                    <option value="ShowerGel and Shampoo">Shower Gel/Shampoo</option>
                    <option value="Razors and Saving Cream">Razor/Shaving Cream</option>
                    <option value="GroomingKit">Grooming Kit</option>
                    <option value="Towels">Towel</option>
                    </select>
                    <small className="text-danger">{errors.subcategory}</small>
                </div> 

                <div id="show-fur" >
                    <label>Sub Category:</label>
                    <select name="subcategory" className="form-control" onChange={handleInput} value={addProduct.subcategory}>
                    <option>Furniture</option>
                    <option value="Duvet and pillows">Duvet and pillows</option>
                    <option value="lamp">Lamp</option>
                    <option value="Pins and WallBoard">Pins and WallBoard</option>
                    <option value="mirror">Mirror</option>
                    <option value="Basket">Basket</option>
                    <option value="Extention lead and adaptors">Extention and adaptors</option>
                    <option value="Storage boxes">Storage boxes</option>
                    </select>
                    <small className="text-danger">{errors.subcategory}</small>
                </div>

                <div id="show-book" >
                    <label>Sub Category:</label>
                    <select name="subcategory" className="form-control" onChange={handleInput} value={addProduct.subcategory}>
                        <option>Books</option>
                        <option value="Academic">Academic</option>
                        <option value="Fiction">Fiction</option>
                    </select>
                    <small className="text-danger">{errors.subcategory}</small>
                </div> <br />

                <div className="form-group mb-3">
                    <label>Delivery Estimate (Days):</label>
                    <input type="text" name = "delivery" className="form-control" onChange={handleInput} value={addProduct.delivery} />
                    <small className="text-danger">{errors.delivery}</small>
                </div>

                </div>



                <div class="tab-pane card-body border fade" id="optional" role="tabpanel" aria-labelledby="optional-tab">
                
                <div className="form-group mb-3">
                    <label>Image:</label>
                    <input type="file" name = "image" className="form-control" onChange={handleImage}/>
          
                    <small className="text-danger">{errors.image}</small>
                </div>
            
                <div className="form-group mb-3">
                    <label>(optional) Type:</label>
                    <input type="text" name = "type" className="form-control" onChange={handleInput} value={addProduct.type} />
                </div>
                
                <div className="form-group mb-3">
                    <label>(optional) Description:</label>
                    <input type="text" name = "description" className="form-control" onChange={handleInput} value={addProduct.description} />
                </div>
                <p className='text-danger'>Featured and Sale checkboxes determines which products are shown on the student home page (4 products per checkbox).</p>
                <div className="row">
                <div className="col-md-4 form-group mb-3">
                    <label>Featured (checked=shown)</label>
                    <input type="checkbox" name = "featured" className="w-50 h-50" onChange={handleCheckbox} defaultChecked={checkboxes.featured === 1 ? true:false}/>
                </div>

                <div className="col-md-4 form-group mb-3">
                    <label>On Sale (checked=shown) </label>
                    <input type="checkbox" name = "sale" className="w-50 h-50" onChange={handleCheckbox} defaultChecked={checkboxes.sale === 1  ? true:false} />
                </div>

                <div className="col-md-4 form-group mb-3">
                    <label>Satus (checked=Hidden)</label>
                    <input type="checkbox" name = "status" className="w-50 h-50 status-checkbox" onChange={handleCheckbox} defaultChecked={checkboxes.status === 1 ? true:false} />
                </div>
                </div>
               
                </div>
                </div>
                <button type = "submit" className="btn btn-primary px-4 mt-2">Submit</button>
                </form>
            
                
                
             


                </div>
            </div>
        </div>

    )
}

export default AddProduct
