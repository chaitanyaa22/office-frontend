import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {getForms, done, reloaded} from '../Actions/actions'

export class Completed extends Component {
    
    componentDidMount() {
        this.props.getForms(this.props.user.departmentNo)
        this.props.reloaded()
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.reload !== prevProps.reload){
            this.componentDidMount()
        }
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
                        {this.props.forms.reverse().map((e, i) => {
                            let a
                            if (e.createdTo === this.props.user.email && e.isActedOn === true) {
                                a = <div className="card my-2" key={i}>
                                    <div className="card-body">
                                        <h5 className="card-title">{e.createdByDepartment}</h5>
                                        <span className={`float-right px-1 rounded text-light ${e.isApproved ? "bg-success" : "bg-danger"}`}>
                                            {e.isApproved ? "Accepted" : "Rejected"}
                                        </span>
                                        <h6 className="text-muted">From: {e.createdByName}</h6>
                                        <h6 className="text-muted">To: You</h6>
                                        <div className="mt-2">
                                            <p className="card-text border rounded bg-light pt-3 pb-2 px-2">{e.message}</p>
                                        </div>
                                    </div>
                                </div>
                            }
                            return a
                        })}
                    </div>
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { user, others, forms, reload} = state
    return { user, others, forms, reload}

}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getForms, done, reloaded}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Completed)
