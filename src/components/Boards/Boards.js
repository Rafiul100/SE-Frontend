import React from 'react'
import Boarditem from './Boarditem'


function Boards() {
    return (
        <div className='boards'>
            <h1 className='boards-header'>Take a look at some of our essentials</h1>
            <div className="boards__container">
                <div className="boards__wrapper">
                    <ul className="boards__items">
                        <Boarditem 
                        src = 'images/toiletry.jpg'
                        text = 'We sell a range of toiletry items such as towels, soaps and more that are essential for your accomdation.'
                        label = 'Toiletry'
                        path = '/sign-up'
                        /> 
                          <Boarditem 
                        src = 'images/stationary.jpg'
                        text = 'We understand that you need to be stocked up on essentials to achieve the grade you desire and because of this, we will help make the process easier for you.'
                        label = 'Stationary'
                        path = '/sign-up'
                        /> 
                          <Boarditem 
                        src = 'images/notes.jpg'
                        text = 'Want to sell your old notes that you no longer need or buy new notes that will help you study for an upcoming exam? This website will provide you with these needs.'
                        label = 'Notes'
                        path = '/sign-up'
                        /> 
                          
                    </ul>
                </div>
            </div>
            
        </div>
    ); 
}

export default Boards






