import React from 'react';
import { injectStripe } from 'react-stripe-elements';

//import AddressSection from './AddressSection';
import CardSection from './CardSection';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.props.stripe
      .createToken({ name: 'Jenny Rosen' })
      .then(({ token }) => {});
    this.props.purchaseMovie();

    this.setState({
      submitted: true
    });
  }

  render() {
    if (!this.state.submitted) {
      return (
        <form onSubmit={this.handleSubmit}>
          <CardSection />
          <button>Confirm order</button>
        </form>
      );
    } else {
      return <div>Thank you for your purchase. Check your Purchased tab!</div>;
    }
  }
}

export default injectStripe(CheckoutForm);
