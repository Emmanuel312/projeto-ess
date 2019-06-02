import React, { Component } from 'react'
import { TouchableOpacity,Alert,KeyboardAvoidingView } from 'react-native'
import { Container,Logo,Input,ViewText,UnderlineText,ForgetView,LoginButton,LoginText } from './styles';

export default class Login extends Component
{
    state = 
    {
        cpf: '',
        password: ''
    }

    handleLogin = () =>
    {
        Alert.alert('Login',`voce logou com o cpf='${this.state.cpf}' e a senha='${this.state.password}'`)
        this.props.navigation.navigate('Main')
    }

    render()
    {
        return (
            <Container>
                <Logo>{`Cin\nPresença`}</Logo>
                <ViewText>
                    <Input placeholder="Digite seu cpf" value={this.state.cpf} onChangeText={cpf => this.setState({cpf})} autoCorrect={false} autoFocus autoCapitalize = 'none' keyboardType='numeric' />
                    <Input placeholder="Digite sua senha" secureTextEntry value={this.state.password} onChangeText={password => this.setState({password}) } autoCorrect={false} autoCapitalize = 'none' />
                </ViewText>
                <ForgetView>
                    <TouchableOpacity>
                        <UnderlineText>esqueceu sua senha?</UnderlineText>
                    </TouchableOpacity>
                </ForgetView>
                <LoginButton onPress={this.handleLogin}>
                    <LoginText>Presente</LoginText>
                </LoginButton>
                <TouchableOpacity>
                    <UnderlineText>não possui uma conta?</UnderlineText>
                </TouchableOpacity>
            </Container>       
        )
    }
}
