import 'materialize-css/dist/css/materialize.min.css';
import React, {Component} from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Header from './Header'
import Landing from './Landing'

const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>Survey</h2>

class App extends Component {

  componentDidMount(){
    this.props.fetchUser()
  }
  
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path='/' component={Landing}/>
            <Route exact path='/surveys' component={Dashboard} />
            <Route path='/surveys/new' component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
      
    )
  }
}

const MapStateToProps = state => {
  const auth = state.auth
  return {
    auth
  }
}

const MapDispatchToProps = dispatch => bindActionCreators({
  fetchUser: actions.fetchUser
},dispatch)
export default connect(MapStateToProps, MapDispatchToProps)(App)
