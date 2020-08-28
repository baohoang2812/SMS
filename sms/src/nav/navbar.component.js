import React, {Component} from 'react';

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
            <nav className="navbar navbar-expand-lg navbar-light bg-light " style={{marginBottom: 10}}>
                    <div className="navbar-nav" style={{marginLeft: "auto", marginRight: 50}}>
                        {
                            localStorage.getItem("authToken") ?
                            <>
                                <a className="nav-item nav-link" href="#">{localStorage.getItem("username")} </a>
                                <button onClick={this.props.logout} className="btn btn-secondary">Logout</button>
                            </> : null
                        }
                    </div>
            </nav>
        );
    }


};



