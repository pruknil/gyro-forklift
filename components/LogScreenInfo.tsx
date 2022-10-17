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
    Button, ScrollView
} from 'native-base';

export default function LogScreenInfo({ path }: { path: string}) {

    const [onChangeValueX, setOnChangeValueX] = React.useState(45);
    const [onChangeEndValueX, setOnChangeEndValueX] = React.useState(45);

    const [onChangeValueY, setOnChangeValueY] = React.useState(45);
    const [onChangeEndValueY, setOnChangeEndValueY] = React.useState(45);

    const [frmdetails, setFrmdetails] = React.useState(onScreenLoad);


    async function onScreenLoad() {
        const savedVal = await AsyncStorage.getItem('logs')
        console.log('on log load')
        if (savedVal != null) {
            setFrmdetails(JSON.parse(savedVal))
        }else{
            return {
                'weight' : '',
                'height' : '',
                'loadCap' : '',
                'loadCenter' : '',
                'carWidth' : '',
                'baseWheel' : '',
                'cg' : '',
                'carCenter' : 0
            }
        }
    }

    // React.useEffect(() => {
    //   onScreenLoad();
    // }, [])


    const submitValue = () => {
        AsyncStorage.setItem('logs', JSON.stringify(frmdetails)).then(()=>console.log('saved'))
    }


    return (
        <NativeBaseProvider>

            <View>
                <View style={styles.getStartedContainer}>
                    <ScrollView>


                    </ScrollView>

                </View>
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
