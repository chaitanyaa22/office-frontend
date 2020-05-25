import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { getData, getForms} from '../Actions/actions'
import { bindActionCreators } from 'redux'

import axios from 'axios'

export class Login extends Component {
    state = {
        email: "",
        password: "",
        getIn: false,
        userId: ""
    }
    async logIn() {
        const { email, password } = this.state
        if (email !== "" && password !== "") {
            try {
                let data = { email, password }
                let req = await axios.post('https://officebackend.herokuapp.com/login', data)
                if (req.status === 200) {
                    const { user, others } = req.data
                    this.props.getData(user, others)
                    this.props.getForms(user.departmentNo)
                    this.setState({
                        getIn: true,
                        userId: req.data.user._id
                    })
                    
                }
                else if (req.status === 404) {
                    console.log(req)
                }
            }
            catch (e) {
                if (e.response.status === 401) {
                    window.alert('Password is incorrect')
                }
                else if (e.response.status === 404) {
                    window.alert('User not found. Please register first.')
                }
            }
        }
        else {
            window.alert('Inputs are empty')
        }
    }
    render() {
        return (
            <div className="container">
                {
                    this.state.getIn
                        ? <Redirect to={`/user/${this.state.userId}`} />
                        : ""
                }
                <div className="row justify-content-center my-5">
                    <div className="col-lg-4 col-xs-10 my-auto bg-light border rounded p-5">
                        <h3 className="font-weight-lighter mb-3 text-center">Login</h3>
                        <hr />
                        <input className="form-control rounded mt-3" type="email" placeholder="Email" onChange={(e) => this.setState({ email: e.target.value })} />
                        <input className="form-control rounded mt-3" type="password" placeholder="Password" onChange={(e) => this.setState({ password: e.target.value })} />
                        <div className="mt-3">
                            <button type="button" className="btn btn-sm btn-warning rounded" onClick={() => this.logIn()}>Log in</button>
                            <span className="float-right">
                                <Link to="/signup"><span><small>Register</small></span></Link>

                            </span>
                        </div>


                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {user, forms} = state
    return {user, forms}
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getData, getForms}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
