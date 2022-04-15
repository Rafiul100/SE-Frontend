
import {rest} from 'msw'; 


const handlers  = [
    rest.post("http://localhost:8000/api/view-product", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({id: 1, name:'papermate', 
                                            price: '1.99', saleprice: '1.50', 
                                            stock: '2', subcategory: 'pens', type: 'none'}))

    })
];

export {handlers, rest}; 