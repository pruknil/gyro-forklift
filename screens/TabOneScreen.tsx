import {StyleSheet, TouchableOpacity, Button, AppState} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import React, {useState,useRef} from 'react';
import { Orientation, Subscription} from 'expo-orientation-sensor'
import {Audio} from 'expo-av';

export default function TabOneScreen({navigation}: RootTabScreenProps<'TabOne'>) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackObject, setPlaybackObject] = useState(new Audio.Sound());
    const [playbackStatus, setPlaybackStatus] = useState(null);

    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    const [angles, setAngles] = React.useState({
        pitch: 0,
        roll: 0,
    })
    const ref = React.useRef(false);
    React.useEffect(() => {

        let subscriber: Subscription
      AppState.addEventListener('change', _handleAppStateChange);

          playbackObject.loadAsync(require("../assets/beep.mp3")).then(r => {
                if(r.isLoaded){
                    setPlaybackStatus(r);
                }

              playbackObject.setIsLoopingAsync(true).then(rl => {
                  if(rl.isLoaded){
                      Orientation.setUpdateInterval(500)
                       subscriber = Orientation.addListener(data => {
                              setAngles(data)
                              if (Math.abs(((data.pitch * 180) / Math.PI)) < 160) {
                                  setIsPlaying(true);
                                  play()
                              }else{
                                  setIsPlaying(false);
                                  pause()
                              }
                          }
                      )
                  }
              });
          });
    return  () => {
        subscriber.remove()
        if (playbackObject !== null && playbackStatus === null) {
            console.log('Unloading Sound');
            playbackObject.unloadAsync();
        }
        AppState.removeEventListener('change', _handleAppStateChange);
          };
  }, []);




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
      <View style={isPlaying?styles.screen2:styles.screen}>
        <View style={styles.dataContainer}>
          <Button title= {isPlaying.toString()} onPress={play} />
            <Button title=">" onPress={play} />
            <Button title="||" onPress={pause} />
          <View style={styles.container}>
            <Text style={styles.text}>Pitch: </Text>
            <Text style={styles.text}>
              {((angles.pitch * 180) / Math.PI).toFixed(0)}
            </Text>
          </View>
          <View style={styles.container}>
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
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
  dataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',

  },
  screen: {
    flex: 1,
      backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
    screen2: {
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
