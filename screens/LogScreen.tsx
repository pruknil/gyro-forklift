import {StyleSheet} from 'react-native';

import { Text, View } from '../components/Themed';
import React from "react";
import {RootTabScreenProps} from "../types";
import LogScreenInfo from "../components/LogScreenInfo";

const LogPage = ({navigation}: RootTabScreenProps<'Log'>) =>  {
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            console.log('Log Focus')

        });
        return unsubscribe;
    }, [navigation]);
    return (
        <View style={styles.container}>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <LogScreenInfo path="/screens/LogScreen.tsx"/>
            <Text style={styles.title}>

            </Text>
        </View>
    );
}
export default LogPage;

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
