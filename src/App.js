import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Userpage from './Components/Userpage'

export class App extends Component {
  componentDidMount(){
  }
  render() {
    return (
      <div className="h-100">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/user/:user" component={Userpage} />
          </Switch>
        </BrowserRouter>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {}

}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
