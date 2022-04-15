import { Navigate } from "react-router-dom";


const PrivateRoute = ({ children }) => {
    const authed = localStorage.getItem('auth_token'); // isauth() returns true or false based on localStorage
    const role = localStorage.getItem('auth_role'); //based on the role of the user signed in, redirect the user to thier correct pages. 
    if (role == 0) { 

      return authed ? <Navigate to="/student-buy-home" /> :  children;

    } else if (role == 1) { 

      return authed ? <Navigate to="/admin" /> :  children;

    } else if (role == 2) { 

      return authed ? <Navigate to="/student-sell-home" /> :  children;
    } else { 

      return children;

    }
    
  }


  export default PrivateRoute; 