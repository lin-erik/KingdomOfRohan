import React from 'react';
import {CardElement} from 'react-stripe-elements';
 
class CardSection extends React.Component {



    render() {
        return (
            <label>
                Enter your card details to purchase a movie trailer!
                <CardElement style={{base: {fontSize: '18px'}}} />
            </label>
        );
    }
}
export default CardSection;