import React, { Component } from 'react'
import { View,Text,Alert} from 'react-native'
import { Container,Logo,ViewText,Input,RegisterText,RegisterButton } from './styles';
import firebase from 'react-native-firebase';

export default class Login extends Component
{
    state =
    {
        cpf : '',
        email : '',
        password : '',
        confirmPassword : '',
    }
   
    handleRegister = async () =>
    {
        const {cpf,email,password,confirmPassword} = this.state
        if(password === confirmPassword)
        {
            try
            {
                const create = await firebase.auth().createUserWithEmailAndPassword(email,password)
                firebase.database().ref(`users/${create.user._user.uid}`).set({login:email.split('@')[0],cpf,email})
                .then(data => this.props.navigation.navigate('Login'))
                .catch(err => console.log(err))
                
            }catch(err)
            {
                console.log(err)
            }
            
        }
        else
        {
            Alert.alert('Senhas diferentes','As senhas devem ser iguais')
        }
    }

    render()
    {
        const {cpf,email,password,confirmPassword} = this.state
        return (
           <Container>
                <Logo>Cin{'\n'}Presença</Logo>
                <ViewText>
                    <Input placeholder="Digite seu cpf" value={cpf} onChangeText={cpf => this.setState({cpf})} autoCorrect={false} autoCapitalize = 'none' keyboardType='numeric' />
                    <Input placeholder="Digite seu email" value={email} onChangeText={email => this.setState({email})} autoCorrect={false}  autoCapitalize = 'none' keyboardType='email-address' />
                    <Input placeholder="Digite sua senha" secureTextEntry value={password} onChangeText={password => this.setState({password})} autoCorrect={false} autoCapitalize = 'none' />
                    <Input placeholder="Digite sua senha" secureTextEntry value={confirmPassword} onChangeText={confirmPassword => this.setState({confirmPassword}) } autoCorrect={false} autoCapitalize = 'none' />
                </ViewText>
                <RegisterButton onPress={this.handleRegister} disabled={!(cpf && email && password && confirmPassword)}>
                    <RegisterText>cadastrar</RegisterText>
                </RegisterButton>
           </Container>
        )
    }
}
