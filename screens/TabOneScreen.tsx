import {AppState, StyleSheet, Vibration, Image, Platform} from 'react-native';
import { View} from '../components/Themed';
import {RootTabScreenProps} from '../types';
import React, {useRef, useState} from 'react';
import {Orientation, Subscription} from 'expo-orientation-sensor'
import {Audio} from 'expo-av';
import { Box, Center, HStack,Button, NativeBaseProvider,Switch,Text} from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TabOneScreen({navigation}: RootTabScreenProps<'TabOne'>) {

    const side10 = require('../assets/images/side/side20.png');
    const side20 = require('../assets/images/side/side45.png');
    const side45 = require('../assets/images/side/side60.png');
    const side70 = require('../assets/images/side/side70.png');
    const side90 = require('../assets/images/side/side90.png');
    const side0 = require('../assets/images/side/side-0.png');
    const side_10 = require('../assets/images/side/side-20.png');
    const side_20 = require('../assets/images/side/side-45.png');
    const side_45 = require('../assets/images/side/side-60.png');
    const side_70 = require('../assets/images/side/side-70.png');
    const side_90 = require('../assets/images/side/side-90.png');

    const back10 =  require('../assets/images/back/back20.png');
    const back20 =  require('../assets/images/back/back45.png');
    const back45 =  require('../assets/images/back/back60.png');
    const back70 =  require('../assets/images/back/back70.png');
    const back90 =  require('../assets/images/back/back90.png');
    const back0 =   require('../assets/images/back/back0.png');
    const back_10 = require('../assets/images/back/back-20.png');
    const back_20 = require('../assets/images/back/back-45.png');
    const back_45 = require('../assets/images/back/back-60.png');
    const back_70 = require('../assets/images/back/back-70.png');
    const back_90 = require('../assets/images/back/back-90.png');

    const [sidePic, setSidePic] = useState(side0);
    const [backPic, setBackPic] = useState(back0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackObject, setPlaybackObject] = useState(new Audio.Sound());
    const [playbackStatus, setPlaybackStatus] = useState(null);

    const [switchValue, setSwitchValue] = useState(false);
    const toggleSwitch = (value) => {
        setSwitchValue(value);
    };

    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    const [angles, setAngles] = React.useState({
        pitch: 0,
        roll: 0,
    })

    const [anglesAlert, setAnglesAlert] = React.useState({
        pitchFront: 0,
        pitchBack: 0,
        roll: 0,
    })

    const [car, setCar] = React.useState({
        weight : '',
        height : '',
        loadCap : '',
        loadCenter : '',
        carWidth : '',
        baseWheel : '',
        cg: '',
        carCenter : 0
    })


    const [warnTxt, setWarnTxt] = useState("");

    React.useEffect(() => {
        let subscriber: Subscription
        AppState.addEventListener('change', _handleAppStateChange);
        const focusEvt = navigation.addListener('focus', async () => {
            console.log('Main Focus')
            let roll,pitch;

            const xval = await AsyncStorage.getItem('X')
            if(xval !== null) {
                roll = parseInt(xval);
            }else{roll=45;}
            const yval = await AsyncStorage.getItem('Y')
            if(yval !== null) {
               pitch = parseInt(yval);
            }else{pitch=45;}

            AsyncStorage.getItem("forklift").then((value) => {

                if (typeof value === "string") {
                    let data = JSON.parse(value)
                    setCar({
                        weight : data.weight,
                        height : data.height,
                        loadCap : data.loadCap,
                        loadCenter : data.loadCenter,
                        carWidth : data.carWidth,
                        baseWheel : data.baseWheel,
                        cg: data.cg,
                        carCenter : data.carCenter})
                    console.log(car);
                }
            });

            setAnglesAlert({roll: roll,pitchFront: pitch,pitchBack: pitch})
            console.debug(anglesAlert)
        });
        playbackObject.loadAsync(require("../assets/beep.mp3")).then(r => {
            if (r.isLoaded) {
                setPlaybackStatus(r);
            }

            playbackObject.setIsLoopingAsync(true).then(rl => {
                if (rl.isLoaded) {
                    Orientation.setUpdateInterval(200)
                    subscriber = Orientation.addListener(async data => {
                            setAngles(data)
                            if (cal(data) && switchValue) {

                                setIsPlaying(true);


                                setWarnTxt("Roll : "+String(Math.abs((data.roll * 180) / Math.PI).toFixed(2)) + " ,Pitch : " + String(Math.abs((data.pitch * 180) / Math.PI).toFixed(2)))
                                play().then(r => {
                                    Vibration.vibrate(50)
                                })
                            } else {
                                setIsPlaying(false);
                                pause().then(r => {
                                })
                            }
                        }
                    )
                }
            });
        });
        return () => {
            if(subscriber !== undefined){
              //  console.log('Unloading Orientation');
                subscriber.remove()
            }
            // if (playbackObject !== null && playbackStatus === null) {
            //
            // }
            //console.log('Unloading Sound');
            playbackObject.unloadAsync();
            AppState.removeEventListener('change', _handleAppStateChange);
            AppState.removeEventListener('focus', focusEvt);
        };
    }, [switchValue]);


    function cal(data) {
        let roll = ((data.roll * 180) / Math.PI)
        let pitch =((data.pitch * 180) / Math.PI)
           if (roll <= 5 && roll >=-5) {
               setSidePic(side0)
           }else if(roll<-5 && roll>=-10){
               setSidePic(side_10)
           }else if(roll<-10 && roll>=-20){
               setSidePic(side_20)
           }else if(roll<-20 && roll>=-45){
               setSidePic(side_45)
           }else if(roll<-45 && roll>=-70){
               setSidePic(side_70)
           }else if(roll<-70 && roll>=-90){
               setSidePic(side_90)
           }else if(roll>5 && roll<=10){
               setSidePic(side10)
           }else if(roll>10 && roll<=20){
               setSidePic(side20)
           }else if(roll>20 && roll<=45){
               setSidePic(side45)
           }else if(roll>45 && roll<=70){
               setSidePic(side70)
           }else if(roll>70 && roll<=90){
               setSidePic(side90)
           }
        let chkpitch = pitch;
        if(Platform.OS=="ios"){
            if(chkpitch>=0){
                chkpitch = chkpitch - 180;
            }else{
                chkpitch = chkpitch + 180;
            }
        }
        if (chkpitch <= 5 && chkpitch >=-5) {
            setBackPic(back0)
        }else if(chkpitch<-5 && chkpitch>=-10){
            setBackPic(back_10)
        }else if(chkpitch<-10 && chkpitch>=-20){
            setBackPic(back_20)
        }else if(chkpitch<-20 && chkpitch>=-45){
            setBackPic(back_45)
        }else if(chkpitch<-45 && chkpitch>=-70){
            setBackPic(back_70)
        }else if(chkpitch<-70 && chkpitch>=-90){
            setBackPic(back_90)
        }else if(chkpitch>5 && chkpitch<=10){
            setBackPic(back10)
        }else if(chkpitch>10 && chkpitch<=20){
            setBackPic(back20)
        }else if(chkpitch>20 && chkpitch<=45){
            setBackPic(back45)
        }else if(chkpitch>45 && chkpitch<=70){
            setBackPic(back70)
        }else if(chkpitch>70 && chkpitch<=90){
            setBackPic(back90)
        }

        // console.log(Math.cos(roll).toFixed(2))
        // console.log((car.carWidth/2)*0.1)
        let a = (car.carWidth/2)*0.1
        let b = Math.cos(roll).toFixed(2)
        if(pitch < 0){//เอียงขึ้น
            let b = Math.tan(pitch* Math.PI/180) * (car.height/2)
            let xx = (car.baseWheel - car.cg)/2
            if(b > xx){
                console.log("alert")
            }

        }else{//เอียงลง
            let b = Math.tan(pitch* Math.PI/180) * (car.height/2)
            let xx = (car.cg)/2
            if(Math.abs(b) > xx){
                console.log("alert")
            }
        }
        if(roll < 0){//เอียงขวา

        }else{//เอียงซ้าย

        }

        return Math.abs(chkpitch) > anglesAlert.roll || Math.abs(roll) > anglesAlert.pitch
    }

    const _handleAppStateChange = nextAppState => {
        if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
            console.log('App has come to the foreground!');
        }

        appState.current = nextAppState;
        setAppStateVisible(appState.current);
        console.log('AppState', appState.current);
    };

    const pause = async () => {
        const status = await playbackObject.pauseAsync();
        return setPlaybackStatus(status);
    };


    const play = async () => {
        const status = await playbackObject.playAsync();
        return setPlaybackStatus(status);
    };

    return (
            <NativeBaseProvider style={styles.container}>
                <View style={{ flex: 2,  alignContent: 'center'}}>
                    <Box alignItems="center">
                        <Box maxW="full" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                            borderColor: "coolGray.600",
                            backgroundColor: "gray.700"
                        }} _web={{
                            shadow: 2,
                            borderWidth: 0
                        }} _light={{
                            backgroundColor: "gray.50"
                        }}>
                            <Box>
                                <Image  style={{height:140,width:350,resizeMode: 'stretch'}} source={sidePic} resizeMethod={"scale"} />
                                <Center bg="violet.500" _dark={{
                                    bg: "violet.400"
                                }} _text={{
                                    color: "warmGray.50",
                                    fontWeight: "700",
                                    fontSize: "xs"
                                }} position="absolute" bottom="0" px="3" py="1.5">
                                    {((angles.roll * 180) / Math.PI).toFixed(0)}
                                </Center>
                            </Box>
                        </Box>
                    </Box>
                </View>
                <View style={{ flex: 4,  alignContent: 'center'}}>

                    <Box alignItems="center" >
                        <Box maxW="full" rounded="lg" overflow="scroll" borderColor="coolGray.200" borderWidth="1" _dark={{
                            borderColor: "coolGray.600",
                            backgroundColor: "gray.700"
                        }} _web={{
                            shadow: 2,
                            borderWidth: 0
                        }} _light={{
                            backgroundColor: "gray.50"
                        }}>
                            <Box  >
                                <Image style={{height:350,width:150,resizeMode: 'stretch'}} source={backPic} resizeMethod={"scale"} />
                                <Center bg="violet.500" _dark={{
                                    bg: "violet.400"
                                }} _text={{
                                    color: "warmGray.50",
                                    fontWeight: "700",
                                    fontSize: "xs"
                                }} position="absolute" bottom="0" px="3" py="1.5">
                                    {((angles.pitch * 180) / Math.PI).toFixed(0)}
                                </Center>
                            </Box>
                        </Box>
                    </Box>
                </View>
                <View style={{ flex: 1}}>
                    <HStack alignItems="center" space={2}>
                        <Text fontSize="lg"> {switchValue ? 'Detection ON' : 'Detection OFF'} </Text>
                        <Switch onValueChange={toggleSwitch} value={switchValue} />
                    </HStack>
                    <Text fontSize="lg"> {warnTxt} </Text>

                </View>

            </NativeBaseProvider>

    )
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    stretch: {
        alignSelf: 'center',
    },
});
