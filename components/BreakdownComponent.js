import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { useState, useEffect } from 'react';

import Colors from '../constants/Colors';
import Pairings from '../constants/Pairings'
import PairingsText from '../constants/PairingsText'
import * as Progress from 'react-native-progress';

import {
    useFonts,
    Poppins_600SemiBold,
    Poppins_400Regular
  } from '@expo-google-fonts/poppins';

function BreakdownComponent(props) {
    const [entries, setEntries] = useState([]);
  
    useEffect(()=>{
      if(props.data.data) {
        let dataArray = props.data.data;
        if(dataArray[props.activeIndex].brkdwn) {
          // CAUSES ERROR WHEN ACTIVE INDEX IS BEYOND DATA'S ARRAY LENGTH
          let brkdwnObject = dataArray[props.activeIndex].brkdwn;
          setEntries([]);
          for (var key in brkdwnObject) {
            let labelToPass = key;
            let amount = brkdwnObject[key];
            setEntries((currentEntries) => [...currentEntries, {label: labelToPass, amt: amount}]);
          }
        }
      }
    },[props.data, props.activeIndex]);

    let [fontsLoaded] = useFonts({
        Poppins_600SemiBold,
        Poppins_400Regular
    });
    
    if (!fontsLoaded) {
    return null;
    }
  
    function renderFlatItem({item, index}) {
  
      function selectProperIcon() {
        switch(item.label) {
          case 'food':
            return(
              <Image 
                source={props.scheme == 'light' ? require('../assets/images/food-black.png') : require('../assets/images/food.png')}
                style={{ width: 24, height: 24 }}
              />
            );
            break;
          case 'resto':
            return(
              <Image 
                source={props.scheme == 'light' ? require('../assets/images/resto-black.png') : require('../assets/images/resto.png')}
                style={{ width: 24, height: 24 }}
              />
            );
            break;
          case 'health':
            return(
              <Image 
                source={props.scheme == 'light' ? require('../assets/images/health-black.png') : require('../assets/images/health.png')}
                style={{ width: 24, height: 24 }}
              />
            );
            break;
          case 'shop':
            return(
              <Image 
                source={props.scheme == 'light' ? require('../assets/images/shop-black.png') : require('../assets/images/shop.png')}
                style={{ width: 24, height: 24 }}
              />
            );
            break;
          case 'stocks':
            return(
              <Image 
                source={props.scheme == 'light' ? require('../assets/images/stocks-black.png') : require('../assets/images/stocks.png')}
                style={{ width: 24, height: 24 }}
              />
            );
            break; 
          case 'se':
            return(
              <Image 
                source={props.scheme == 'light' ? require('../assets/images/se-black.png') : require('../assets/images/se.png')}
                style={{ width: 24, height: 24 }}
              />
            );
            break;  
          case 'fl':
            return(
              <Image 
                source={props.scheme == 'light' ? require('../assets/images/fl-black.png') : require('../assets/images/fl.png')}
                style={{ width: 24, height: 24 }}
              />
            );
            break;
        }
      }
  
      let stringNum = item.amt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      if(props.activeCat === 'exp') {
        stringNum = '- ' + stringNum;
      }
      if (stringNum.split('.')[1] == undefined) {
        stringNum = stringNum + '.00'
      } else if (stringNum.split('.')[1].length == 1) {
        stringNum = stringNum + '0'
      }
      stringNum = stringNum + ' ₱';
  
      return (
        <View style={styles.category}>
          <View style={props.scheme == 'light' ? styles.iconContLight : styles.iconCont}>
            {selectProperIcon()}
          </View>
          <View style={styles.nameBarCont}>
             <View style={styles.nameAmt}>
               <Text style={props.scheme == 'light' ? styles.catTextLight : styles.catText}>{PairingsText[item.label]}</Text>
               <Text style={props.scheme == 'light' ? styles.amtLight : styles.amt}>
                  {stringNum.split(".")[0]}
                  <Text style={styles.decimal}>.{stringNum.split(".")[1]}</Text>
                </Text>
             </View>
             <View style={styles.progress}>
               <Progress.Bar progress={item.amt/props.data.maxEach}
                 width={null}
                 height={4}
                 borderRadius={2}
                 borderWidth={0}
                 unfilledColor={props.scheme == 'light' ? Colors.grayLight : Colors.gray}
                 color={Pairings[item.label]}
               />
             </View>
           </View>
        </View>
      );
    }
  
    return (
      <FlatList 
        style={styles.brkdwnCont}
        data={entries}
        renderItem={renderFlatItem}
      >
      </FlatList>
    );
  }
  
  export default BreakdownComponent;

  const styles = StyleSheet.create({
    brkdwnCont: {
      flex: 1,
    },
    category: {
      flexDirection: "row",
      height: 72,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    iconCont: {
      height: 48,
      width: 48,
      marginRight: 10,
      borderRadius:24,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors.gray
    },
    iconContLight: {
      height: 48,
      width: 48,
      marginRight: 10,
      borderRadius:24,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white"
    },
    nameBarCont: {
      flex: 1,
      height: 48,
      justifyContent: "center",
    },
    nameAmt: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    progress: {
      flex: 1,
      height: 10,
      justifyContent: "center",
    },
    catText: {
      fontFamily: "Poppins_600SemiBold",
      fontSize: 16,
      color: "white"
    },
    catTextLight: {
      fontFamily: "Poppins_600SemiBold",
      fontSize: 16,
      color: "black"
    },
    amt: {
      fontFamily: "Poppins_600SemiBold",
      fontSize: 16,
      color: "white"
    },
    amtLight: {
      fontFamily: "Poppins_600SemiBold",
      fontSize: 16,
      color: "black"
    },
    decimal: {
      fontFamily: "Poppins_400Regular",
    }
  });