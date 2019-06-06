import React, { Component } from 'react'
import { View,Text,Animated,NativeEventEmitter,NativeModules,} from 'react-native'
import { Container,AlertText } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome'
import BleManager from 'react-native-ble-manager'
import firebase from 'react-native-firebase';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default class Login extends Component
{

    state =
    {
        peripherals: new Map(),
        user: null
    }
    async componentDidMount()
    {
        const user = await firebase.auth().currentUser
        this.setState({user})
        this.handlerDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral );
        BleManager.enableBluetooth()
        .then(() => {
            console.log('The bluetooth is already enabled or the user confirm')
            BleManager.start({showAlert: true})
            .then(() => {
                console.log('Module Started')
        })
        .catch((error) => {
            // Failure code
            console.log('The user refuse to enable bluetooth')
        })
        })
        setTimeout(this.scan,3000)
            
    }
    scan = () =>
    {
        BleManager.scan([], 3, true).then((results) => {
            //console.log(results)
        }).catch(err => console.log(err))
    }
    handleDiscoverPeripheral = async peripheral =>
    {
        const { peripherals } = this.state
        if (!peripherals.has(peripheral.id))
        {
            console.log('Got ble peripheral', peripheral);
            peripherals.set(peripheral.id, peripheral);
            this.setState({ peripherals })
            await firebase.database().ref(`usersTeste/${this.state.user.uid}/${peripheral.id}`).set({timestamp: Date.now(),uuid:peripheral.advertising.serviceUUIDs})
        }
    }
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
