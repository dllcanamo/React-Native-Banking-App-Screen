import { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Colors from '../constants/Colors';
import TotalsCar from './TotalsCar';

import {
    useFonts,
    Poppins_400Regular
  } from '@expo-google-fonts/poppins';

function TotalsComponent(props) {
    // const [opacity, setOpacity] = useState(0.33);
    const [entries, setEntries] = useState([]);
    
    useEffect(() => {
      if(props.data.data) {
        let dataArray = props.data.data;
        setEntries([]);
        dataArray.forEach(element => {
          let localTotal = 0;
          for (var key in element.brkdwn) {
            localTotal = localTotal + element.brkdwn[key];
          }
            let stringNum = '₱ ' + localTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            if (stringNum.split('.')[1] == undefined) {
              stringNum = stringNum + '.00'
            } else if (stringNum.split('.')[1].length == 1) {
              stringNum = stringNum + '0'
            }
          setEntries((currentEntries) => [...currentEntries, stringNum]);
        });
      }
    },[props.data]);

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
    });
    
    if (!fontsLoaded) {
    return null;
    }
  
    function triggerItemChange(index) {
      props.onSnap(index);
    }
  
    return (
        <View style={styles.totalsCont}>
            <Text style={styles.totalsText}>Total Expenses</Text>
            <View
              style={styles.pressCont}
            >
              <View style={styles.carouselCont}>
                {/* <TotalsCarousel 
                  entries={entries}
                  onSnap={triggerItemChange} 
                  activeIndex={props.activeIndex}
                  scheme={props.scheme}
                /> */}
                <TotalsCar
                  entries={entries}
                  onSnap={triggerItemChange} 
                  activeIndex={props.activeIndex}
                  scheme={props.scheme}
                >
                </TotalsCar>
              </View>
            </View>
        </View>
  
    );
  }

  export default TotalsComponent;

const styles = StyleSheet.create({
    container: {

    },
    totalsCont: {
      paddingTop: 16,
      paddingBottom: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    totalsText: {
      fontFamily: "Poppins_400Regular",
      fontSize: 16,
      marginBottom: 8,
      color: Colors.grayText,
    },
    pressCont : {
      height: 45,
      zIndex: 0.5,
    },  
    carouselCont: {
      flex: 1,
      width: "100%",
      alignItems: "center",
    }
  });