import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import React from "react";
import {RootTabScreenProps} from "../types";


const SecondPage = ({navigation}: RootTabScreenProps<'TabTwo'>) =>  {
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log('Config Focus')
        });
        return unsubscribe;
    }, [navigation]);
  return (
    <View style={styles.container}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabTwoScreen.tsx"/>
      <Text style={styles.title}>

      </Text>
    </View>
  );
}
export default SecondPage;

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
});
