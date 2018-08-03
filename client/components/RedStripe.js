import React from 'react';
import STRIPE_API_KEY from '../../stripe.js'
import {StripeProvider} from 'react-stripe-elements';
import Checkout from './Checkout';

class Stripe extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <StripeProvider apiKey={STRIPE_API_KEY}>
                <Checkout />
            </StripeProvider>
        )
    }
}

export default Stripe;
//hi