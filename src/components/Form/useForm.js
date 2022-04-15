import axios from "axios";
import { useState, useEffect } from "react";






//useform consists of all the custom hooks used to implement form validations, 
//handle user inputs and what would happen when submitting the form.
const useForm = (callback, validateInfo) => {
 

const [values, setValues] = useState({
    name: '', 
    gender: '',
    email: '',
    //address: '',
    university: '',  
    password: '',
    password2: '',
    email_error: '',
  
}); 
const [errors, setErrors] = useState({})
//set to false and only set to true once user has submitted the form. 
const [isSubmitting, setIsSubmitting] = useState(false)


//set the values of user inputs to its correct value name for backend purposes. 
const handleChange = e => { 
    e.persist(); 
    const {name, value} = e.target;
    setValues({
        //spread operator which lists whatever is already found in the values state
        //and includes the additional values to be added. 
        ...values, 
        [name]: value
    });
};


//when submitting prevent the form to refresh itself which is a defualt action. 
//errors would be gathered from a function called validateInfo taking the user values as the parameter.  
const handleSubmit = e => { 

    console.log(values); 
 
    e.preventDefault();
    setErrors(validateInfo(values)); 

    //user inputs from the registration form is stored in a object called data for backend manipulation.
    const data = {
        name: values.name, 
        gender: values.gender, 
        email: values.email,
        university: values.university,  
        //address: values.address, 
        password: values.password,
        password2: values.password2,
    }


   
    axios.get('/sanctum/csrf-cookie').then(response => {
        //axios is a library that allows to create HTTP requests that are found externally (laravel). 
       //the data is given to a api path where it is manipulated/stored and the results are sent back.  
       axios.post(`/api/register`, data).then(res =>  {
                if(res.data.status === 200) { 
                    //this callback calls upon the submitform function once correct data is passed by the user
                    //submitform function changes components to show a successful registration component to the user.
                    callback();
                }  else {
                    
                    //the database checks if users email is already stored in the database, since emails are unique.
                    //if so send error message which can be shown to the user asking for a different email. 
                    setValues({...values, email_error: res.data.email_error})
                }
       
       });
       
       });


}; 


//user input are then returned addressing any errors made alongside other functionalities.  
return {handleChange, values, handleSubmit, errors}; 

};



export default useForm; 