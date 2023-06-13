import * as WebBrowser from 'expo-web-browser';
import { Platform, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import * as React from "react";
import {
  NativeBaseProvider,
  Slider,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  KeyboardAvoidingView,
  Button, ScrollView, Stack
} from 'native-base';

export default function EditScreenInfo({ path }: { path: string}) {
  // interface carObj {
  //   weight : number;
  //   loadCap : number;
  //   loadCenter : number;
  //   carWidth : number;
  //   baseWheel : number;
  //   cg : number;
  //   carCenter : number;
  // }

  const [onChangeValueX, setOnChangeValueX] = React.useState(45);
  const [onChangeEndValueX, setOnChangeEndValueX] = React.useState(45);

  const [onChangeValueY, setOnChangeValueY] = React.useState(45);
  const [onChangeEndValueY, setOnChangeEndValueY] = React.useState(45);

  const [frmdetails, setFrmdetails] = React.useState(onScreenLoad);


  async function onScreenLoad() {
    const savedVal = await AsyncStorage.getItem('forklift')
    console.log('on screen load')
    if (savedVal != null) {
      setFrmdetails(JSON.parse(savedVal))
    }else{
      return {
        'weight' : 0,//นน รถโฟล์คลิฟ
        'w2' : 0,//นนสิ่งของ
        'x3':0,
        'x11':0,
        'carWidth':0,//x4
        'x9':0,
        'baseWheel' : 0,//x5
        'x6':0,
        'x10':0,
        'height' : 0,//x7
        'x8' : 0,

      }
    }
  }

  // React.useEffect(() => {
  //   onScreenLoad();
  // }, [])


  const submitValue = () => {
    let x9 = frmdetails.carWidth/2
    let x6 = frmdetails.baseWheel/2
    let x10 = frmdetails.baseWheel - x6
    let x8 = frmdetails.height/2
    setFrmdetails({...frmdetails, 'x9':x9,'x6':x6,'x10':x10,'x8':x8})
    AsyncStorage.setItem('forklift', JSON.stringify(frmdetails)).then(()=>console.log('saved'))
  }


  return (
      <NativeBaseProvider>

          <View style={styles.getStartedContainer}>
            <ScrollView>
              <KeyboardAvoidingView
                  style={{ flex: 1 }}
                  keyboardVerticalOffset={100}
                  behavior={"position"}
              >



            {/*<Text style={styles.getStartedText} lightColor="rgba(0,0,0,0.8)" darkColor="rgba(255,255,255,0.8)">Alert Pitch Axis {onChangeValueX} degrees</Text>*/}
            {/*<Slider defaultValue={45} maxValue={90} colorScheme="cyan" onChange={v => {*/}
            {/*  setOnChangeValueX(Math.floor(v));*/}
            {/*}} onChangeEnd={v => {*/}
            {/*  v && setOnChangeEndValueX(Math.floor(v));*/}
            {/*  AsyncStorage.setItem('X', String(Math.floor(v)));*/}
            {/*  console.debug('set x');*/}
            {/*}}>*/}
            {/*  <Slider.Track>*/}
            {/*    <Slider.FilledTrack />*/}
            {/*  </Slider.Track>*/}
            {/*  <Slider.Thumb />*/}
            {/*</Slider>*/}
            {/*<Text style={styles.getStartedText} lightColor="rgba(0,0,0,0.8)" darkColor="rgba(255,255,255,0.8)">Alert Roll Axis {onChangeValueY} degrees</Text>*/}
            {/*<Slider defaultValue={45} maxValue={90} colorScheme="cyan" onChange={v => {*/}
            {/*  setOnChangeValueY(Math.floor(v));*/}
            {/*}} onChangeEnd={v => {*/}
            {/*  v && setOnChangeEndValueY(Math.floor(v));*/}
            {/*   AsyncStorage.setItem('Y', String(Math.floor(v)));*/}
            {/*  console.debug('set y');*/}
            {/*}}>*/}
            {/*  <Slider.Track>*/}
            {/*    <Slider.FilledTrack />*/}
            {/*  </Slider.Track>*/}
            {/*  <Slider.Thumb />*/}
            {/*</Slider>*/}
              <InputGroup>
                <InputLeftAddon children={"น้ำหนักรถ"} borderStyle={"dotted"} />
                <Input w={{
                  base: "25%",
                  md: "100%"
                }} value={frmdetails.weight} placeholder="0" keyboardType={"numeric"} onChangeText={e => setFrmdetails({...frmdetails, weight:e})} maxLength={5}  />
                <InputRightAddon children={"Kg"} borderStyle={"dotted"}/>
              </InputGroup>

                <InputGroup>
                  <InputLeftAddon children={"น้ำหนักสิ่งของ"} borderStyle={"dotted"} />
                  <Input w={{
                    base: "25%",
                    md: "100%"
                  }} value={frmdetails.w2} placeholder="0" keyboardType={"numeric"} onChangeText={e => setFrmdetails({...frmdetails, w2:e})} maxLength={5}  />
                  <InputRightAddon children={"Kg"} borderStyle={"dotted"}/>
                </InputGroup>

                <InputGroup>
                  <InputLeftAddon children={"ระยะกึ่งกลางสิ่งของถึงงา"} borderStyle={"dotted"} />
                  <Input w={{
                    base: "25%",
                    md: "100%"
                  }} value={frmdetails.x3} placeholder="0" keyboardType={"numeric"} onChangeText={e => setFrmdetails({...frmdetails, x3:e})} maxLength={5}  />
                  <InputRightAddon children={"m"} borderStyle={"dotted"}/>
                </InputGroup>

                <InputGroup>
                  <InputLeftAddon children={"ความสูงกึ่งกลางสิ่งของถึงฐานล้อ"} borderStyle={"dotted"} />
                  <Input w={{
                    base: "25%",
                    md: "100%"
                  }} value={frmdetails.x11} placeholder="0" keyboardType={"numeric"} onChangeText={e => setFrmdetails({...frmdetails, x11:e})} maxLength={5}  />
                  <InputRightAddon children={"m"} borderStyle={"dotted"}/>
                </InputGroup>

            <InputGroup>
              <InputLeftAddon children={"ความกว้างของรถ"} borderStyle={"dotted"}/>
              <Input w={{
                base: "25%",
                md: "100%"
              }} value={frmdetails.carWidth} placeholder="0" keyboardType={"numeric"} onChangeText={e => setFrmdetails({...frmdetails, carWidth:e})} maxLength={5}/>
              <InputRightAddon children={"m"} borderStyle={"dotted"}/>
            </InputGroup>

            <InputGroup>
              <InputLeftAddon children={"ความยาวฐานล้อหน้า-หลัง"} borderStyle={"dotted"}/>
              <Input w={{
                base: "25%",
                md: "100%"
              }} value={frmdetails.baseWheel} placeholder="0" keyboardType={"numeric"} onChangeText={e => setFrmdetails({...frmdetails, baseWheel:e})} maxLength={5}/>
              <InputRightAddon children={"m"} borderStyle={"dotted"}/>
            </InputGroup>

            <InputGroup>
              <InputLeftAddon children={"ความสูงของรถ"} borderStyle={"dotted"}/>
              <Input w={{
                base: "25%",
                md: "100%"
              }} value={frmdetails.height} placeholder="0" keyboardType={"numeric"} onChangeText={e => setFrmdetails({...frmdetails, height:e})} maxLength={5}/>
              <InputRightAddon children={"m"} borderStyle={"dotted"}/>
            </InputGroup>
            {/*<InputGroup borderStyle={"dotted"}>*/}
            {/*  <InputLeftAddon children={"ระยะจุดกึ่งกลางรถ"} borderStyle={"dotted"} />*/}
            {/*  <Input value={frmdetails.carCenter} placeholder="0" keyboardType={"numeric"} onChangeText={e => setFrmdetails({...frmdetails, carCenter:e})} maxLength={5}/>*/}
            {/*  <InputRightAddon children={"m"} borderStyle={"dotted"} />*/}
            {/*</InputGroup>*/}
                <Button m={[5, 0]}  onPress={submitValue}>Calculate</Button>
              </KeyboardAvoidingView>

            </ScrollView>

          </View>
      </NativeBaseProvider>
  );
}
/*
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
function handleCalculatePress() {
  WebBrowser.openBrowserAsync(
      'https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet'
  );
}
*/

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'stretch',
    marginHorizontal: 0,
    marginVertical: 0,
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
