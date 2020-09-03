import React, { Component } from 'react';
import './popup.css';
import 'antd/dist/antd.css';
import { DatePicker } from 'antd';
import moment from 'moment';

class PopupAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createModel: {
        name: '',
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
        startDate: date
      },
    }));
  };

  handleEndDateChange = (date, dateString) => {
    this.setState((prevState) => ({
      createModel: {
        ...prevState.createModel,
        endDate: date
      },
    }));
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
                value={this.state.createModel.name}
                onChange={this.handleNameChange}
                style={{ width: '70%' }}
                required  
              />
              <br />
              <div style={{ marginTop: '5px' }}>
                <label>Start date:</label>{' '}
                <DatePicker
                  value={moment(new Date(this.state.createModel.startDate), dateFormatList[0])}
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
                    new Date(this.state.createModel.endDate),
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
              {this.props.isAddClicked
                ? 'Continue to Add?'
                : 'Continue to Edit?'}
            </p>
            <div className='btn btn-success' onClick={(e) => {this.props.add(e, this.state.createModel); this.setState({value: ''})}}>
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

export default PopupAdd;
