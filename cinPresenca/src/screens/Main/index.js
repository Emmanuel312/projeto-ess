import React, { Component } from 'react'
import { NativeEventEmitter,NativeModules,Alert,Text,TouchableOpacity,AppState } from 'react-native'
import { Container,AlertText } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome'
import BleManager from 'react-native-ble-manager'
import firebase from 'react-native-firebase'
import * as Animatable from 'react-native-animatable'
import RNAndroidLocationEnabler from 'react-native-android-location-enabler'
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
//firebase.database().ref('usersTeste').on('value', snap => console.log(snap))
export default class Login extends Component
{
    state =
    {
        peripherals: new Map(),
        user: null,
        locationEnable : false,
        bluetoothEnable : false,
        uuid: '',
        appState: ''
    }
    async componentDidMount()
    {
        //AppState.addEventListener('change', this.handleAppStateChange);
        this.listener = firebase.database().ref('esps/B4:E6:2D:B2:33:43').endAt().limitToLast(1).on('child_added', this.handleListener)
        const user = await firebase.auth().currentUser
        console.log(user)
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
    /*
    componentWillMount()
    {
        this.listener = firebase.database().ref('usersTeste').once('value').then(snap => console.log(snap)).catch(console.log)
        //console.log(listener)
        
    }
    */
   /*
   handleAppStateChange(nextAppState) {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
      
      BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
        console.log('Connected peripherals: ' + peripheralsArray.length);
      });
      
    }
    this.setState({appState: nextAppState});
  }
  */

   handleListener = snap =>
   {
       console.log(snap.val())
        this.setState({ uuid: snap.val().uuid })
        if(this.state.bluetoothEnable && this.state.locationEnable)
        {
            this.setState({peripherals: new Map()})
            this.scan()
        }
            

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
            this.enableGps()
            this.enableBlue()
        },60*1000)
    }

    scan = () =>
    {
        BleManager.scan([], 3, true).then(data => console.log(data)).catch(err => console.log(err))
    }

    handleDiscoverPeripheral = async peripheral =>
    {
        console.log(peripheral)
        const { peripherals } = this.state
        if (!peripherals.has(peripheral.id))
        {
            console.log('Got ble peripheral', peripheral);
            peripherals.set(peripheral.id, peripheral);
            this.setState({ peripherals })   

            console.log(peripheral.id === 'B4:E6:2D:B2:33:43',peripheral.advertising.serviceUUIDs[0] === this.state.uuid)
            if(peripheral.id === 'B4:E6:2D:B2:33:43' &&  peripheral.advertising.serviceUUIDs[0] === this.state.uuid)
            {
                try
                {
                    const dados = await firebase.database().ref(`users/${this.state.user.uid}/esps_detectadas/${peripheral.id}`).set({timestamp: Date.now(),uuid:peripheral.advertising.serviceUUIDs[0]})
                    console.log(dados)
                }
                catch(err)
                {
                    console.log(err)
                }
            }
        }
        //if(peripheral.id === 'mac da esp' && peripheral.advertising.serviceUUIDs === 'uuid da esp')
       
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
