import React, { Component } from 'react';
import TableClassRowComponent from './TableRow';
import './tableclass.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Backdrop from '../backdrop/Backdrop';
import PopUpAdd from './AddPopup';
import PopupEdit from './EditPopup';
import { retrieve, deleteClass } from '../services/ClassService';

class TableClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      init: true,
      listDisplay: [],
      showBackdrop: false,
      positiveButton: 'ADD',
      negativeButton: 'CANCEL',
      isAddClicked: true,
      isEditClicked: false,
      editItem: null,
      pageIndex: 1,
      searchValue: [],
    };
  }

  componentDidMount() {
    console.log('length: ' + this.state.listDisplay.length);
    this.loadClassList();
  }

  setSearchValue = (event) => {
    this.setState({
      searchValue: event.target.value,
    });
  };
  handleSearch = (event) => {
    event.preventDefault();
    console.log('Search value: ' + this.state.searchValue);
    this.search(this.state.searchValue);
  };

  handleClickedBackdrop = (event) => {
    this.setState({ showBackdrop: false });
  };

  handleCancel = (event) => {
    this.setState({ showBackdrop: false });
  };

  search = (name) => {
    retrieve(
      {
        name: name,
      },
      async (resp) => {
        const result = await resp.json();
        if (resp.ok) {
          this.setDataSource(result.data);
        } else {
          alert(result.message);
        }
      },
      (err) => {
        console.log(err);
      },
      (final) => {}
    );
  };
  handleDelete = (event, id) => {
    return deleteClass(
      id,
      (resp) => {
        if (resp.ok) {
          this.loadClassList();
        } else {
          alert(resp.message);
        }
      },
      (err) => {
        console.log(err);
      },
      (final) => {}
    );
  };
  setDataSource = (data) => {
    this.setState({
      init: false,
      listDisplay: data,
    });
  };
  handlePopupAdd = (event) => {
    this.setState({
      showBackdrop: true,
      positiveButton: 'ADD',
      negativeButton: 'CANCEL',
      isAddClicked: true,
    });
  };

  handlePopupEdit = (event, id) => {
    retrieve(
      {
        ids: [id],
      },
      async (resp) => {
        const result = await resp.json();
        if (resp.ok) {
          this.setState({
            showBackdrop: true,
            positiveButton: 'EDIT',
            negativeButton: 'CANCEL',
            isAddClicked: false,
            isEditClicked: true,
            editItem: result.data[0],
          });
        } else {
          alert(result.message);
        }
      },
      (err) => {
        console.log(err);
      },
      (final) => {}
    );
  };

  loadClassList() {
    return retrieve(
      {
        capacity: 50,
        pageIndex: this.state.pageIndex,
      },
      async (resp) => {
        const result = await resp.json();
        if (resp.ok) {
          this.setDataSource(result.data);
        } else {
          alert(result.message);
        }
      },
      (err) => {
        console.log(err);
      },
      (final) => {}
    );
  }

  render() {
    const buttonStyle = {
      width: '150px',
      backgroundColor: '#fcfcfc',
      borderRadius: '30px 30px 30px 30px'
    };

    const textHeader = {
      fontSize: '18px',
    };

    return (
      <>
        <Backdrop
          show={this.state.showBackdrop}
          clicked={this.handleClickedBackdrop}
        />
        {this.state.isAddClicked ? (
          <PopUpAdd
            show={this.state.showBackdrop}
            cancel={this.handleCancel}
            add={this.state.isAddClicked ? this.handleAdd : this.handleEdit}
            positiveButton={this.state.positiveButton}
            negativeButton={this.state.negativeButton}
            isAddClicked={this.state.isAddClicked}
          />
        ) : null}
        {this.state.isEditClicked ? (
          this.state.editItem ? (
            <PopupEdit
              show={this.state.showBackdrop}
              cancel={this.handleCancel}
              submit={this.handleEdit}
              positiveButton={this.state.positiveButton}
              negativeButton={this.state.negativeButton}
              item={this.state.editItem}
            />
          ) : null
        ) : null}

        <div className='table-responsive' style={{ width: 1000, marginLeft: 'auto', marginRight: 'auto' }}>
          <h3 align='center'>Class list</h3>
          <form className='form-inline d-flex justify-content-center md-form form-sm active-cyan-2 mt-2'>
            <input
              className='form-control form-control-sm mr-3 w-75'
              type='text'
              placeholder='Search'
              aria-label='Search'
              onChange={this.setSearchValue}
            />
            <input
              type='submit'
              value='Search'
              className='btn btn-secondary'
              onClick={this.handleSearch}
            />
          </form>
          <table
            className='table table-striped table-bordered table-hover'
            style={{ marginTop: 20 }}
          >
            <thead className='thead-dark'>
              <tr className='text-center'>
                <th>
                  <button
                    type='button'
                    className='btn btn-success'
                    data-toggle='modal'
                    data-target='#exampleModal'
                    onClick={this.handlePopupAdd}
                  >
                    Add new class
                  </button>

                  <div
                    className='modal fade'
                    id='exampleModal'
                    tabIndex='-1'
                    role='dialog'
                    aria-labelledby='exampleModalLabel'
                    aria-hidden='true'
                  >
                    <div className='modal-dialog' role='document'>
                      <div className='modal-content'>
                        <div className='modal-header'>
                          <h5 className='modal-title' id='exampleModalLabel'>
                            Modal title
                          </h5>
                          <button
                            type='button'
                            className='close'
                            data-dismiss='modal'
                            aria-label='Close'
                          >
                            <span aria-hidden='true'>&times;</span>
                          </button>
                        </div>
                        <div className='modal-body'>...</div>
                        <div className='modal-footer'>
                          <button
                            type='button'
                            className='btn btn-secondary'
                            data-dismiss='modal'
                          >
                            Close
                          </button>
                          <button type='button' className='btn btn-primary'>
                            Save changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </th>
                <th>Id</th>
                <th>Classname</th>
                <th>StartDate</th>
                <th>EndDate</th>
                <th colSpan='2'>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.listDisplay
                ? this.state.listDisplay.map((element, index) => {
                    return (
                      <TableClassRowComponent
                        {...element}
                        key={index}
                        clickEdit={(e) => {
                          this.handlePopupEdit(e, element.id);
                        }}
                        clickRemove={(e) => {
                          this.handleDelete(e, element.id);
                        }}
                      />
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default TableClass;
