import * as WebBrowser from 'expo-web-browser';
import { StyleSheet,TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import * as React from "react";
import {
  NativeBaseProvider,
  Slider,
  Input,
  Stack,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Box,
  Button
} from 'native-base';

export default function EditScreenInfo({ path }: { path: string }) {

  const [onChangeValueX, setOnChangeValueX] = React.useState(45);
  const [onChangeEndValueX, setOnChangeEndValueX] = React.useState(45);

  const [onChangeValueY, setOnChangeValueY] = React.useState(45);
  const [onChangeEndValueY, setOnChangeEndValueY] = React.useState(45);

  return (
      <NativeBaseProvider>

        <View>
          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText} lightColor="rgba(0,0,0,0.8)" darkColor="rgba(255,255,255,0.8)">Alert Pitch Axis {onChangeValueX} degrees</Text>
            <Slider defaultValue={45} maxValue={90} colorScheme="cyan" onChange={v => {
              setOnChangeValueX(Math.floor(v));
            }} onChangeEnd={v => {
              v && setOnChangeEndValueX(Math.floor(v));
              AsyncStorage.setItem('X', String(Math.floor(v)));
              console.debug('set x');
            }}>
              <Slider.Track>
                <Slider.FilledTrack />
              </Slider.Track>
              <Slider.Thumb />
            </Slider>
            <Text style={styles.getStartedText} lightColor="rgba(0,0,0,0.8)" darkColor="rgba(255,255,255,0.8)">Alert Roll Axis {onChangeValueY} degrees</Text>
            <Slider defaultValue={45} maxValue={90} colorScheme="cyan" onChange={v => {
              setOnChangeValueY(Math.floor(v));
            }} onChangeEnd={v => {
              v && setOnChangeEndValueY(Math.floor(v));
               AsyncStorage.setItem('Y', String(Math.floor(v)));
              console.debug('set y');
            }}>
              <Slider.Track>
                <Slider.FilledTrack />
              </Slider.Track>
              <Slider.Thumb />
            </Slider>
              <InputGroup>
                <InputLeftAddon children={"น้ำหนักรถ"} borderStyle={"dotted"}/>
                <Input placeholder="0" keyboardType={"numbers-and-punctuation"}/>
                <InputRightAddon children={"Kg"} borderStyle={"dotted"}/>
              </InputGroup>

            <InputGroup>
              <InputLeftAddon children={"Load Capacity"} borderStyle={"dotted"}/>
              <Input placeholder="0" keyboardType={"numbers-and-punctuation"} />
              <InputRightAddon children={"Kg"} borderStyle={"dotted"}/>
            </InputGroup>

            <InputGroup>
              <InputLeftAddon children={"Load Center"} borderStyle={"dotted"}/>
              <Input placeholder="0" keyboardType={"numbers-and-punctuation"} />
              <InputRightAddon children={"Kg"} borderStyle={"dotted"}/>
            </InputGroup>

            <InputGroup>
              <InputLeftAddon children={"ความกว้างของรถ"} borderStyle={"dotted"}/>
              <Input placeholder="0" keyboardType={"numbers-and-punctuation"}  />
              <InputRightAddon children={"m"} borderStyle={"dotted"}/>
            </InputGroup>

            <InputGroup>
              <InputLeftAddon children={"ความยาวฐานล้อหน้า-หลัง"} borderStyle={"dotted"}/>
              <Input placeholder="0" keyboardType={"numbers-and-punctuation"}  />
              <InputRightAddon children={"m"} borderStyle={"dotted"}/>
            </InputGroup>

            <InputGroup>
              <InputLeftAddon children={"ระยะหว่างระหว่างจุด CG กับแกนล้อหน้า"} borderStyle={"dotted"}/>
              <Input placeholder="0" keyboardType={"numbers-and-punctuation"}  />
              <InputRightAddon children={"m"} borderStyle={"dotted"}/>
            </InputGroup>

            <InputGroup borderStyle={"dotted"}>
              <InputLeftAddon children={"ระยะจุดกึ่งกลางรถ"} borderStyle={"dotted"} />
              <Input placeholder="0" keyboardType={"numbers-and-punctuation"} />
              <InputRightAddon children={"m"} borderStyle={"dotted"} />
            </InputGroup>

            <Button m={[50, 0]}  onPress={() => console.log("hello world")}>Calculate</Button>
          </View>
        </View>
      </NativeBaseProvider>
  );
}
const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('forklift')
    if(value !== null) {
      print(value)
      // value previously stored
    }else {
      print('xxxx')
    }
  } catch(e) {
    // error reading value
  }
}
function handleHelpPress() {
  WebBrowser.openBrowserAsync(
      'https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet'
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'stretch',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});
