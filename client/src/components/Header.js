import React, { Component } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
  constructor(props){
    super(props)
    this.renderContent = this.renderContent.bind(this)
  }
  renderContent() {
    switch(this.props.auth){
      case null:
        return "Still deciding";
      case false:
        return (
          <li>
            <a href="/auth/google">Log in with Google</a>
          </li>
        )
      default:
        return [
          <li key="payment"><Payments/></li>,
          <li key="credits" style={{margin: '0 10px'}}>Credits: {this.props.auth.credits}</li>,
          <li key="logout"><a href="/api/logout">Logout</a></li>
        ]
        
    }
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link 
            to={this.props.auth ? '/surveys' : '/'} 
            className="left brand-logo"
          >
            Emaily
          </Link>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    )
  }
}

const MapStateToProps = ({auth}) => {
  return {
    auth
  }
}

const MapDispatchToProps = dispatch => bindActionCreators({

},dispatch)

export default connect(MapStateToProps,MapDispatchToProps)(Header)
