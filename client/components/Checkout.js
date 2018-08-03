import React from 'react';
import {Elements} from 'react-stripe-elements';
 
import InjectedCheckoutForm from './CheckoutForm';
 
class Checkout extends React.Component {

    constructor(props) {
        super(props);
    }

  render() {
    return (
      <Elements>
        <InjectedCheckoutForm purchaseMovie={this.props.purchaseMovie} />
      </Elements>
    );
  }
}
 
export default Checkout;