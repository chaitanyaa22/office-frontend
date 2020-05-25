import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { getSentForms} from '../Actions/actions'
import {bindActionCreators} from 'redux'


export class Form extends Component {
    state = {
        departments: [],
        departmentNo: 0,
        createdTo: "",
        message: "",
        userDepartment: ""
    }
    componentDidMount() {
        axios.get('https://officebackend.herokuapp.com/department').then(res => {
            let userDepartment = res.data.filter((e, i) => {
                return e.departmentNo === this.props.user.departmentNo
            })
            this.setState({
                departments: res.data,
                userDepartment: userDepartment[0].departmentName
            })
        })

        this.props.getSentForms(this.props.user.email)

    }
    async sendForm() {
        if (this.state.createdTo !== "" && this.state.departmentNo !== 0 && this.state.message !== "" & this.state.userDepartment !== "") {
            let data = {
                createdTo: this.state.createdTo,
                createdBy: this.props.user.email,
                createdByName: this.props.user.name,
                departmentNo: this.state.departmentNo,
                createdByDepartment: this.state.userDepartment,
                message: this.state.message
            }
            try {
                let req = await axios.post('https://officebackend.herokuapp.com/form', data)
                if (req.status === 200) {
                    window.alert('Sent!')
                    this.setState({
                        departmentNo: 0,
                        createdTo: "",
                        message: ""
                    })
                }
            }
            catch (e) {
                console.log(e)
            }

        }
        else {
            window.alert('Empty inputs')
        }
    }
    render() {
        return (
            <div className="col row justify-content-center">
                {
                    this.props.user.email === undefined
                        ? <Redirect to="/" />
                        : ""
                }
                <div className="col-lg-5 col-xs-12 mt-5 p-3">
                    <h3 className="font-weight-lighter mb-3">Create a Form</h3>
                    <hr />
                    <select className="form-control mt-3" value={this.state.departmentNo} onChange={(e) => this.setState({ departmentNo: e.target.value })}>
                        <option value={0}>Select Department</option>
                        {this.state.departments.map((e, i) => {
                            let a
                            if (e.departmentNo !== this.props.user.departmentNo) {
                                a = <option value={e.departmentNo} key={i}>{e.departmentName}</option>
                            }
                            return a
                        })}
                    </select>
                    <select className="form-control mt-3" value={this.state.createdTo} onChange={(e) => this.setState({ createdTo: e.target.value })}>
                        <option value="">Select User</option>
                        {this.props.others.map((e, i) => {
                            let a
                            if (this.state.departmentNo === e.departmentNo && this.state.departmentNo !== 0) {
                                a = <option value={e.email} key={i}>{e.name}</option>
                            }
                            return a
                        })}
                    </select>
                    <textarea className="form-control mt-3" rows="7" value={this.state.message} onChange={(e) => this.setState({ message: e.target.value })}></textarea>
                    <button className="btn btn-primary text-light mt-3 w-100" onClick={() => this.sendForm()}>Send</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { user, others } = state
    return { user, others }

}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getSentForms}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
