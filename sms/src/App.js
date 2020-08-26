import React from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from "./nav/navbar.component";
import Login from "./account/login.component";
import TableStudent from "./student/table_student.component";
import TableClass from "./class/table_class.component";

function App() {
  return (
    <div className="App">
     <Nav/>
     <TableClass/>
    </div>
  );
}

export default App;
