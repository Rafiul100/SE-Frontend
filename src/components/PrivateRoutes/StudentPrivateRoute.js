import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import swal from "sweetalert";



const StudentPrivateRoute = ({ children }) => {

const navigate = new useNavigate();
const [Authenticated, setAuthenticated] = useState(false); 
const [loading, setLoading] = useState(true); 


useEffect(() => {
  axios.get(`/api/StudentAuthentication`).then(res => {
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
        if(error.response.status === 403 && localStorage.getItem('auth_role') == 1) { 
            swal("forbidden", error.response.data.message, "warning");
            navigate('/admin');
        } else if (error.response.status === 403 && localStorage.getItem('auth_role') == 2){
            swal("forbidden", error.response.data.message, "warning");
            navigate('/student-sell');
        }
    
    return Promise.reject(error);
    
}); 


if(loading) 
{
    return <div class="loader">Loading...</div>
}

return  Authenticated ?   children  : <Navigate to="/sign-in" />;

}
    

export default StudentPrivateRoute; 