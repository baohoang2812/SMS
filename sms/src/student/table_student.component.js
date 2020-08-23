import React, {Component} from 'react';
import Table_student_rowComponent from "./table_student_row.component";
import "./table.css";
import 'bootstrap/dist/css/bootstrap.min.css';

class TableStudent extends Component {

    constructor(props) {
        var person1 = {firstname: "John", lastname: "Doe", id: 1}
        var person2 = {firstname: "John2", lastname: "Doe2", id: 2}
        var person3 = {firstname: "John3", lastname: "Doe3", id: 3}
        var studentArr = [person1, person2, person3]
        super(props);
        this.state = {
            listDisplay: studentArr,
        };
    }

    componentDidMount() {
        console.log("length: " + this.state.listDisplay.length)
    }

    handelSearch = (event) =>  {
        event.preventDefault();
        const {name, value} = event.target;
        console.log(value)
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
                <div class="table-responsive" style={{width: 1000}}>
                    <h3 align="center">Student list</h3>
                    <form className="form-inline d-flex justify-content-center md-form form-sm active-cyan-2 mt-2">
                        <input className="form-control form-control-sm mr-3 w-75" type="text" placeholder="Search"
                               aria-label="Search" onChange={this.handelSearch}/>
                        <input type="submit" value="Search" className="btn btn-secondary"/>
                    </form>
                    <table className="table table-striped table-bordered table-hover" style={{marginTop: 20}}>
                        <thead class="thead-dark">
                        <tr className="text-center">
                            <th>
                                <button className="btn btn-success">Add new student</button>
                            </th>
                            <th>Id</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th colSpan="2">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.listDisplay ? this.state.listDisplay.map(element => {
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