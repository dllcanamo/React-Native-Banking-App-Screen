import { StyleSheet, Text, TouchableOpacity, View, Image, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import GradientButton from '../components/GradientButton';

import {
    useFonts,
    Poppins_400Regular,
    Poppins_600SemiBold,
  } from '@expo-google-fonts/poppins';

function DateConfigComponent(props) {
    const [activeConfig, setActiveConfig] = useState('');
  
    function buttonPressed(config) {
      props.onPress(config);
    }
  
    useEffect(() => {
      setActiveConfig(props.activeDate);
    },[props.activeDate])

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_600SemiBold,
    });
    
    if (!fontsLoaded) {
    return null;
    }
  
    return (
      <View style={styles.dateConfCont}>
        <TouchableOpacity style={[styles.button, styles.leftBtn]} onPress={buttonPressed.bind(this, 'day')}>
          <LinearGradient         
            style={[styles.button, {width: '100%'}]}
            colors={activeConfig =='day' ? [Colors.gradGreenDate, Colors.gradYellowDate] : 
              (props.scheme == 'light' ? ['white', 'white'] : [Colors.gray, Colors.gray])}
            start={{x: 1, y: 1}}
            end={{x: 0, y: 0}}
          >
            <View style={styles.viewPressCont}>
              {activeConfig == 'day' ? <GradientButton/> : <></>}
              <Text style={(props.scheme == 'light' && activeConfig != 'day') ? styles.unselectedTxt : styles.btnText}> D </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
  
        <TouchableOpacity style={[styles.button, styles.midBtn]} onPress={buttonPressed.bind(this, 'week')}>
          <LinearGradient         
            style={[styles.button, {width: '100%'}]}
            colors={activeConfig =='week' ? [Colors.gradGreenDate, Colors.gradYellowDate] : 
              (props.scheme == 'light' ? ['white', 'white'] : [Colors.gray, Colors.gray])}
            start={{x: 1, y: 1}}
            end={{x: 0, y: 0}}
          >
            <View style={styles.viewPressCont}>
              {activeConfig == 'week' ? <GradientButton/> : <></>}
              <Text style={(props.scheme == 'light' && activeConfig != 'week') ? styles.unselectedTxt : styles.btnText}> W </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
  
        <TouchableOpacity style={[styles.button, styles.midBtn]} onPress={buttonPressed.bind(this, 'month')}>
          <LinearGradient         
            style={[styles.button, {width: '100%'}]}
            colors={activeConfig =='month' ? [Colors.gradGreenDate, Colors.gradYellowDate] : 
              (props.scheme == 'light' ? ['white', 'white'] : [Colors.gray, Colors.gray])}
            start={{x: 1, y: 1}}
            end={{x: 0, y: 0}}
          >
            <View style={styles.viewPressCont}>
            {activeConfig == 'month' ? <GradientButton/> : <></>}
              <Text style={(props.scheme == 'light' && activeConfig != 'month') ? styles.unselectedTxt : styles.btnText}> M </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
  
        <TouchableOpacity style={[styles.button, styles.midBtn]} onPress={buttonPressed.bind(this, 'year')}>
          <LinearGradient         
            style={[styles.button, {width: '100%'}]}
            colors={activeConfig =='year' ? [Colors.gradGreenDate, Colors.gradYellowDate] : 
              (props.scheme == 'light' ? ['white', 'white'] : [Colors.gray, Colors.gray])}
            start={{x: 1, y: 1}}
            end={{x: 0, y: 0}}
          >
            <View style={styles.viewPressCont}>
              {activeConfig == 'year' ? <GradientButton/> : <></>}
              <Text style={(props.scheme == 'light' && activeConfig != 'year') ? styles.unselectedTxt : styles.btnText}> Y </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.midBtn]} onPress={buttonPressed.bind(this, 'all')}>
          <LinearGradient         
            style={[styles.button, {width: '100%'}]}
            colors={activeConfig =='all' ? [Colors.gradGreenDate, Colors.gradYellowDate] : 
              (props.scheme == 'light' ? ['white', 'white'] : [Colors.gray, Colors.gray])}
            start={{x: 1, y: 1}}
            end={{x: 0, y: 0}}
          >
            <View style={styles.viewPressCont}>
              {activeConfig == 'all' ? <GradientButton/> : <></>}
              <Text style={(props.scheme == 'light' && activeConfig != 'all') ? styles.unselectedTxt : styles.btnText}> All </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
  
        <LinearGradient
          style={[styles.button, styles.rightBtn]}
          colors={props.scheme == 'light' ? ['white', 'white'] : [Colors.gray, Colors.gray]}
          start={{x: 1, y: 1}}
          end={{x: 0, y: 0}}
        >
          <View style={styles.viewPressCont}>
              <Image 
                source={props.scheme == 'light' ? require('../assets/images/calendar-black.png') : require('../assets/images/calendar.png')}
                style={{ width: 24, height: 24 }}
              />
          </View>
        </LinearGradient>
      </View>
    );
  }

  export default DateConfigComponent;

const styles = StyleSheet.create({
    container: {

    },
    dateConfCont: {
      height: 60,
      flexDirection: "row",
      paddingHorizontal: 16,
      paddingBottom: 16,
      alignContent: "space-between",
      justifyContent: "space-between",
    },
    button: {
      flex: 1,
      height: 44,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      minWidth: 48,
    },
    leftBtn: {
      marginRight: 5
    },
    midBtn: {
      marginHorizontal: 5
    },
    rightBtn: {
      marginLeft: 5
    },
    viewPressCont: {
      flex: 1,
      alignSelf: "stretch",
      justifyContent: "center",
      alignItems: "center"
    },
    btnText: {
    //   fontFamily: "pop-reg",
      fontFamily: "Poppins_400Regular",
      fontSize: 16,
      color: "white",
      textAlignVertical: "center",
      textAlign: Platform.OS === 'android' ? "center" : "auto",
      // justifyContent: "center",
      // alignItems: "center",
      zIndex: 20,
      // backgroundColor: 'red'
    },
    unselectedTxt: {
    //   fontFamily: "pop-reg",
      fontFamily: "Poppins_400Regular",
      fontSize: 16,
      color: "black",
      textAlignVertical: "center",
      textAlign: Platform.OS === 'android' ? "center" : "auto",
      // justifyContent: "center",
      // alignItems: "center",
      zIndex: 20,
      // backgroundColor: 'red'
    }

  });