import React, { Component } from 'react';
import './popup.css';
import 'antd/dist/antd.css';
import { DatePicker } from 'antd';
import moment from 'moment';
import { create } from '../services/ClassService';

class PopupAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createModel: {
        name: [],
        startDate: new Date(),
        endDate: new Date(`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(
            new Date().getDate() + 1).padStart(2, '0')}`),
        isFalse: false
      },
    };
  }

  handleNameChange = (e) => {
    let value = e.target.value;
    this.setState((prevState) => ({
      createModel: {
        ...prevState.createModel,
        name: value,
      },
    }));
  };

  handleStartDateChange = (date, dateString) => {
    this.setState((prevState) => ({
      createModel: {
        ...prevState.createModel,
        startDate: date,
      },
    }));
  };

  handleEndDateChange = (date, dateString) => {
    this.setState((prevState) => ({
      createModel: {
        ...prevState.createModel,
        endDate: date,
      },
    }));
  };

  handleSubmit = (event) => {
    let startDate = new Date(this.state.createModel.startDate);
    let endDate = new Date(this.state.createModel.endDate);
    console.log(this.state.createModel.startDate + ": " + startDate.getTime());
    console.log(this.state.createModel.endDate + ": " + endDate.getTime());
    if (startDate.getTime() >= endDate.getTime()) {
      this.setState({ isFalse: true });
      event.preventDefault();
    } else {
      this.setState({ isFalse: false });
      create(
          this.state.createModel,
          async (resp) => {
            const result = await resp.json();
            if (resp.ok) {
              console.log('Create successfully');
            } else {
              console.log(result.message);
            }
          },
          (error) => {
            console.log(error);
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
          <h3 style={{ marginTop: '10px' }}>
            {this.props.isAddClicked ? 'Add new class' : 'Edit class name'}
          </h3>
          <form>
            <div>
              <input
                type='text'
                placeholder='Class Name'
                value={this.state.value}
                onChange={this.handleNameChange}
                required
                style={{ width: '70%' }}
              />{' '}
              <br />
              <div style={{ marginTop: '5px' }}>
                <label>Start date:</label>{' '}
                <DatePicker
                  defaultValue={moment(this.state.createModel.startDate, dateFormatList[0])}
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
                    this.state.createModel.endDate,
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
              {this.props.isAddClicked
                ? 'Continue to Add?'
                : 'Continue to Edit?'}
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

export default PopupAdd;
