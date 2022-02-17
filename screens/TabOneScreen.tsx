import {AppState, Button, StyleSheet, Vibration,Image} from 'react-native';
import {Text, View} from '../components/Themed';
import {RootTabScreenProps} from '../types';
import React, {useRef, useState} from 'react';
import {Orientation, Subscription} from 'expo-orientation-sensor'
import {Audio} from 'expo-av';

export default function TabOneScreen({navigation}: RootTabScreenProps<'TabOne'>) {
    const [sidePic, setSidePic] = useState("../assets/images/side/side-0.png");
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackObject, setPlaybackObject] = useState(new Audio.Sound());
    const [playbackStatus, setPlaybackStatus] = useState(null);

    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    const [angles, setAngles] = React.useState({
        pitch: 0,
        roll: 0,
    })

    React.useEffect(() => {
        let subscriber: Subscription
        AppState.addEventListener('change', _handleAppStateChange);

        playbackObject.loadAsync(require("../assets/beep.mp3")).then(r => {
            if (r.isLoaded) {
                setPlaybackStatus(r);
            }

            playbackObject.setIsLoopingAsync(true).then(rl => {
                if (rl.isLoaded) {
                    Orientation.setUpdateInterval(500)
                    subscriber = Orientation.addListener(data => {
                            setAngles(data)
                            if (cal(data)) {
                                setIsPlaying(true);
                                play().then(r => {
                                    Vibration.vibrate(500)
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

           // if (roll<10||roll>=-10) {
           //     setSidePic("../assets/images/side/side-10.png")
           // }

        return Math.abs(((data.pitch * 180) / Math.PI)) < 160 || Math.abs(roll) > 20
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
                    <Image style={styles.stretch} source={require("../assets/images/side/side-0.png")} resizeMethod={"scale"}/>
                </View>

                    <View style={{ flex: 1, backgroundColor: "red" }}>

                        <Button title={isPlaying.toString()} onPress={play}/>
                        <Button title=">" onPress={play}/>
                        <Button title="||" onPress={pause}/>
                    </View>
                    <View style={{ flex: 1, backgroundColor: "darkorange" }}>

                        <View>
                            <Text style={styles.text}>sidePic: </Text>
                            <Text style={styles.text}>
                                {sidePic}
                            </Text>
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
