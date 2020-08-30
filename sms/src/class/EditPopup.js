import React, { Component } from 'react';
import './popup.css';
import 'antd/dist/antd.css';
import { DatePicker } from 'antd';
import moment from 'moment';
import { update } from '../services/ClassService';

class PopupEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      init: true,
      isFalse: false,
      updateModel: {
        id: props.item.id,
        name: props.item.name ? props.item.name : [],
        startDate: props.item.startDate ? props.item.startDate : [],
        endDate: props.item.endDate ? props.item.endDate : [],
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
        startDate: date,
      },
    }));
  };

  handleEndDateChange = (date, dateString) => {
    this.setState((prevState) => ({
      updateModel: {
        ...prevState.updateModel,
        endDate: date,
      },
    }));
  };

  handleSubmit = (event) => {
    let startDate = new Date(this.state.updateModel.startDate);
    let endDate = new Date(this.state.updateModel.endDate);
    if (startDate.getTime() >= endDate.getTime()) {
      this.setState({ isFalse: true });
      event.preventDefault();
    } else {
      this.setState({ isFalse: false });
      update(
          this.state.updateModel,
          this.state.updateModel.id,
          async (resp) => {
            const result = await resp.json();
            if (resp.ok) {
              console.log('Update successfully');
              //alert('Update successfully');
            } else {
              console.log(result.message);
            }
          },
          (err) => {
            console.log(err);
          },
          (final) => {}
      );
    }
  };

  render() {
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
    return (
      <>
        <div
          className='popup'
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0',
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
                  defaultValue={moment(
                    new Date(this.props.item.startDate),
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
                  defaultValue={moment(
                    new Date(this.props.item.endDate),
                    dateFormatList[0]
                  )}
                  onChange={this.handleEndDateChange}
                  format={dateFormatList}
                />
              </div>
            </div>
            {this.state.isFalse ? <span style={{ color: 'red' }}><i>Start Date should be smaller than end date</i></span> : null}
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
            <button className='btn btn-success' onClick={this.handleSubmit}>
              {this.props.positiveButton}
            </button>
            <button
              className='btn btn-danger'
              onClick={this.props.cancel}
              style={{ marginLeft: '10px' }}
            >
              {this.props.negativeButton}
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default PopupEdit;
