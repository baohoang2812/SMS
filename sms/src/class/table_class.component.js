import React, {Component} from 'react';
import Table_class_rowComponent from "./table_class_row.component";
import "./tableclass.css";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class TableClass extends Component {

    constructor(props) {
        var class1 = {name: "Class1", id: 1}
        var class2 = {name: "Class2", id: 2}
        var class3 = {name: "Class3", id: 3}
        var classArr = [class1, class2, class3]
        super(props);
        this.state = {
            listDisplay: classArr,
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
                    <h3 align="center">Class list</h3>
                    <form className="form-inline d-flex justify-content-center md-form form-sm active-cyan-2 mt-2">
                        <input className="form-control form-control-sm mr-3 w-75" type="text" placeholder="Search"
                               aria-label="Search" onChange={this.handelSearch}/>
                        <input type="submit" value="Search" className="btn btn-secondary"/>
                    </form>
                    <table className="table table-striped table-bordered table-hover" style={{marginTop: 20}}>
                        <thead class="thead-dark">
                        <tr className="text-center">
                            <th>
                                <button type="button" className="btn btn-success" data-toggle="modal"
                                        data-target="#exampleModal">
                                    Add new class
                                </button>

                                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                                <button type="button" className="close" data-dismiss="modal"
                                                        aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                ...
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary"
                                                        data-dismiss="modal">Close
                                                </button>
                                                <button type="button" className="btn btn-primary">Save changes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </th>
                            <th>Id</th>
                            <th>Classname</th>
                            <th colSpan="2">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.listDisplay ? this.state.listDisplay.map(element => {
                            return <Table_class_rowComponent {...element}/>;
                        }) : null
                        }
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}

export default TableClass;
