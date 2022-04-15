import React, {useEffect, useState} from 'react'
import axios from 'axios'
import ShoppingCard from '../ShoppingCard';
import '../Card.scss'; 
import './StudentBuy.css'; 

function ShoppingHistory() {

const [history, setHistory] = useState([]);
const [Loading, setLoading] = useState(true); 


useEffect(() => { 
        

    let isMounted = true; 

    axios.get(`/api/shopping-history`).then(res=> {
         
        if (isMounted) { 

            if(res.data.status === 200) 

            {
                setHistory(res.data.order); 
                setLoading(false); 
              
               
            } 
        }
    }); 
    return () => { 
        isMounted = false 
    };

}, []);

var listhistory = ''; 

if (history.length > 0) { 

    listhistory = history.map((item) => { 

        return (

            

  
    <ShoppingCard 
    
    img={`http://localhost:8000/${item.image}`} width="175px" alt={item.name}
    title={item.name}
    description= {`${item.category} . ${item.subcategory}`}
    price = {item.price}
    id = {item.id}
    delivery = {item.delivery}
    created = {item.created}
    saleprice = {item.saleprice}
    
    /> 



        )
    
    }); 



} else {

    listhistory =   <div className="card card-body py5 text-center shadow-sm card-style">
                    <h4>Your shopping history is empty</h4>
                    </div>

}



 
if(Loading) {

    return <div class="loader">Loading...</div>
 

} else { 


  return (
  
    <div className='shopping-container'>

    <h1 className='shopping-header'>Shopping History</h1>
    <div className="shopping-wrapper">
    {listhistory}
    </div>

    </div>
  

  )

} 
}

export default ShoppingHistory