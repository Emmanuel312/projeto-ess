import styled from 'styled-components/native'
import LinearGradient from 'react-native-linear-gradient'

export const Container = styled(LinearGradient).attrs(
{
    colors: ['#50B4F2','#FFF'],
    start: {x:0,y:0},
    end: {x:0,y:1}
})`
    flex: 1;
    align-items: center;
    justify-content: center;
`
export const AlertText = styled.Text`
    color: #fff;
    font-size: 20px;
    text-align: center;
    margin-top: 30px;


`