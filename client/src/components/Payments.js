import React, { Component } from 'react'
import {connect} from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'
import * as actions from '../actions'
import {bindActionCreators} from 'redux'
class Payments extends Component {
  render() {
    return (
        // amount is cents
      <StripeCheckout 
        name="Emaily"
        description="$5 for 5 email credits"
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY || process.env.STRIPE_PUBLISHABLE_KEY}
      >
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    )
  }
}
const MapDispatchToProps = dispatch => bindActionCreators({
    handleToken: actions.handleToken
},dispatch)
export default connect(null, MapDispatchToProps)(Payments)

