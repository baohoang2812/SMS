import React, { Component } from 'react';
import {Route, Switch} from "react-router-dom";
import TableClass from '../class/Table.component';
import TableStudent from '../student/table_student.component';
import Login from '../account/login.component';
import Error from '../error/Error';
import Nav from "../nav/navbar.component";
import axios from "axios";
import Create from '../student/profile.component';

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
        this.setState ({authToken : null});
    }

    handleSubmit(e, username, password) {
        e.preventDefault();
        axios.post("http://localhost:59677/api/auth", {
            username,
            password
        }).then(res => {
            localStorage.setItem("authToken", res.data.token);
            localStorage.setItem("username", res.data.username);
            console.log("username is: " + res.data.username);
            console.log("token is: " + localStorage.getItem("authToken"));
            window.location.reload(false);
            this.props.history.push('/');
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
                        <Route exact path='/class' component={TableClass}/>
                        <Route component={Error}/>
                    </Switch>
                </>
            ) : (
                <>
                    <Nav/>
                    <Switch>
                        <Route path='/' component={() => <Login handleSubmit={this.handleSubmit}/>}/>
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
