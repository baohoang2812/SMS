import React, {Component} from 'react';
import regx from "../server_config/regx.config";
import axios from 'axios';

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        // if we have an error string set valid to false
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

const countErrors = (errors) => {
    let count = 0;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (count = count + 1)
    );
    return count;
}

export default class Create extends Component {
    constructor(props) {
        super(props);
        this.uploadImg = this.uploadImg.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadEmptyData = this.loadEmptyData.bind(this);
        this.loadProfileData = this.loadProfileData.bind(this);
        if (props == null) {
            this.loadEmptyData()
        } else {
            this.loadProfileData(props)
        }
    }

    loadProfileData(props) {
        this.state = {
            file: props.file,
            username: props.username,
            phone: props.phone,
            address: props.address,
            formValid: false,
            errorCount: null,
            errors: {
                firstname: '',
                lastname: '',
                phone: '',
                dob: '',
                address: '',
                classes: []
            },
            passwordHolder: '',
            isEmpty: true,
            isNew: false
        };
    }

    loadEmptyData() {
        this.state = {
            file: 'https://i.pinimg.com/736x/5b/b4/8b/5bb48b07fa6e3840bb3afa2bc821b882.jpg',
            username: 'aaa',
            phone: '1230302',
            address: '3131213',
            formValid: false,
            errorCount: null,
            errors: {
                firstname: '',
                lastname: '',
                phone: '',
                dob: '',
                address: '',
                classes: []
            },
            passwordHolder: '',
            isEmpty: true,
            isNew: true
        };
    }



    handleChangeInput = (event) => {
        this.state.isEmpty = false;
        event.preventDefault();
        const {name, value} = event.target;
        let errors = this.state.errors;
        switch (name) {
            case 'firstname':
                errors.firstname =
                    value.length < 1
                        ? 'First Name must not be empty!'
                        : '';
                break;

            case 'lastname':
                errors.lastname =
                    value.length < 1
                        ? 'Last Name must not be empty!'
                        : '';
                break;

            case 'address':
                errors.address =
                    value.length < 1
                        ? 'Address must not be empty!'
                        : '';
                break;
            case 'phone':
                errors.phone =
                    regx.validPhoneRegex.test(value)
                        ? ''
                        : 'Phone is not valid (10 number phone)!';
                break;
        }

        this.setState({errors, [name]: value});
    }

    uploadImg(event) {
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.isEmpty == true) {
            this.setState({formValid: false});
        } else {
            this.setState({formValid: validateForm(this.state.errors)});
        }
        this.setState({errorCount: countErrors(this.state.errors)});
        if (this.state.errorCount == 0) {

            let data = new FormData(event.target);
            data.append('myImage', this.state.file);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            if(this.state.isNew) {
                axios.post("ToCreateApiMethod");
            } else {
                axios.post("ToUpdateApiMethod");
            }



        }
    }

    componentWillMount() {
        var arrClass = [{classname: "class one", id: 1}, {classname: "class two", id: 2}, {
            classname: "class three",
            id: 3
        }];
        this.state.classes = arrClass;
    }

    componentDidMount() {
        const { id } = this.props.match.params;
    }

    render() {
        const textTile = {
            fontSize: '17px'
        };
        const {errors, formValid} = this.state;

        return (
            <div class="container bootstrap snippet" style={{width: 1000}}>
                <div className="row">
                    <div className="col-4">
                        <div className="">
                            <img src={this.state.file}
                                 className="avatar img-circle img-thumbnail" alt="avatar"/>
                            <h6>Upload a different photo...</h6>
                            <input type="file" className="text-center center-block file-upload"
                                   onChange={this.uploadImg}/>
                        </div>
                        <hr/>
                        <br/>
                    </div>

                    <div className="col-8">
                        <ul className="nav nav-tabs">
                            <li className="active"><a data-toggle="tab" href="#home">Home</a></li>
                        </ul>


                        <div className="tab-content">
                            <div className="tab-pane active" id="home">
                                <form className="form" action="#" method="post" id="registrationForm"
                                      onSubmit={this.handleSubmit}>
                                    <div className="form-group">

                                        <div className="col-xs-6">
                                            <label htmlFor="last_name"><h4 style={textTile}>Firstname</h4></label>
                                            <input type="text" className="form-control" name="firstname"
                                                   id="first_name" placeholder="Firstname"
                                                   title="enter Firstname." onChange={this.handleChangeInput}/>
                                        </div>
                                    </div>
                                    {errors.firstname.length > 0 &&
                                    <span className='text-danger'>{errors.firstname}</span>}

                                    <div className="form-group">

                                        <div className="col-xs-6">
                                            <label htmlFor="last_name"><h4 style={textTile}>Lastname</h4></label>
                                            <input type="text" className="form-control" name="lastname"
                                                   id="last_name" placeholder="Lastname"
                                                   title="enter Lastname ." onChange={this.handleChangeInput}/>
                                        </div>
                                    </div>
                                    {errors.lastname.length > 0 &&
                                    <span className='text-danger'>{errors.lastname}</span>}

                                    <div className="form-group">

                                        <div className="col-xs-6">
                                            <label htmlFor="phone"><h4 style={textTile}>Phone</h4></label>
                                            <input type="text" className="form-control" name="phone" id="phone"
                                                   placeholder="enter phone"
                                                   title="enter your phone number if any."
                                                   onChange={this.handleChangeInput}/>
                                        </div>
                                    </div>
                                    {errors.phone.length > 0 &&
                                    <span className='text-danger'>{errors.phone}</span>}

                                    <div className="form-group">

                                        <div className="col-xs-6">
                                            <label htmlFor="address"><h4 style={textTile}>Address</h4></label>
                                            <input type="text" className="form-control" name="address" id="address"
                                                   placeholder="enter address"
                                                   title="enter address"
                                                   onChange={this.handleChangeInput}/>
                                        </div>
                                    </div>
                                    {errors.address.length > 0 &&
                                    <span className='text-danger'>{errors.address}</span>}

                                    <div className="form-group">
                                        <div className="col-xs-6">
                                            <label htmlFor="address"><h4 style={textTile}>Class</h4></label>
                                            <select className="browser-default custom-select custom-select-lg mb-3">
                                                <option selected>Open this select menu</option>
                                                {this.state.classes ? this.state.classes.map(element => {
                                                    return <option value={element.id}>{element.classname}</option>;
                                                }) : null
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="col-xs-12">
                                            <br/>
                                            <button className="btn btn-lg btn-success" type="submit"><i
                                                className="glyphicon glyphicon-ok-sign"></i> Save
                                            </button>
                                        </div>
                                        {this.state.errorCount !== null ? <p className="form-status">Form
                                            is {formValid ? 'valid ✅' : 'invalid ❌'}</p> : 'Form not submitted'}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
