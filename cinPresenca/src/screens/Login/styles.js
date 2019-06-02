import styled from 'styled-components/native'
import LinearGradient from 'react-native-linear-gradient'

export const Container = styled(LinearGradient).attrs(
{
    colors: ['#50B4F2','#FFF'],
    start: {x:0,y:0},
    end: {x:0,y:0.5}
})`
    flex: 1;
    align-items: center;
    justify-content: center;
`

export const Logo = styled.Text`
    margin-bottom: 20px;
    font-size: 50px;
    color: #151515;
    font-family: Montserrat-Light;
    text-align: center;
`
export const ViewText = styled.View`
    
    display: flex;
    align-items: center;
    width: 100%;
`

export const Input = styled.TextInput`
    padding: 0 10px;
    border-radius: 5px;
    width: 80%;
    height: 47px;
    background: #FFF;
    border-color: #000;
    border-width: 1px;
    font-family: Montserrat-Light;
    margin-top: 10px;
`
export const UnderlineText = styled.Text`
    margin-top: 6px;
    font-size: 10px;
    color: #151515;
    font-family: Montserrat-Light;
    text-decoration-line: underline;
`

export const ForgetView = styled.View`
    display: flex;
    align-items: flex-end;
    width: 80%;
`
export const LoginButton = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    width: 110px;
    height: 40px;
    border-radius: 5px;
    background: ${props => props.disabled? "gray" : "#151515"}

`
export const LoginText = styled.Text`
    font-size: 12px;
    color: #FFF;
    font-family: Montserrat-Light;
`
