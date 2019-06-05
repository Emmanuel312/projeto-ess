import React, { Component } from 'react'
import { View,Text,Animated } from 'react-native'
import { Container,AlertText } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome'

export default class Login extends Component
{

    render()
    {
        return (
            <Container>
                <Icon name="bluetooth-b" size={200} color="white" />
                <AlertText>Mantenha seu bluetooth ligado para confimar sua presença</AlertText>
            </Container>
        )
    }
}
