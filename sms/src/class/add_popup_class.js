import React, {Component} from 'react';
import './add_popup_class.css';
import 'antd/dist/antd.css';
import {DatePicker, Space} from 'antd';
import moment from 'moment';


class popUpAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }

    handleChange = (e) => {
        this.setState({value: e.target.value});
    }

    render() {
        const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
        return (
            <>
                <div className="add_popup_class" style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0',
                }}>
                    <h3 style={{marginTop: '10px'}}>{this.props.isAddClicked ? 'Add new class' : 'Edit class name'}</h3>
                    <form>
                        <div>
                            <input type="text" placeholder="Class Name" value={this.state.value}
                                   onChange={this.handleChange} required
                                   style={{width: '70%'}}/> <br/>
                            <div style={{marginTop: '5px'}}>
                               <label>Start date:</label> <DatePicker defaultValue={moment(new Date(), dateFormatList[0])} format={dateFormatList} />
                            </div>
                            <div>
                                <label style={{marginLeft: '5px', marginTop: '5px'}}>End date:</label> <DatePicker defaultValue={moment(new Date(), dateFormatList[0])} format={dateFormatList} />
                            </div>
                        </div>
                        <p style={{
                            margin: '0',
                            marginTop: '10px',
                            marginBottom: '10px',
                            padding: '0'
                        }}>{this.props.isAddClicked ? 'Continue to Add?' : 'Continue to Edit?'}</p>
                        <button className="btn btn-success"
                                onClick={this.props.add}>{this.props.positiveButton}</button>
                        <button className="btn btn-danger" onClick={this.props.cancel}
                                style={{marginLeft: '10px'}}>{this.props.negativeButton}</button>
                    </form>
                </div>
            </>
        );
    }
};

export default popUpAdd;
