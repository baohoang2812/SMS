import React, {Component} from 'react';

export default class Nav extends Component {

    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this);
        this.state = {
            authToken: null,
        };
    }

    logout(){
        localStorage.removeItem("authToken");
        localStorage.removeItem("username");
        this.setState ({authToken : null});
    }

    componentWillMount() {
        this.setState ({authToken : localStorage.getItem("authToken")});
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light ">
                    <div className="navbar-nav" style={{marginLeft: "auto", marginRight: 50}}>
                        {
                             this.state.authToken == null
                            ? <button onClick={this.logout} className="btn btn-primary">Login</button>
                            :
                            <>
                                <a className="nav-item nav-link" href="#">{localStorage.getItem("username")} </a>
                                <button onClick={this.logout} className="btn btn-secondary">logout</button>
                            </>
                        }
                    </div>
            </nav>
        );
    }


};



