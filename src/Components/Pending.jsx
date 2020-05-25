import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { bindActionCreators } from 'redux'
import { getForms, done, reloaded } from '../Actions/actions'


export class Pending extends Component {

    componentDidMount() {
        this.props.getForms(this.props.user.departmentNo)
        this.props.reloaded()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.reload !== prevProps.reload) {
            this.componentDidMount()
        }
    }
    async decide(id, val) {
        let data = {
            isApproved: val,
            id: id,
            email: this.props.user.email
        }
        try {
            let req = await axios.put('https://officebackend.herokuapp.com/editform', data)
            if (req.status === 200) {
                this.props.done()
            }
        }
        catch (e) {
            console.log(e)
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
                    {this.props.forms.map((e, i) => {
                        if (e.createdTo === this.props.user.email && e.isActedOn === false) {
                            return <div className="card my-2" key={i}>
                                <div className="card-body">
                                    <h5 className="card-title">{e.createdByDepartment}</h5>
                                    <h6 className="text-muted">From: {e.createdByName}</h6>
                                    <h6 className="text-muted">To: You</h6>
                                    <div className="mt-2">
                                        <p className="card-text border rounded bg-light pt-3 pb-2 px-2">{e.message}</p>
                                    </div>
                                    <div className="mt-3">
                                        <button className="btn m-1 float-right btn-sm btn-light border" onClick={() => this.decide(e._id, false)}>Decline</button>
                                        <button className="btn m-1 float-right btn-sm btn-primary text-light" onClick={() => this.decide(e._id, true)}>Approve</button>
                                    </div>
                                </div>
                            </div>
                        }
                    })}
                    {this.props.forms.reverse().map((e, i) => {
                        
                        if (e.createdTo !== this.props.user.email && e.isActedOn === false) {
                            return <div className="card my-2" key={i}>
                                <div className="card-body">
                                    <h5 className="card-title">{e.createdByDepartment}</h5>
                                    <h6 className="text-muted">From: {e.createdByName}</h6>
                                    <h6 className="text-muted">To: {e.createdTo}</h6>
                                    <div className="mt-2">
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
    const { user, others, forms, reload } = state
    return { user, others, forms, reload }

}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getForms, done, reloaded }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Pending)
