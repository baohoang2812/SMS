import React, { Component } from 'react';
import './popup.css';
import 'antd/dist/antd.css';
import { DatePicker } from 'antd';
import moment from 'moment';
import { update } from '../services/ClassService';
import axios from "axios";
import {API} from "../constants/Constants";

class PopupEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      init: true,
      isFalse: false,
      updateModel: {
        id: '',
        name: '',
        startDate: '',
        endDate: ''
      },
    };
  }

  handleNameChange = (e) => {
    let value = e.target.value;
    this.setState((prevState) => ({
      updateModel: {
        ...prevState.updateModel,
        name: value,
      },
    }));
  };

  handleStartDateChange = (date, dateString) => {
    this.setState((prevState) => ({
      updateModel: {
        ...prevState.updateModel,
        startDate: new Date(date)
      },
    }));
  };

  handleEndDateChange = (date, dateString) => {
    this.setState((prevState) => ({
      updateModel: {
        ...prevState.updateModel,
        endDate: new Date(date)
      },
    }));
  };

  loadClassData = (classId) => {
    this.setState({isEmtpy: false});
    axios.get(API.END_POINT + "classes?ids=" + classId + "&&capacity=1&&pageIndex=1", {
      headers: {Authorization: `Bearer ${localStorage.getItem("authToken")}`}
    }).then(res => {
      this.setState({updateModel: {
          id: res.data.data[0].id,
          name: res.data.data[0].name,
          startDate: res.data.data[0].startDate,
          endDate: res.data.data[0].endDate
        }
      });
    }).catch(error => {
      this.setState({isError: true});
    });
  }

  componentDidMount() {
    this.loadClassData(this.props.item.id);
  }

  render() {
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
    return (
      <>
        <div
          className='popup'
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}
        >
          <h3 style={{ marginTop: '10px' }}>Edit class</h3>
          <form>
            <div>
              <input
                type='text'
                placeholder='Class Name'
                value={this.state.updateModel.name}
                onChange={this.handleNameChange}
                required
                style={{ width: '70%' }}
              />{' '}
              <br />
              <div style={{ marginTop: '5px' }}>
                <label>Start date:</label>{' '}
                <DatePicker
                  value={moment(
                    new Date(this.state.updateModel.startDate),
                    dateFormatList[0]
                  )}
                  onChange={this.handleStartDateChange}
                  format={dateFormatList}
                />
              </div>
              <div>
                <label style={{ marginLeft: '5px', marginTop: '5px' }}>
                  End date:
                </label>{' '}
                <DatePicker
                  value={moment(
                    new Date(this.state.updateModel.endDate),
                    dateFormatList[0]
                  )}
                  onChange={this.handleEndDateChange}
                  format={dateFormatList}
                />
              </div>
            </div>
            {this.props.isFalse ? <span style={{ color: 'red' }}><i>Start Date should be smaller than end date</i></span> : null}
            <p
              style={{
                margin: '0',
                marginTop: '10px',
                marginBottom: '10px',
                padding: '0',
              }}
            >
              Continue ?
            </p>
            <div className='btn btn-success' onClick={(event) => this.props.submit(event, this.state.updateModel)}>
              {this.props.positiveButton}
            </div>
            <div
              className='btn btn-danger'
              onClick={this.props.cancel}
              style={{ marginLeft: '10px' }}
            >
              {this.props.negativeButton}
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default PopupEdit;
