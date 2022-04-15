import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Button} from '../Button/Button'; 
import './Navbar.css'; 
import swal from 'sweetalert';
import '../../App.css'; 
import {AiOutlineShoppingCart} from 'react-icons/ai'; 




function Navbar() {

   const navigate = new useNavigate()

    const [click, setClick] = useState(false); 
    const [button, setButton] = useState(true);
    const handleClick = () => setClick(!click);
    const closeMobileMenu =  () => setClick(false);
    const [Username, setUserName] = useState([]); 

    const [showImage, setShowImage] = useState([]); 

    const role = localStorage.getItem("auth_role")
    const id = localStorage.getItem("auth_id")


    //if the width is greater than or equal to 960, then change the button from hamburger to sign up
    const showButton = () => { 
        if (window.innerWidth <= 960) { 
        setButton(false); 
        } else { 
            setButton(true);
        }
    }; 

    const Logout = (e) => { 
        e.preventDefault();


        //remove data in local storage when signing out
        //a post request is required to be sent to laravel to remove users token from the database when signing out.  
        axios.post(`/api/signout`).then(res => { 
            if(res.data.status === 200) { 
                localStorage.removeItem('auth_id')
                localStorage.removeItem('auth_token')
                localStorage.removeItem('auth_name')
                localStorage.removeItem('auth_role')
               
                //swal is a library which allows for quick alrets to be created, a success alert is shown when signing out. 
                swal("Success", res.data.message, "success");
                navigate('/');  
            }
        });

    }


    useEffect(() => {



        if (role == 0 ) {
  
 
        axios.get(`/api/view-profile/${id}`).then(res => { 
            if (res.data.status === 200) { 

                console.log(res.data.image); 

                if (res.data.image == 'noimage') { 

                    setShowImage({image: "http://bootdey.com/img/Content/avatar/avatar1.png"})
        
                    

                } else { 
                
                setShowImage({ image: `http://localhost:8000/${res.data.image}`}); 
               
                }

                setUserName(res.data.user)
                console.log(res.data.user); 
               
            } else if (res.data.status === 404) { 
                swal("Error", res.data.message, "error"); 
                navigate('/student-buy'); 
            }
           
    
        });

    } 
    

        
    }, [navigate])


    var username = localStorage.getItem('auth_name'); 

    var ChangeNav = '';
    if (!localStorage.getItem('auth_token'))
    {
       ChangeNav = (
           //if you is not signed in, therefore local storage is not storing a token, show homepage. 
           <>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
    
    
        <li className='nav-item'>
            <Link to = '/sign-in' className='nav-links-mobile' onClick={closeMobileMenu}>
                Sign In
            </Link> 
            <Link to = '/register' className='nav-links-mobile' onClick={closeMobileMenu}>
                Register
            </Link>
        </li>
        </ul>
        <div className='buttons'>
        <Link to = '/sign-in' className='btn-mobile'> 
        {button && <Button
                        className = 'btn' 
                        buttonSize={'btn--medium'} 
                        buttonStyle = 'btn--outline'>SIGN IN
                    </Button>} 
        </Link>
        <Link to = '/register' className='btn-mobile'> 
        {button && <Button 
                        className = 'btn'
                        buttonSize={'btn--medium'}   
                        buttonStyle = 'btn-background-slide'>REGISTER
                    </Button>}
        </Link>
        </div>

      </>
       );
    }
    else {  
        //Student that buys nav 
       if  (localStorage.getItem('auth_role') == 0) { 
        ChangeNav = (
            <>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
        <div className="nav-student">
        <li className='nav-item'>
            <Link to = '/student-buy' className='nav-links student-home' onClick={closeMobileMenu}>
                Home
            </Link>
        </li>
      

        <li class="nav-item show dropdown-mobile dropdown-container">
       
        <a class="nav-item-essentials dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Buy Essentials
        </a>
        <div class="dropdown-menu menu-mobile" aria-labelledby="dropdownMenuLink">
        <Link to = '/student-buy/new-essentials' className='nav-links essential-link-mobile' onClick={closeMobileMenu}> New Essentials </Link>
        <Link to = '/student-buy/used-essentials' className='nav-links essential-link-mobile' onClick={closeMobileMenu}>Used Essentials </Link>
     
        </div> 
        </li>


        <div class="dropdown show dropdown-desktop">
        <a class="nav-item nav-item-essentials dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Buy Essentials
        </a>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <Link to = '/student-buy/new-essentials' className='nav-links link-middle' onClick={closeMobileMenu}> New Essentials </Link>
        <Link to = '/student-buy/used-essentials' className='nav-links link-middle' onClick={closeMobileMenu}>Used Essentials </Link>
        </div>
        </div>
        
        <div class="dropdown show dropdown-desktop">
        <a class="nav-item nav-item-essentials dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Sell Essentials
        </a>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <Link to = '/student-sell' className='nav-links link-middle' onClick={closeMobileMenu}>
                    Ordered products
        </Link>
        <Link to = '/student-sell/add-product' className='nav-links link-middle' onClick={closeMobileMenu}>
                    Add products
        </Link>
        <Link to = '/student-sell/view-product' className='nav-links link-middle' onClick={closeMobileMenu}>
                    View products
        </Link>
        </div>
        </div>


        <li class="dropdown nav-item show dropdown-mobile">
        <a class="nav-item-essentials dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Sell Essentials
        </a>
        <div class="dropdown-menu menu-mobile" aria-labelledby="dropdownMenuLink">
        <Link to = '/student-sell' className='nav-links essential-link-mobile' onClick={closeMobileMenu}>
                    Ordered products
        </Link>
        <Link to = '/student-sell/add-product' className='nav-links essential-link-mobile' onClick={closeMobileMenu}>
                    Add products
        </Link>
        <Link to = '/student-sell/view-product' className='nav-links essential-link-mobile' onClick={closeMobileMenu}>
                    View products
        </Link>
        </div>
        </li>


        <li className='nav-item'>
            <Link to = '/student-buy/shopping-history' className='nav-links' onClick={closeMobileMenu}>
                Shopping History
            </Link>
        </li>

        <li className='nav-item cart-desktop'>
            <Link to = '/student-buy/cart' className='nav-links' onClick={closeMobileMenu}>
                <AiOutlineShoppingCart color='white'  fontSize="1.5em"/>
            </Link>
        </li>

        <li className='nav-item cart-mobile'>
            <Link to = '/student-buy/cart' className='nav-links' onClick={closeMobileMenu}>
              Cart
            </Link>
        </li>

        <li className='nav-item nav-profile'>
            <Link to = '/student/profile' className='nav-links' onClick={closeMobileMenu}>
                Profile
            </Link>
        </li>
            <li className='nav-item'>
            <button className='nav-links-mobile' onClick={Logout}>Logout</button>
            </li>
            </div>
            </ul>
        


            <div class="dropdown show dropdown-welcome">
	  <button class="btn btn-profile dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
      <img className='nav-profile-img'  src={showImage.image} alt=""/>
      <span className='username'>{Username.username} </span>
	  </button>
	  <ul class="dropdown-menu dropdown-colour" aria-labelledby="dropdownMenuButton1">
		<li> <Link  to = '/student/profile' class="dropdown-item" href="#">Profile </Link></li>
        <li> <Link  to = '/student/whishlist' class="dropdown-item" href="#">Whishlist </Link></li>
        <li> <Link  to = '/student/subscriptions' class="dropdown-item" href="#">Subscriptions </Link></li>
		<li>  {button &&  <a class="dropdown-item" onClick={Logout}>Logout</a> }</li>
	  </ul>
	</div>          
          </>
          ); 
        //Admin nav
        } else if (localStorage.getItem('auth_role') == 1) { 
            ChangeNav = (
                <>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
                <Link to = '/admin' className='nav-links padding-link' onClick={closeMobileMenu}>
                        Ordered products
                </Link>
            </li>
            <li className='nav-item'>
                <Link to = '/admin/add-product' className='nav-links padding-link' onClick={closeMobileMenu}>
                    Add products
                </Link>
            </li>
            <li className='nav-item'>
                <Link to = '/admin/view-product' className='nav-links padding-link' onClick={closeMobileMenu}>
                    View products
                </Link>
            </li>
            <li className='nav-item'>
            <button className='nav-links-mobile' onClick={Logout}>Logout</button>
            </li>
            </ul>
            <div class="dropdown show dropdown-welcome">
	  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
      <span className='username'>Welcome {username} ! </span>
	  </button>
	  <ul class="dropdown-menu dropdown-colour" aria-labelledby="dropdownMenuButton1">
	
		<li>  {button &&  <a class="dropdown-item" onClick={Logout}>Logout</a> }</li>
	  </ul>
	</div>  
              </>
          );
          
          
          
          /*student sell nav
        }  else if(localStorage.getItem('auth_role') == 2) { 
            ChangeNav = (
                <>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
                <Link to = '/student-sell' className='nav-links' onClick={closeMobileMenu}>
                        Ordered products
                </Link>
            </li>
            <li className='nav-item'>
                <Link to = '/student-sell/add-product' className='nav-links' onClick={closeMobileMenu}>
                    Add products
                </Link>
            </li>
            <li className='nav-item'>
                <Link to = '/student-sell/view-product' className='nav-links' onClick={closeMobileMenu}>
                    View products
                </Link>
            </li>
            <li className='nav-item'>
            <button className='nav-links-mobile' onClick={Logout}>Logout</button>
            </li>
            </ul>
            <div class="dropdown">
	  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
      <span className='username'>Welcome {username} ! </span>
	  </button>
	  <ul class="dropdown-menu dropdown-colour" aria-labelledby="dropdownMenuButton1">
		<li> <Link  to = '/student-buy/profile' class="dropdown-item" href="#">Profile </Link></li>
		<li>  {button &&  <a class="dropdown-item" onClick={Logout}>Logout</a> }</li>
	  </ul>
	</div>  
              </>
          ); */

        }
        
    }

    
    //this runs everytime this component rerenders. 
    //it helps to remove the register and sigin up button for desktop versions when a user refreshes.
    useEffect(() => {
        showButton(); 
    }); 


    //whenever the window is resized, call the showButton method. 
    window.addEventListener('resize', showButton); 


    return (
      <>
      <nav className="navbar">
          <div className="navbar-container">
              <Link to = "/" className = "navbar-logo">
                  <div className="navbar-logo-container" onClick={closeMobileMenu}>
                  Student-Essentials <i className="fas fa-graduation-cap"/> 
                  </div>
          
              </Link>
              
              <div className='menu-icon' onClick={handleClick}>
                  <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
              </div>
              {ChangeNav}
  
          </div>
      </nav>
      
      
      </>
    ); 
}

export default Navbar; 

