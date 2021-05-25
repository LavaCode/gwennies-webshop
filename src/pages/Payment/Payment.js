import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Payment.css';

function Payment() {
    const history = useHistory();

    useEffect(() => {
        setTimeout(() => {
            history.push('/');
        }, 10000);
    })

    return (
        <div>
            <h1 className="payment-title">If this site was real, you would be forwarded to the payment site. However, since this is a total fake site, we will bring you back to the home page in a couple of seconds...</h1>
        </div>
    )
}

export default Payment; 
