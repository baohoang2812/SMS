import React, {Component} from 'react';
import Table_student_rowComponent from "./table_student_row.component";
import "./table.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";
import axios from "axios";

class TableStudent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listDisplay: [],
            searchString: ''
        };
    }

    componentDidMount() {
        axios.get("http://localhost:59677/api/students?capacity=20&&pageIndex=1", {
            headers: {Authorization: `Bearer ${localStorage.getItem("authToken")}`}
        }).then(res => {
            this.setState({
                listDisplay: res.data.data
            });
        }).catch(error => {
            this.setState({isError: true});
        });
    }

    handleSearch = (event) => {
        event.preventDefault();
        const {name, value} = event.target;
        axios.get("http://localhost:59677/api/students?name=" + this.state.searchString + "&&capacity=20&&pageIndex=1", {
            headers: {Authorization: `Bearer ${localStorage.getItem("authToken")}`}
        }).then(res => {
            this.setState({
                listDisplay: res.data.data
            });
        }).catch(error => {
            this.setState({isError: true});
        });
        console.log(value)
    }

    handleInput = (event) => {
        event.preventDefault();
        const {name, value} = event.target;
        this.setState(
            {
                searchString: value
            }
        )
    }

    render() {
        const buttonStyle = {
            width: '150px',
            backgroundColor: "#fcfcfc",
            borderRadius: '30px 30px 30px 30px'
        };

        const textHeader = {
            fontSize: '18px'
        };

        return (
            <>
                <div class="table-responsive" style={{width: 1000, marginLeft: "auto", marginRight: "auto"}}>
                    <h3 align="center">Student list</h3>
                    <form onSubmit={this.handleSearch} className="form-inline d-flex justify-content-center md-form form-sm active-cyan-2 mt-2">
                        <input className="form-control form-control-sm mr-3 w-75" type="text" placeholder="Search"
                               aria-label="Search" name="txtSearch" onChange={this.handleInput}/>
                        <input type="submit" value="Search" className="btn btn-secondary"/>
                    </form>
                    <table className="table table-striped table-bordered table-hover" style={{marginTop: 20}}>
                        <thead class="thead-dark">
                        <tr className="text-center">
                            <th>
                                <Link to={"/student"}>
                                    <button className="btn btn-success">Add new student</button>
                                </Link>
                            </th>
                            <th>Id</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>BirthDate</th>
                            <th colSpan="2">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.listDisplay ? this.state.listDisplay.map(element => {
                            {console.log(this.state.listDisplay);}
                            return <Table_student_rowComponent {...element}/>;
                        }) : null
                        }
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}

export default TableStudent;
