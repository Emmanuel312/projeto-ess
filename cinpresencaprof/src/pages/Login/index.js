import React, { Component } from 'react'
import { firebaseImpl } from '../../firebase/config'
import { Link } from 'react-router-dom'
// import { Container } from './styles';

export default class Login extends Component 
{
    async componentDidMount()
    {
        const user = await firebaseImpl.auth().signInWithEmailAndPassword('efn@cin.ufpe.br','123456')
        console.log(user)
    }

    render()
    {
        return (
            <Link to="mainUser" style={{ textDecoration: 'none' }}>
                <span>logar</span>
            </Link>
            
        )
    }
}
