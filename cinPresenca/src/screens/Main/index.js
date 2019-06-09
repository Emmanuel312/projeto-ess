import React, { Component } from 'react'
import { NativeEventEmitter,NativeModules,Alert } from 'react-native'
import { Container,AlertText } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome'
import BleManager from 'react-native-ble-manager'
import firebase from 'react-native-firebase';
import * as Animatable from 'react-native-animatable'
import RNAndroidLocationEnabler from 'react-native-android-location-enabler'

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default class Login extends Component
{
    state =
    {
        peripherals: new Map(),
        user: null,
        locationEnable : false,
        bluetoothEnable : false
    }
    async componentDidMount()
    {
        const user = await firebase.auth().currentUser
        this.setState({user})
        this.handlerDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral );
        await this.enableGps()
        await this.enableBlue()

        BleManager.start({showAlert: true})
        .then(() =>
        {
            console.log('Module Started')
            this.checkBlueAndGps()
        })
        .catch((error) => { console.log('Module doesnt started') })
    }

    componentWillUnmount()
    {
        clearInterval(this.interval);
        this.handlerDiscover.remove();
    }

    enableGps = () =>
    {
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
        .then(data => this.setState({locationEnable: true}))
        .catch(err => this.setState({locationEnable: false}))
    }

    enableBlue = () =>
    {
        BleManager.enableBluetooth()
        .then(() =>  this.setState({bluetoothEnable: true}))
        .catch(err => this.setState({bluetoothEnable: false}))
    }

    checkBlueAndGps = () => 
    {
        this.interval = setInterval(() =>
        {
            if(this.state.bluetoothEnable && this.state.locationEnable)
                this.scan()
            else
                Alert.alert("Ativar","Precisamos do seu bluetooth e gps ativados")     
            this.enableGps()
            this.enableBlue()
        },10000)
    }

    scan = () =>
    {
        BleManager.scan([], 3, true).then(data => console.log(data)).catch(err => console.log(err))
    }

    handleDiscoverPeripheral = async peripheral =>
    {
        const { peripherals } = this.state
        if (!peripherals.has(peripheral.id))
        {
            console.log('Got ble peripheral', peripheral);
            peripherals.set(peripheral.id, peripheral);
            this.setState({ peripherals })   
        }
        //if(peripheral.id === 'mac da esp' && peripheral.advertising.serviceUUIDs === 'uuid da esp')
        try
        {
            const dados = await firebase.database().ref(`usersTeste/${this.state.user.uid}/${peripheral.id}`).set({timestamp: Date.now(),uuid:peripheral.advertising.serviceUUIDs})
            console.log(dados)
        }
        catch(err)
        {
            console.log(err)
        }
    }
    render()
    {
        return (
            <Container>
                <Animatable.View animation="tada" iterationCount="infinite" easing="linear">
                    <Icon name="bluetooth-b" size={200} color="white" />
                </Animatable.View>
                <AlertText>Mantenha seu bluetooth ligado para confimar sua presença</AlertText>
            </Container>
        )
    }
}
