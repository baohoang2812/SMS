import React, {Component} from 'react';
import axios from 'axios';
import moment from "moment";
import {DatePicker} from "antd";
import { API } from '../constants/Constants';

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
        this.loadProfileData = this.loadProfileData.bind(this);
        this.getClassNameById = this.getClassNameById.bind(this);
        this.getUnselectedClass = this.getUnselectedClass.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.state = {
            imageUrl: 'https://economix.fr/assets/image/anonymous.gif?1.0',
            id: null,
            firstname: null,
            lastname: '',
            phone: '',
            address: '',
            classId: null,
            classes: [],
            dob: new Date(),
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
            isNew: true,
            image: null
        };
    }

    loadClasses() {
        axios.get(API.END_POINT + "classes?capacity=50&&pageIndex=1",{
            headers: {Authorization: `Bearer ${localStorage.getItem("authToken")}`}
        }).then(res => {
            this.setState({
                classes : res.data.data
            });
        }).catch(error => {
            this.setState({isError: true});
        });
    }

    loadProfileData(userId) {
        this.setState({isEmtpy: false});
        axios.get(API.END_POINT + "students?ids=" + userId + "&&capacity=1&&pageIndex=1", {
            headers: {Authorization: `Bearer ${localStorage.getItem("authToken")}`}
        }).then(res => {
            this.setState({
                imageUrl: res.data.data[0].imagePath ? res.data.data[0].imagePath : 'https://economix.fr/assets/image/anonymous.gif?1.0',
                firstname: res.data.data[0].firstName,
                lastname: res.data.data[0].lastName,
                phone: res.data.data[0].phone,
                address: res.data.data[0].address,
                dob: res.data.data[0].doB,
                classId: res.data.data[0].classId,
                isNew: false
            });
        }).catch(error => {
            this.setState({isError: true});
        });
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
                    /(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(value)
                        ? ''
                        : 'Please enter a valid phone number';
                break;
        }

        this.setState({errors, [name]: value});
    }

    uploadImg(event) {
        this.setState({
            imageUrl: URL.createObjectURL(event.target.files[0]),
            image: event.target.files[0]
        });
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
            data.append('myImage', this.state.imageUrl);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            const {firstname, lastname, phone, address, classId, dob, id, image} = this.state;
            let formData = new FormData();
            formData.append('firstname', firstname);
            formData.append('lastname', lastname);
            formData.append('phone', phone);
            formData.append('address', address);
            formData.append('classId', classId);
            formData.append('dob', new Date(dob).toISOString());
            formData.append('id', id);
            formData.append('image', image);
            if (this.state.isNew) {
                axios.post( API.END_POINT + "students", formData,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`
                    }
                }).then(res => {
                    this.props.history.push('/students');
                }).catch(error => {
                    this.setState({isError: true});
                });
            } else {
                axios.put(API.END_POINT + "students/" + id, formData,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`
                    }
                }).then(res => {
                    window.alert("Student is updated!");
                    this.props.history.push('/students');
                }).catch(error => {
                    this.setState({isError: true});
                });
            }
        }
    }

    handleDateChange = (date, dateString) => {
        this.setState((prevState) => ({
            dob: date
        }));
    };

    componentWillMount() {

    }

    getClassNameById(classId) {
        for (var i = 0; i < this.state.classes.length; i++) {
            if(this.state.classes[i].id == classId) {
                return this.state.classes[i].name;
            }
        }
    }

    getUnselectedClass(classId) {
        var result = [];
        for (var i = 0; i < this.state.classes.length; i++) {
            if(this.state.classes[i].id != classId) {
                result[i] = this.state.classes[i];
            }
        }
        return result;
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.state.id = id;
        this.loadClasses();
        if(id != null) {
         this.loadProfileData(id);
        }
    }

    handleCancel = (event) => {
        this.props.history.push('/students');
    }

    render() {
        const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
        const textTile = {
            fontSize: '17px'
        };
        const {errors, formValid} = this.state;
        return (
            <div className="container bootstrap snippet" style={{width: 1000}}>
                <div className="row">
                    <div className="col-4">
                        <div className="">
                            <img src={this.state.imageUrl}
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
                            <li className="active"></li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane active" id="home">
                                <form className="form" action="#" method="post" id="registrationForm"
                                      onSubmit={this.handleSubmit}>
                                    <div className="form-group">

                                        <div className="col-xs-6">
                                            <label htmlFor="firstname"><h4 style={textTile}>Firstname</h4>
                                            </label>
                                            <input type="text" className="form-control" name="firstname"
                                                   id="firstname" placeholder="Firstname"
                                                   title="enter Firstname."
                                                   onChange={this.handleChangeInput}
                                                   value={this.state.firstname}/>
                                        </div>
                                    </div>
                                    {errors.firstname.length > 0 &&
                                    <span className='text-danger'>{errors.firstname}</span>}

                                    <div className="form-group">

                                        <div className="col-xs-6">
                                            <label htmlFor="lastname"><h4 style={textTile}>Lastname</h4>
                                            </label>
                                            <input type="text" className="form-control" name="lastname"
                                                   id="lastname" placeholder="Lastname"
                                                   title="enter Lastname ."
                                                   onChange={this.handleChangeInput}
                                                   value={this.state.lastname}/>
                                        </div>
                                    </div>
                                    {errors.lastname.length > 0 &&
                                    <span className='text-danger'>{errors.lastname}</span>}

                                    <div className="form-group">

                                        <div className="col-xs-6">
                                            <label htmlFor="phone"><h4 style={textTile}>Phone</h4></label>
                                            <input type="text" className="form-control" name="phone"
                                                   id="phone"
                                                   placeholder="enter phone"
                                                   title="enter your phone number if any."
                                                   onChange={this.handleChangeInput}
                                                   value={this.state.phone} required/>
                                        </div>
                                    </div>
                                    {errors.phone.length > 0 &&
                                    <span className='text-danger'>{errors.phone}</span>}

                                    <div className="form-group">

                                        <div className="col-xs-6">
                                            <label htmlFor="address"><h4 style={textTile}>Address</h4>
                                            </label>
                                            <input type="text" className="form-control" name="address"
                                                   id="address"
                                                   placeholder="enter address"
                                                   title="enter address"
                                                   onChange={this.handleChangeInput}
                                                   value={this.state.address}/>
                                        </div>
                                    </div>
                                    {errors.address.length > 0 &&
                                    <span className='text-danger'>{errors.address}</span>}

                                    <div className="form-group">
                                        <div className="col-xs-6">
                                            <label htmlFor="address"><h4 style={textTile}>Class</h4></label>
                                            <select onChange={this.handleChangeInput}
                                                className="browser-default custom-select custom-select-lg mb-3" name="classId">
                                                {this.state.classId ?
                                                    (<option selected value={this.state.classId}>{this.getClassNameById(this.state.classId)}</option>) :
                                                    (<option selected>Please choose class</option>)}
                                                {this.state.classes ? this.getUnselectedClass(this.state.classId).map(element => {
                                                    return <option
                                                        value={element.id}>{element.name}</option>;
                                                }) : null
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-xs-6">
                                            <label htmlFor="dob"><h4 style={textTile}>Date Of Birth</h4></label><br/>
                                            <DatePicker style={{width: 650, fontSize: 30}}
                                                value={this.state.dob ? moment(new Date(new Date(this.state.dob).toString()), dateFormatList[0]) :
                                                    moment(new Date(), dateFormatList[0])}
                                                onChange={this.handleDateChange}
                                                format={dateFormatList}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="col-xs-12">
                                            <br/>
                                            <button className="btn btn-lg btn-success" type="submit"><i
                                                className="glyphicon glyphicon-ok-sign"></i> Save
                                            </button>
                                            <button className="btn btn-lg btn-danger" type="submit" style={{marginLeft: '10px'}} onClick={this.handleCancel}><i
                                                className="glyphicon glyphicon-ok-sign"></i> Cancel
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

        )
    }
}
