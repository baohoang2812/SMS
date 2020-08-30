import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',

            formValid: false,

            errors: {
                username: '',
                password: ''
            },
            isEmpty: true,
            isError: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => {
        event.preventDefault();
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    render() {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <form className="form-signin text-center" onSubmit={(e)=>this.props.handleSubmit(e, this.state.username, this.state.password)}>
                    <img className="mb-4" src="https://simpleicon.com/wp-content/uploads/account.png" alt="" width="72" height="72"/>
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <div className="form-group">
                        <label htmlFor="inputEmail" className="sr-only">Email address</label>
                        <input type="text" id="inputEmail" className="form-control-lg" placeholder="Email address" required name="username"
                               autoFocus onChange={this.handleChange}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputPassword" className="sr-only">Password</label>
                        <input type="password" id="inputPassword" className="form-control-lg" placeholder="Password" name="password"
                               required onChange={this.handleChange}/>
                    </div>

                    {this.props.isError ? <span style={{ color: 'red' }}><i>Invalid Username or Password</i></span> : null}
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                    <p className="mt-5 mb-3 text-muted">&copy; 2017-2020</p>

                </form>
            </div>

        );
    }
}
