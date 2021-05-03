import React from "react";
import {NavLink, Route} from "react-router-dom";
import {Button, Icon} from "rsuite";
import 'rsuite/dist/styles/rsuite-default.css';
import {App} from "./App";

export const FirstPage = () => {
    return <>
        <Route exact path='/'
               render={() => <ButtonComponent/>}/>
        <Route exact path='/email'
               render={() => <App/>}/>
    </>
}

const ButtonComponent = () => {
    return <div>
        <NavLink to={'/email'}>
            <Button color="red">
                <Icon icon="envelope"/> Go To Email
            </Button>
        </NavLink>
    </div>
}