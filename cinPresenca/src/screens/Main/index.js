import React, { Component } from 'react'
import { View,Text,Animated } from 'react-native'
import { Container } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome'

export default class Login extends Component
{

    render()
    {
        return (
            <Container>
                <Icon name="bluetooth-b" size={200} color="white" />
            </Container>
        )
    }
}
