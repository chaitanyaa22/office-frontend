import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

export class Signup extends Component {
    state = {
        departments: [],
        name: "",
        email: "",
        password: "",
        cfpassword: "",
        departmentNo: 0,
        getHome: false
    }
    async componentDidMount() {
        let req = await axios.get('https://officebackend.herokuapp.com/department')
        this.setState({
            departments: req.data
        })

    }

    async signUp() {
        const { name, email, password, cfpassword, departmentNo } = this.state
        if (name !== "" && email !== "" && password !== "" && cfpassword !== "" && departmentNo !== 0) {
            if (password === cfpassword) {
                let data = { name, departmentNo, email, password }
                try {
                    let req = await axios.post('https://officebackend.herokuapp.com/signup', data)
                    if(req.status === 201){
                        this.setState({
                            getHome: true
                        })
                    }
                }
                catch (e) {
                    if(e.response.status === 409){
                        window.alert('User already exists')
                    }
                }
            }
            else {
                window.alert('Passwords dont match')
            }
        }
        else {
            window.alert('Inputs are empty')
        }
    }


    render() {
        console.log(this.state)
        return (
            <div className="container">
                {this.state.getHome
                    ? <Redirect to="/" />
                    : ""
                }
                <div className="row justify-content-center my-5">
                    <div className="col-lg-4 col-xs-10 bg-light rounded border p-5 my-auto">
                        <h3 className="font-weight-lighter mb-3 text-center">Sign up</h3>
                        <hr />
                        <input className="form-control rounded mt-3" type="text" placeholder="Name" onChange={(e) => this.setState({ name: e.target.value })} />
                        <input className="form-control rounded mt-3" type="email" placeholder="Email" onChange={(e) => this.setState({ email: e.target.value })} />
                        <select className="form-control rounded mt-3" onChange={(e) => this.setState({ departmentNo: e.target.value })}>
                            <option value="">Select Department</option>
                            {this.state.departments.map((e, i) => {
                                return <option value={e.departmentNo} key={i}>{e.departmentName}</option>
                            })}
                        </select>
                        <input className="form-control rounded mt-3" type="password" placeholder="Password" onChange={(e) => this.setState({ password: e.target.value })} />
                        <input className="form-control rounded mt-3" type="password" placeholder="Password" onChange={(e) => this.setState({ cfpassword: e.target.value })} />
                        <div className="mt-3">
                            <button type="button" className="btn btn-sm btn-warning rounded" onClick={() => this.signUp()}>Register</button>
                            <span className="float-right">
                                <Link to="/"><span><small>Log In</small></span></Link>

                            </span>
                        </div>


                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
