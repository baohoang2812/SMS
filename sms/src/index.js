import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import TableClass from "./class/table_class.component";
import TableStudent from "./student/table_student.component";
import Login from "./account/login.component";

ReactDOM.render(
  <React.StrictMode>
    <TableClass />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
