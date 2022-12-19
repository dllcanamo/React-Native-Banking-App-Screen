import { FlatList, StyleSheet, View, Text, Pressable } from 'react-native';

import ColorComp from './ColorComp';
import { useState, useEffect } from 'react';

import {
    useFonts,
    Poppins_400Regular,
    Poppins_600SemiBold,
  } from '@expo-google-fonts/poppins';

function SummaryComponent(props) {
    const [dateEntries, setDataEntries] = useState([]);

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_600SemiBold,
      });
  
    useEffect(()=>{
      if(props.data.data) {
        let dataArray = props.data.data;
        setDataEntries([]);
        setDataEntries(dataArray);
      }
    },[props.data]);

    function dontDoSmth() {

    }

    function doSmth() {

    }
  
    //can track first and last items to remove extra margins
    function renderFlatItem({item, index}) {
  
      //if index is 0, give no margin left
      //if last item, give no margin right
      //neither, return normal code
      if(index == 0) {
        return;
      }
  
      let dataToPass = [];
      let totalCanSpend = 0;
      for (var key in item.brkdwn) {
        totalCanSpend = totalCanSpend + props.data.maxEach;
      }
      for (var key in item.brkdwn) {
        dataToPass.push({label: key, amt: (item.brkdwn[key]/totalCanSpend)*(300)});
      }
      dataToPass.sort((a, b) => a.amt-b.amt);
  
      
        // <Pressable onPress={selectItem.bind(this, index)}>
          {/* <View style={styles.sumItem}> */}
          {/* <View style={index == 0 ? [styles.sumItem, styles.firstItem] : 
            (index == dateEntries.length - 1 ? [styles.sumItem, styles.lastItem] : [styles.sumItem])}> */}
      return (
          <View style={index == 0 ? [styles.sumItem, styles.firstItem] : 
            (index == dateEntries.length - 1 ? [styles.sumItem, styles.lastItem] : [styles.sumItem])}
            // onStartShouldSetResponder={() => true}
            // onResponderMove={doSmth}
            // onResponderRelease={dontDoSmth}
            // pointerEvents='auto'
          >
            <View style={styles.colorsCont}>
                <FlatList
                  data={dataToPass}
                  inverted={true}
                  renderItem={(colorItem) => {
                    return (
                      <Pressable  onPress={selectItem.bind(this, index)}>
                        <ColorComp 
                          size={colorItem.item.amt} 
                          index={index}
                          activeIndex={props.activeIndex}
                          label={colorItem.item.label}
                        >
                        </ColorComp>
                      </Pressable>
                    )
                  }}
                  // renderItem={renderColors}
                  showsVerticalScrollIndicator={false}
                >
                </FlatList>
            </View>
            <Text style={props.scheme == 'light' ? styles.itemLabelLight : styles.itemLabel}>{item.label}</Text>
          </View>
        // </Pressable>
      );
    }
  
    function selectItem(index) {
      props.onPress(index);
      // console.log('summ comp ' + index);
    }
  
    return (
      <View style={styles.sumCont}>
        <FlatList
          horizontal={true}
          data={dateEntries}
          renderItem={renderFlatItem}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.catList}
        >
        </FlatList>
      </View>
    );
  }
  
  export default SummaryComponent;
  
  const styles = StyleSheet.create({
      sumCont: {
        flex: 1,
        paddingHorizontal: 16,
        overflow: "hidden",
      },
      catList: {
        justifyContent: "center",
        flexGrow: 1,
      },
      sumItem: {
        flex: 1,
        marginHorizontal: 5,
        width: 48,
        alignItems: "center",
      },
      colorsCont: {
        flex: 1,
        width: "100%",
      },
      colorsScroll: {
        flex: 1,
        flexDirection: "column-reverse",
        alignItems: "center"
      },
      itemLabel: {
        fontFamily: "Poppins_400Regular",
        fontSize: 14,
        color: "white",
        marginVertical: 8
      }, 
      itemLabelLight: {
        fontFamily: "Poppins_400Regular",
        fontSize: 14,
        color: "black",
        marginVertical: 8
      },
      firstItem: {
        // marginLeft: 16
        marginLeft: 0
      },
      lastItem: {
        // marginRight: 16
        marginRight: 0
      }
    });