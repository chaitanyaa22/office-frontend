import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getSentForms, done, reloaded } from '../Actions/actions'
import { Redirect } from 'react-router-dom'
import socketIO from 'socket.io-client'

let socket = socketIO('https://officebackend.herokuapp.com')

export class SentRequest extends Component {
    componentDidMount() {
        this.props.getSentForms(this.props.user.email)
        socket.on('Edited', result => {
            this.props.getSentForms(this.props.user.email)
            if (result.createdBy === this.props.user.email) {
                this.props.getSentForms(this.props.user.email)
            }
        })
    }
    render() {
        return (
            <div className="col row justify-content-center mt-5">
                {
                    this.props.user.email === undefined
                        ? <Redirect to="/" />
                        : ""
                }
                <div className="col-lg-5 col-xs-12 mt-3">
                    {this.props.sentForms.map((e, i) => {
                        if (e.createdBy === this.props.user.email) {
                            return <div className="card my-2" key={i}>
                                <div className="card-body">
                                    <h5 className="card-title">{e.createdTo}</h5>
                                    <span className={`float-right px-1 rounded text-light 
                                    ${e.isActedOn
                                            ? e.isApproved ? "bg-success" : "bg-danger"
                                            : "bg-warning"}
                                        `}>
                                        {e.isActedOn
                                            ? e.isApproved ? "Accepted" : "Rejected"
                                            : "Pending"}
                                    </span>
                                    <h6 className="text-muted">From: You</h6>
                                    <div className="mt-4">
                                        <p className="card-text border rounded bg-light pt-3 pb-2 px-2">{e.message}</p>
                                    </div>
                                </div>
                            </div>
                        }
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { user, others, sentForms, reload } = state
    return { user, others, sentForms, reload }

}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getSentForms, done, reloaded }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SentRequest)
