import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from './Navbar'
import { Route, Redirect, Switch } from 'react-router-dom'
import Form from './Form'
import Pending from './Pending'
import Completed from './Completed'
import SentRequest from './SentRequest'

export class Userpage extends Component {
    render() {
        return (
            <div>
                {this.props._id === undefined
                    ? <Redirect to="/" />
                    : <div>
                        <Redirect from={`/`} to={`/user/${this.props._id}/form`}></Redirect>
                        <Navbar />
                        <Switch>
                            <Route path="*/form" component={Form} />
                            <Route path="*/pending" component={Pending} />
                            <Route path="*/completed"component={Completed} />
                            <Route path="*/sentrequest" component={SentRequest} />
                        </Switch>
                    </div>
                }

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { _id } = state.user
    return {
        _id
    }

}

const mapDispatchToProps = (dispatch) => {
    return {}

}

export default connect(mapStateToProps, mapDispatchToProps)(Userpage)
