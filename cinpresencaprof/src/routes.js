import React from 'react';
import { BrowserRouter,Route,Switch } from 'react-router-dom'
import Main from './pages/Main'
import Login from './pages/Login'
import Register from './pages/Register'
import MainUser from './pages/MainUser'

export default function Routes()
{
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/register" exact component={Register}/>
                <Route path="/mainUser" exact component={MainUser}/>
            </Switch>
        </BrowserRouter> 
    )
}


