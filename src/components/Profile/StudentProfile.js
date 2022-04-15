import React, {useState, useEffect, useRef} from 'react'; 
import './Profile.css'
import axios from 'axios';
import swal from 'sweetalert';
import {Link, useParams, useNavigate} from 'react-router-dom';

function StudentProfile() {

  

    const navigate = new useNavigate();
    const id = localStorage.getItem("auth_id")


    const [image, setImage] = useState([]); 

    const [showImage, setShowImage] = useState({ 
        image: "http://bootdey.com/img/Content/avatar/avatar1.png"
    })

    const [errors, setError] = useState([]); 
    const [loading, setLoading] = useState([true])
    const [ChangeProfile, setChangeProfile] = useState({
        username: '',
        firstname: '',
        lastname: '',
        university: '', 
        phoneNo: '',
        address: '', 
        city: '',
        postcode: '', 

    }); 
    


    //gets the students value from input field and store them into thier corressponding name to be used in laravel.  
    const handleInput = (e) => { 
        e.persist(); 
        setChangeProfile({...ChangeProfile, [e.target.name]:e.target.value}); 
        }


    const handleImage = (e) => { 
   
        //setting up profile image to show before saving changes
              const reader = new FileReader(); 
              reader.onload = () => { 
                  if(reader.readyState === 2) { 
                    setShowImage({ image: reader.result}); 
                  }
              }

              reader.readAsDataURL(e.target.files[0]);
              setImage({ image: e.target.files[0]});  
       
        }

        const inputFile = useRef(null); 


        //use a button instead of input tag to get files
        const onButtonClick = () => {
            // `current` points to the mounted file input element
        inputFile.current.click();
    
          };
  
        const EditProfile = (e) => { 
            e.preventDefault();  
        
            //console.log(ChangeProfile); 
            console.log(image); 
        
            const formData = new FormData(); 
           

        
         
            formData.append('username', ChangeProfile.username); 
            formData.append('firstname', ChangeProfile.firstname); 
            formData.append('lastname', ChangeProfile.lastname); 
            formData.append('university', ChangeProfile.university);
            formData.append('phoneNo', ChangeProfile.phoneNo); 
            formData.append('address', ChangeProfile.address); 
            formData.append('city', ChangeProfile.city); 
            formData.append('postcode', ChangeProfile.postcode); 
            formData.append('image', image.image); 
           
    
            console.log(id); 

            console.log(ChangeProfile);
        
            //axios updates the database with the new user information 
            axios.post(`/api/update-profile/${id}`, formData).then(res=> { 
                if (res.data.status === 200) { 
                     
                    swal("Success", res.data.message, "success"); 
                    console.log(res.data.product); 
                     
                    
                
                }
                else if (res.data.status === 422) { 
                    swal("missing or incorrect field inputs", "", "error");
                    setError(res.data.errors); 
        
                } else if (res.data.status === 404) { 
                    swal("Error", res.data.message, "error");
                    navigate('/student-buy'); 
                }
            
            });


        } 


        useEffect(() => {
 
 
            axios.get(`/api/view-profile/${id}`).then(res => { 
                if (res.data.status === 200) { 
                    setChangeProfile(res.data.user); 
                    setShowImage({ image: `http://localhost:8000/${res.data.image}`}); 
                    console.log(res.data.user); 
                   
                   
                } else if (res.data.status === 404) { 
                    swal("Error", res.data.message, "error"); 
                    navigate('/student-buy'); 
                }
                setLoading(false);
        
            });
        

            
        }, [navigate])


        if (loading) { 
            return <div class="loader">Loading...</div>
        }

    

      
        

  return (
    <div className='profile-container'> 
    <div class="container-xl px-4 mt-4">
    <hr class="mt-0 mb-4"/>
    <div class="row">
        <div class="col-xl-4">
       
            <div class="card mb-4 mb-xl-0 card-style">
                <div class="card-header">Profile Picture</div>
                <div class="card-body text-center">
                 
                    <img class="img-account-profile rounded-circle mb-2" src={showImage.image} alt=""/>
               
                    <div class="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
         
                    <button class="btn btn-dark"  onClick={onButtonClick}>Upload new image</button>
                    <input type="file" name = "image"  ref={inputFile}  className="form-control file-input" accept='image/*' onChange={handleImage}/>
                </div>
            </div>
        </div>
        <div class="col-xl-8">
            <div class="card mb-4 card-style">
                <div class="card-header">Account Details -<span className='profile-information'>your details would allow for faster essential purchases and/or help other students to buy your products.</span></div>
                <div class="card-body">
                    <form onSubmit={EditProfile} encType="multipart/form-data">
                        
                     
                        <div class="mb-3">
                            <label class="small mb-1" for="inputUsername">Username (how your name will appear to other students on the site)</label>
                            <input type="text" name = "username" className="form-control" onChange={handleInput} value={ChangeProfile.username} />
                            <small className="text-danger">{errors.username}</small>
                        </div>
                 
                        <div class="row gx-3 mb-3">
                      
                            <div class="col-md-6">
                                <label class="small mb-1" for="inputFirstName">First name</label>
                                <input class="form-control" id="inputFirstName" type="text" name = "firstname" onChange={handleInput}  value={ChangeProfile.firstname} />
                            </div>
                       
                            <div class="col-md-6">
                                <label class="small mb-1" for="inputLastName">Last name</label>
                                <input class="form-control" id="inputLastName" type="text"  name = "lastname" onChange={handleInput}  value={ChangeProfile.lastname} />
                            </div>
                        </div>
                     
                        <div class="row gx-3 mb-3">
                           
                            <div class="col-md-6">
                                <label class="small mb-1">University</label>
                               
                                <input type="text" name = "university" className="form-control" onChange={handleInput} value={ChangeProfile.university} />
                            </div>
                 
                            <div class="col-md-6">
                                <label class="small mb-1" for="inputLocation">Phone Number</label>
                                <input class="form-control" id="inputLocation" type="tel" name = "phoneNo" onChange={handleInput} value={ChangeProfile.phoneNo} />
                                <small className="text-danger">{errors.phoneNo}</small>
                            </div>
                        </div>
                      
                        <div class="mb-3">
                            <label class="small mb-1" for="inputEmailAddress">Full Address</label>
                            <input class="form-control" id="inputEmailAddress" type="text" name = 'address' onChange={handleInput} value={ChangeProfile.address} />
                        </div>
                     
                        <div class="row gx-3 mb-3">
                
                            <div class="col-md-6">
                                <label class="small mb-1" for="inputPhone">City</label>
                                <input class="form-control" id="inputPhone" type="tel" name = "city" onChange={handleInput} value={ChangeProfile.city}/>
                            </div>
                           
                            <div class="col-md-6">
                                <label class="small mb-1" for="inputBirthday">Post Code</label>
                                <input class="form-control" id="inputBirthday" type="text"  name = "postcode" onChange={handleInput} value={ChangeProfile.postcode}/>
                            </div>
                        </div>
                     
                        <button class="btn btn-dark" type="submit">Save changes</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
  )
}

export default StudentProfile