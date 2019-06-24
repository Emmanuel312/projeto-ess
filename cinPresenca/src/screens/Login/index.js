import React, { Component } from 'react'
import { TouchableOpacity,ActivityIndicator } from 'react-native'
import { Container,Logo,Input,ViewText,UnderlineText,ForgetView,LoginButton,LoginText } from './styles';
import firebase from 'react-native-firebase';
import Loader from 'react-native-modal-loader'

export default class Login extends Component
{
    state = 
    {
        email: '',
        password: '',
        loading: false,
    }

    async componentDidMount()
    {
        const user = await firebase.auth().currentUser
        if(user)
        {
            console.log('foi')
            this.props.navigation.navigate('MainBottom')
        }
        else
        {
            console.log('nao foi')
        }
    }
    
    handleLogin = async () =>
    {
        this.setState({email:'',password:''})
        this.setState({loading:true})
        try
        {
            const { email,password } = this.state

            const user = await firebase.auth().signInWithEmailAndPassword(email,password)
            console.log(user)
            this.setState({loading:false})
            if(user)
            {
                console.log('foi')
                 this.props.navigation.navigate('MainBottom')
            }
                
        }
        catch(err)
        {
            console.log(err)
        }
    }

    handleRegister = () =>
    {
        this.props.navigation.navigate('Register')
    }

    render()
    {   
        const { email,password,loading } = this.state
        return (
            <Container>
                <Logo>{`Cin\nPresença`}</Logo>
                <ViewText>
                    <Input placeholder="Digite seu email" value={email} onChangeText={email => this.setState({email})} autoCorrect={false} autoFocus autoCapitalize = 'none' keyboardType='email-address' />
                    <Input placeholder="Digite sua senha" secureTextEntry value={password} onChangeText={password => this.setState({password}) } autoCorrect={false} autoCapitalize = 'none' />
                </ViewText>
                <ForgetView>
                    <TouchableOpacity>
                        <UnderlineText>esqueceu sua senha?</UnderlineText>
                    </TouchableOpacity>
                </ForgetView>
                <LoginButton onPress={this.handleLogin} disabled={!(email && password)}>
                    <LoginText>Presente</LoginText>
                </LoginButton>
                <TouchableOpacity onPress={this.handleRegister}>
                    <UnderlineText>não possui uma conta?</UnderlineText>
                </TouchableOpacity>
                <Loader color="#50B4F2" size="large" loading={loading}></Loader>
                
                
                
            </Container>    
        )
    }
}
