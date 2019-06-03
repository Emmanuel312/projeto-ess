import { createAppContainer,createSwitchNavigator, createBottomTabNavigator } from 'react-navigation'
import Login from './screens/Login'
import Register from './screens/Register'
import Main from './screens/Main'

const MainBottom = createBottomTabNavigator(
{
    Main
})

const Routes = createSwitchNavigator(
{
    Login,
    Register,
    MainBottom
})

export default createAppContainer(Routes)