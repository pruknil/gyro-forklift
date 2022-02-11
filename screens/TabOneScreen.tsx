import { StyleSheet,TouchableOpacity,Button } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import React, { useRef,useState, useEffect } from 'react';
import { Orientation } from 'expo-orientation-sensor'
import { Audio } from 'expo-av';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const sound = useRef(new Audio.Sound());

  const [angles, setAngles] = useState({
    yaw: 0,
    pitch: 0,
    roll: 0,
  })
  useEffect(() => {
    const subscriber = Orientation.addListener(data => {
      setAngles(data)

      if (Math.abs(((data.pitch * 180) / Math.PI)) < 160) {
        console.log("xxxx")
        playSound().then(r => {})
      }
    })


    return () => {
      subscriber.remove()
    }
  }, [])




  useEffect(() => {
    return () => sound.current.unloadAsync();
  }, []);

  const playSound = async () => {
    console.log("Loading Sound");

    await sound.current.createAsync(require("../assets/beep.mp3"));

    console.log("playing sound");

    const checkLoaded = await sound.current.getStatusAsync();
    if (checkLoaded.isLoaded === true) {
      console.log("Error in Loading mp3");
    } else {
      await sound.current.playAsync();
    }
  };

  return (
      <View style={styles.screen}>
        <View style={styles.dataContainer}>
          <TouchableOpacity onPress={() => playSound()}>
            <Button title="arrow-left"   />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => playSound()}>
            <Button title="arrow-right"  />
          </TouchableOpacity>
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
