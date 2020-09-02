import React, { Component } from 'react';
import {Route, Switch} from "react-router-dom";
import TableClass from '../class/Table.component';
import TableStudent from '../student/table_student.component';
import Login from '../account/login.component';
import Error from '../error/Error';
import Nav from "../nav/navbar.component";
import axios from "axios";
import Create from '../student/profile.component';
import {API} from "../constants/Constants";

class Body extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authToken: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.logout = this.logout.bind(this);
    }

    logout(){
        localStorage.removeItem("authToken");
        localStorage.removeItem("username");
        this.setState ({authToken : null, isError: false});
    }

    handleSubmit(e, username, password) {
        e.preventDefault();
        axios.post(API.END_POINT + "auth", {
            username,
            password
        }).then(res => {
            localStorage.setItem("authToken", res.data.token);
            localStorage.setItem("username", res.data.username);
            console.log(window.location.href.indexOf('student') == -1);
            console.log(window.location.href.indexOf('class') == -1);
            if (window.location.href.indexOf('student') == -1 && window.location.href.indexOf('class') == -1) {
                window.location.href = window.location.href + 'students';
            } else {
                window.location.href = window.location.href;
            }
        }).catch(error => {
            this.setState({isError: true});
        });
    }

    render() {
        const RouteForAuthorization = localStorage.getItem('authToken') ?
            (
                <>
                    <Nav logout={this.logout}/>
                    <Switch>
                        <Route exact path='/' component={TableStudent}/>
                        <Route exact path='/students' component={TableStudent}/>
                        <Route path='/student/:id' component={Create}/>
                        <Route path='/student' component={Create}/>
                        <Route exact path='/class' component={TableClass}/>
                        <Route component={Error}/>
                    </Switch>
                </>
            ) : (
                <>
                    <Nav/>
                    <Switch>
                        <Route path='/' component={() => <Login handleSubmit={this.handleSubmit} isError={this.state.isError}/>}/>
                    </Switch>
                </>
            );
        return (
            <>
                {RouteForAuthorization}
            </>
        );
    }
}

export default Body;
