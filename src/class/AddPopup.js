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
        endDate: new Date(),
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
                  defaultValue={moment(new Date(), dateFormatList[0])}
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
                    new Date().getDate() + 1,
                    dateFormatList[0]
                  )}
                  onChange={this.handleEndDateChange}
                  format={dateFormatList}
                />
              </div>
            </div>
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
