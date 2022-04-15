import React, { useEffect, useState } from 'react';
import './Card.scss'; 
import { Link } from 'react-router-dom'; 


function ShoppingCard(props) {

const current = new Date();


var day = current.getDate().toString().length; 

var today; 

(day == '1') ? today = `${current.getFullYear()}-0${current.getMonth()+1}-0${current.getDate()}` 
:  today = `${current.getFullYear()}-0${current.getMonth()+1}-${current.getDate()}`;


console.log(today); 

  return (
   
    <>
        <div className="shopping-card">

        <figure className="created-label"  data-category = {props.created}>
        <div className="image">
          <img src={props.img} className="shopping-card__img" />
        </div> 
          </figure>
     
          <div className="shopping-card__body">
            <h2 className="shopping-card__title">{props.title}</h2>
           
            <p className="shopping-card__description">{props.description}</p>
            <h3 className="shopping-card__price">{props.saleprice > 0 ? props.saleprice : props.price}</h3>
            {(today > props.delivery) ? <Link to  = {`${props.id}`}><button  type="button" className="shopping-card__btn">Feedback</button> </Link> : <button className="shopping-card__btn"> Delivery date: {props.delivery} </button>}
          </div>
        </div>


        {/* <div class="modal" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h3>Feedback Request</h3>
       
            </div> 
            <div class="modal-body text-center"> <i class="far fa-file-alt fa-4x mb-3 animated rotateIn icon1"></i>
                <h3>Your opinion matters</h3>
                <h5>Help us improve our product? <strong>Give us your feedback.</strong></h5>
                <hr/>
                <h6>Your Rating</h6>
            </div> 
            <div className="feedback-choice">
            <div class="form-check mb-4"> <input name="feedback" type="radio" name = 'feedback' value='Very good' onChange={handleFeedback}/> <label class="ml-3">Very good</label> </div>
            <div class="form-check mb-4"> <input name="feedback" type="radio" name = 'feedback' value='Good' onChange={handleFeedback}/> <label class="ml-3">Good</label> </div>
            <div class="form-check mb-4"> <input name="feedback" type="radio" name = 'feedback' value='Average' onChange={handleFeedback}/> <label class="ml-3">Average</label> </div>
            <div class="form-check mb-4"> <input name="feedback" type="radio" name = 'feedback' value='Bad' onChange={handleFeedback}/> <label class="ml-3">Bad</label> </div>
            <div class="form-check mb-4"> <input name="feedback" type="radio" name = 'feedback' value='Very Bad' onChange={handleFeedback}/> <label class="ml-3">Very Bad</label> </div>
            </div>
           
            <div class="text-center">
                <h4>What could we improve?</h4>
            </div> <textarea type="textarea" placeholder="Your Message" name='feedbacktext' onChange={handleFeedbackText} rows="3"></textarea>
            <div class="modal-footer"> <button type='submit' onClick={(e) => makeFeedback(e)} className='btn bt-primary'>Send <i class="fa fa-paper-plane"> </i> </button> <a href="" class="btn btn-outline-primary" data-dismiss="modal">Cancel</a> </div>
        </div>
        
            </div>
        </div> */}

</>



        
        
      );
  
}

export default ShoppingCard