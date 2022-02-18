import {AppState, Button, StyleSheet, Vibration, Image, Platform} from 'react-native';
import {Text, View} from '../components/Themed';
import {RootTabScreenProps} from '../types';
import React, {useRef, useState} from 'react';
import {Orientation, Subscription} from 'expo-orientation-sensor'
import {Audio} from 'expo-av';

export default function TabOneScreen({navigation}: RootTabScreenProps<'TabOne'>) {
    const [sidePic, setSidePic] = useState(require('../assets/images/side/side-0.png'));
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackObject, setPlaybackObject] = useState(new Audio.Sound());
    const [playbackStatus, setPlaybackStatus] = useState(null);

    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    const [angles, setAngles] = React.useState({
        pitch: 0,
        roll: 0,
    })

    const side10 = require('../assets/images/side/side10.png');
    const side20 = require('../assets/images/side/side20.png');
    const side45 = require('../assets/images/side/side45.png');
    const side70 = require('../assets/images/side/side70.png');
    const side90 = require('../assets/images/side/side90.png');

    const side0 = require('../assets/images/side/side-0.png');
    const side_10 = require('../assets/images/side/side-10.png');
    const side_20 = require('../assets/images/side/side-20.png');
    const side_45 = require('../assets/images/side/side-45.png');
    const side_70 = require('../assets/images/side/side-70.png');
    const side_90 = require('../assets/images/side/side-90.png');
    React.useEffect(() => {
        let subscriber: Subscription
        AppState.addEventListener('change', _handleAppStateChange);

        playbackObject.loadAsync(require("../assets/beep.mp3")).then(r => {
            if (r.isLoaded) {
                setPlaybackStatus(r);
            }

            playbackObject.setIsLoopingAsync(true).then(rl => {
                if (rl.isLoaded) {
                    Orientation.setUpdateInterval(100)
                    subscriber = Orientation.addListener(data => {
                            setAngles(data)
                            if (cal(data)) {
                                setIsPlaying(true);
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
            subscriber.remove()
            if (playbackObject !== null && playbackStatus === null) {
                // console.log('Unloading Sound');
                playbackObject.unloadAsync();
            }
            AppState.removeEventListener('change', _handleAppStateChange);
        };
    }, []);


    function cal(data) {
        let roll = ((data.roll * 180) / Math.PI)

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

        if(Platform.OS=="android"){
            return Math.abs(roll) > 45
        }else{
            return Math.abs(((data.pitch * 180) / Math.PI)) < 120 || Math.abs(roll) > 45
        }
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
            <View style={styles.container}>
                <View style={{ flex: 1,  alignContent: 'center'}}>
                    <Image style={styles.stretch} source={sidePic} resizeMethod={"scale"}/>
                </View>
                    <View style={{ flex: 1, backgroundColor: "darkorange" }}>

                        <View>
                            <Text style={styles.text}>Pitch: </Text>
                            <Text style={styles.text}>
                                {((angles.pitch * 180) / Math.PI).toFixed(0)}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.text}>Roll: </Text>
                            <Text style={styles.text}>
                                {((angles.roll * 180) / Math.PI).toFixed(0)}
                            </Text>
                        </View>

                    </View>
            </View>

    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    text: {
        textAlign: 'center',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    screen: {
        backgroundColor: 'white',
    },
    screen2: {
        backgroundColor: 'red',
    },
    stretch: {
        width: 420,
        height: 140,
        resizeMode: 'stretch',
        alignSelf: 'center',
    },
});
