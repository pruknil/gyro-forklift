import {StyleSheet, TouchableOpacity, Button, AppState} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import React, {useState} from 'react';
import { Orientation } from 'expo-orientation-sensor'
import { Audio } from 'expo-av';


export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {



  const [appState, setAppState] = useState(AppState.currentState);
  const [sound, setSound] = React.useState();
  const [play, setPlay] = React.useState({
    play: false
  });
  const [angles, setAngles] = React.useState({
    yaw: 0,
    pitch: 0,
    roll: 0,
  })


  const handleAppStateChange = (state: any) => {
    setAppState(state);
   // setPlay(state);
    console.log('xxxxxxxxxx');
  }


  async function playSound() {
    //console.log('xxxxxxxxxx');

    //console.log(play);
    // if(play){
      console.log('Loading Sound');
      const { sound } = await Audio.Sound.createAsync(
          require('../assets/beep.mp3')
      );
      //
      setSound(sound);
      //
      console.log('Playing Sound');
      await sound.playAsync();
    //
    // } else {
    //  // await sound.unloadAsync();
    // }


  }

  React.useEffect(() => {
    const subscriber = Orientation.addListener(data => {
      setAngles(data)

     // console.log(play)
      if (Math.abs(((data.pitch * 180) / Math.PI)) < 160) {
      //  console.log("xxxx")
        //console.log("set to true")
        setPlay(true)
        //playSound()
       // playSound().then(r => {})
      }else{
        if(play){
          //console.log("set to false")
          setPlay(false)
        }

       // playSound()
        //playSound().then(r => {})

      }

    }
    )

    AppState.addEventListener('change', handleAppStateChange);

    return sound
        ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
          subscriber.remove()
          AppState.removeEventListener('change', handleAppStateChange);
          }
        : undefined;
  }, [sound]);



  return (
      <View style={styles.screen}>
        <View style={styles.dataContainer}>
          <Button title= {!play?"OK":"Warn"} onPress={playSound} />
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
