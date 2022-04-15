import React, {useState} from 'react';
import './Card.scss'; 
import {useParams, useNavigate, Link} from 'react-router-dom';
import axios from 'axios'; 
import swal from 'sweetalert';
import './StudentPages/StudentBuy.css'; 


function FeedbackForm() {



  const navigate = useNavigate(); 
  const [feedback, setFeedback] = useState([]); 
  const [feedbacktext, setFeedbackText] = useState([]); 
  const [product, setProductId] = useState([]); 
  const [errors, setErrors] = useState([]); 


  const {id} = useParams();


  const handleFeedback = (e) => { 
    e.persist(); 
    setFeedback({...feedback, [e.target.name]:e.target.value}); 
  }

  const handleFeedbackText = (e) => { 
    e.persist(); 
    setFeedbackText({...feedbacktext, [e.target.name]:e.target.value}); 
 
  }


    const makeFeedback = (e) => { 

      e.preventDefault(); 

      const data = {
        classified: feedback.feedback,
        text: feedbacktext.feedbacktext, 
        product_id: id,
      }


      axios.post(`/api/feedback`, data).then(res => { 
        if(res.data.status === 200) { 
            swal("Feedback Placed", res.data.message, "success"); 
            navigate('/student-buy/shopping-history'); 
           
        } else { 
            swal("Fields are missing or do not meet constraits", "", "error");  
            setErrors(res.data.errors); 
        }

    }); 

      

    }



  return (

    <div className='feedback-background'>
    <div class="container mt-5 mb-5 d-flex justify-content-center">
    <div class="feedback-card">

    <Link to = '/student-buy/shopping-history'>
    <button className='btn btn-dark'>Go back</button>
    </Link>
        <div class="p-3">
            <div class="first text-center"> <img src="https://i.imgur.com/KCcF6WN.png" width="80"/>
            
                <h2 class="mt-2">Feedback Request</h2>
                <p class="text-black-100">Your opinion matters. Give us your feedback.</p>
            </div>
            <div class="feedback-container border p-3 rounded">
                <div class="row feedback-buttons">
                    <div class="feedback-div"> <label class="feedback-radio"> <input type="radio"  name = 'feedback' value="Very good" onChange={handleFeedback}/> <span className='feedback-text'>Very good</span> </label> </div>
                    <div class="feedback-div"> <label class="feedback-radio"> <input type="radio"  name = 'feedback' value="Good" onChange={handleFeedback}/> <span className='feedback-text'>Good</span> </label> </div>
                    <div class="feedback-div"> <label class="feedback-radio"> <input type="radio"  name = 'feedback' value="Average" onChange={handleFeedback}/> <span className='feedback-text'>Average</span> </label> </div>
                    <div class="feedback-div"> <label class="feedback-radio"> <input type="radio"  name = 'feedback' value="Bad" onChange={handleFeedback}/> <span className='feedback-text'>Bad</span> </label> </div>
                    <div class="feedback-div"> <label class="feedback-radio"> <input type="radio"  name = 'feedback' value="Very Bad" onChange={handleFeedback}/> <span className='feedback-text'>Very Bad</span> </label> </div>
                    <small className='text-danger'>{errors.classified}</small>
                </div>
                <div class="mt-4"> <textarea class="area form-control" rows="7" placeholder="add comments" name='feedbacktext' onChange={handleFeedbackText}> </textarea> </div>
                <small className='text-danger'>{errors.text}</small>
                <div type = 'submit' class="mt-4 text-right"> <button class="btn btn-success submit-button" onClick={makeFeedback}>Submit</button> </div>
            </div>
        </div>
    </div>
</div>
</div> 
  )
}

export default FeedbackForm