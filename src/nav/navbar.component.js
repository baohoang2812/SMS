import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import './navbar.component.css';

export default class Nav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authToken: null,
        };
    }

    componentWillMount() {
        this.setState ({authToken : localStorage.getItem("authToken")});
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light nav-parent" style={{marginBottom: 10}}>
                    <div className="navbar-nav">
                        {
                            localStorage.getItem("authToken") ?
                            <>
                                <NavLink to={"/students"}
                                 activeStyle={{
                                    fontWeight: "bold",
                                    color: "red",
                                     marginLeft: '15%'
                                }} className='first-child-nav'>
                                    <div className='child-nav'>
                                        Manage Student
                                    </div>
                                </NavLink>
                                <NavLink to={"/class"}
                                 activeStyle={{
                                     fontWeight: "bold",
                                     color: "red"
                                 }}>
                                    <div className='child-nav'>
                                        Manage Class
                                    </div>
                                </NavLink>
                                <div className="user-info child-nav">
                                    <div className="username">{localStorage.getItem("username")} </div>
                                    <button onClick={this.props.logout} className="btn btn-secondary">Logout</button>
                                </div>
                            </> : null
                        }
                    </div>
            </nav>
        );
    }


};



