
//this function gathers the errors made by users inputs taking thier values as the paramater. 
export default function validateInfo(values) {
    let errors = {};

    //checks if username value is missing, if so add username property with its string value to the error object. 
    if (!values.name.trim()) {
      errors.name = 'Username required';
    }

    if (!values.gender) {
      errors.gender = 'Gender required';
    }
  
    if (!values.password) {
      errors.password = 'Password is required';
      //pasword must be greater than 6. 
    } else if (values.password.length < 6) {
      errors.password = 'Password needs to be 6 characters or more';
    }
  
    if (!values.password2) {
      errors.password2 = 'Password is required';
      //password must match with repeat password for a successful submission. 
    } else if (values.password2 !== values.password) {
      errors.password2 = 'Passwords do not match';
    }
    return errors;
  }





  