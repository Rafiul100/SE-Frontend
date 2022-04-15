import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import swal from "sweetalert";



const   AdminPrivateRoute = ({ children }) => {


const navigate = new useNavigate();
const [Authenticated, setAuthenticated] = useState(false); 
const [loading, setLoading] = useState(true); 


useEffect(() => {
//admin is authenticated by laravel.
  axios.get(`/api/AdminAuthentication`).then(res => {
      if(res.status === 200) { 
            setAuthenticated(true); 
            setTimeout(function(){
                setLoading(false);
           }, 1000);
      }
     
  }); 
    return () => {
        setAuthenticated(false); 

    }
}, [])

//catch any errors if someone else other than the admin tries to access admin privileges
//send appropriate error messages back using sweet alert, and redirect unauthorised users to a page that they can access instead.
axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
    if (err.response.status === 401) {
        swal("Unauthorized", "Please sign in to access page", "warning")
        navigate('/sign-in'); 
    }
        return Promise.reject(err); 
    });

    axios.interceptors.response.use(function (response) { 
        return response; 

    },function (error) { 
        if(error.response.status === 403 && localStorage.getItem('auth_role') == 0) { 
            swal("forbidden", error.response.data.message, "warning");
            navigate('/student-buy');
        } else if (error.response.status === 403 && localStorage.getItem('auth_role') == 2) {
            swal("forbidden", error.response.data.message, "warning");
            navigate('/student-sell');
        }
    
    return Promise.reject(error);
    
}); 


//a few seconds is required for data to be retrived back from laravel, therefore a loading screen is given. 
if(loading) 
{
    return <div class="loader">Loading...</div>
}

//if user is an admin show the children, which is whatever is found between the AdminPrivateRoute tags in app.js.
//if not admin then redirect user to sign in page. 
return  Authenticated ?   children  : <Navigate to="/sign-in" />;

}
    

 

  export default AdminPrivateRoute; 