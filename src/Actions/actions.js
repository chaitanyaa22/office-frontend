import axios from 'axios'

export const getData = (user, others) => {return {type: 'get_data', payload : {user, others}}}

export const getForms = (departmentNo) => {
    let data = {departmentNo: departmentNo}
    let req = axios.post('https://officebackend.herokuapp.com/getform', data)
    return dispatch => {req.then(res=>{dispatch({type: 'get_forms',payload: res.data})})}}

export const done = () => {return {type: 'done'}}

export const reloaded = () => { return {type: 'reloaded'}}

export const getSentForms = (email) => {
    let data = {email: email}
    let req = axios.post('https://officebackend.herokuapp.com/sentform', data)
    return dispatch => {req.then(res=>{dispatch({type: 'get_sent_forms',payload: res.data})})}}

export const logout = () => {return {type: 'logout'}}