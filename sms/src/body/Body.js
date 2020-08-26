import React  from 'react';
import { Route, Switch } from "react-router-dom";
import TableClass from '../class/Table.component';
import TableStudent from '../student/table_student.component';
import Login from '../account/login.component';
import Error from '../error/Error';

const Body = (props) => {
        const RouteForAuthorization = localStorage.getItem('token') ?
            (
                <Switch>
                    <Route exact path='/' component={TableStudent}/>
                    <Route exact path='/students' component={TableStudent}/>
                    <Route exact path='/class' component={TableClass}/>
                    <Route component={Error}/>
                </Switch>
            ) : (
                <Switch>
                    <Route path='/' component={Login}/>
                </Switch>
            );
        return (
            <>
                {RouteForAuthorization}
            </>
        );
}

export default Body;