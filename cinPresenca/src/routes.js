import { createAppContainer,createSwitchNavigator, createBottomTabNavigator } from 'react-navigation'
import Login from './screens/Login'
import Register from './screens/Register'
import Main from './screens/Main'

const MainBottom = createBottomTabNavigator(
{
    Main,
    Login,
    Register,
})

const Routes = createSwitchNavigator(
{   
    MainBottom,
    Login,
    Register,
    
})

export default createAppContainer(Routes)