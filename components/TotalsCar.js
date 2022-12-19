import Carousel from 'react-native-reanimated-carousel';
import { useState, useEffect, useRef } from 'react';
import { View, Text, Dimensions, Pressable, StyleSheet, Platform, PanResponder, Animated, TouchableOpacity } from 'react-native';
import * as React from 'react';

import {
    useFonts,
    Poppins_300Light,
    Poppins_700Bold,
  } from '@expo-google-fonts/poppins';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function TotalsCar(props) {

    let [fontsLoaded] = useFonts({
        Poppins_300Light,
        Poppins_700Bold,
      });

    const pan = useRef(new Animated.ValueXY()).current;
    const panResponder = useRef(
        PanResponder.create({
          onMoveShouldSetPanResponder: () => true,
          onPanResponderGrant: () => {
            // console.log('triggered!');
            pan.setOffset({
              x: pan.x._value,
              y: pan.y._value
            });
          },
          onPanResponderMove: () => {
            // console.log('moving...');
            setPress(true);
            setOpac(1);
          },    
          onPanResponderRelease: () => {
            pan.flattenOffset();
            // console.log('released!');
            setPress(false);
            setOpac(0.33);
          }
        })
      ).current;

    const [opac, setOpac] = useState(0.33);
    const [isPressedIn, setPress] = useState(false);
    const [index, setIndex] = useState(0);
    const r = React.useRef(null);

    let interval;

    useEffect(() => {
        r.current.scrollTo({index: props.activeIndex, animated: true});
        // setIndex(props.activeIndex);
    },[props.activeIndex]);

    function handleScroll() {
        // setOpac(1);
        // setPress(true);
        // console.log('adding');
        // interval = setInterval(() => {
        // setOpac(1);
        // }, 100);
    }

    function unhandleScroll() {
        // setPress(false);
        // console.log('reverting');
        // if(Platform.OS === 'ios' || Platform.OS === 'web') {
            // setTimeout(() => {
            //     setOpac(0.33);
            // }, 500);
        // }
    }

    function startSroll() {
        // setOpac(1);

        // interval = setInterval(() => {
        //     props.onSnap(r.current.getCurrentIndex());
        //   }, 100);
    }
    
    function logSmth() {
        // console.log('hello');
        if(props.activeIndex != r.current.getCurrentIndex() && isPressedIn) {
            props.onSnap(r.current.getCurrentIndex());
        }

    }

    function doSmth() {
        // console.log('saying hello');
        setPress(true);
        setOpac(1);
    }

    function dontDoSmth() {
        // console.log('saying bye');
        // setPress(false);
        // setOpac(0.33);
    }

    function endScroll() {
        // clearInterval(interval);
        // setTimeout(() => {
        //     setOpac(0.33);
        // }, 700);
        // console.log('saying bye');
        setPress(false);
        setOpac(0.33);
    }

    function revertOpac(slideIndex) {
        if(slideIndex == 0) {
            r.current.next();
            props.onSnap(1);
        } else {
            props.onSnap(slideIndex);
        }
        // setTimeout(() => {
        //     setOpac(0.33);
        // },700);
        // if(Platform.OS === 'android') {
            // setTimeout(() => {
            //     setOpac(0.33);
            // }, 500);
        // }
    }

    function configureStyles(index) {
        let arrToReturn = [];
        if(props.scheme === 'light') {
            arrToReturn.push(styles.itemAmtLight);
        } else {
            arrToReturn.push(styles.itemAmt);
        }
        if(index !== props.activeIndex) {
            arrToReturn.push({opacity : 0.33});
        }
        return arrToReturn;
    }

    function renderItem({item, index}) {
        if(index == 0) {
            return;
        }
        return (
            // <Animated.View
            //     pointerEvents={'auto'}
            //     {...panResponder.panHandlers}
            // >
                <View style={styles.itemCont}>
                    {/* <Text style={props.scheme === 'light' ? [styles.itemAmtLight] : [styles.itemAmt]}> */}
                    <Text style={configureStyles(index)}>
                        {item.split(".")[0]}
                        <Text style={styles.decimal}>.{item.split(".")[1]}</Text>
                    </Text>
                </View>
            // </Animated.View>

        );
    }

    return (
        <View  
            onStartShouldSetResponder={() => true}
            onResponderMove={doSmth}
            onResponderRelease={dontDoSmth}
            style={{opacity: opac}}>
            {/* <Pressable onPressIn={handleScroll} onPressOut={unhandleScroll}> */}
            {/* <Animated.View
                style={{
                    // backgroundColor: 'red'
                }}
                pointerEvents={'box-none'}
                {...panResponder.panHandlers}
            > */}
            {/* <TouchableOpacity> */}
                {/* <View style={{zIndex: 20}}> */}
                <Carousel
                    ref={r}
                    loop={false}
                    onSnapToItem={revertOpac}
                    onProgressChange={logSmth}
                    onScrollBegin={startSroll}
                    onScrollEnd={endScroll}
                    data={props.entries}
                    renderItem={renderItem}
                    width={viewportWidth}
                    height={45}
                    snapEnabled={true}
                    defaultIndex={1}
                    style={[
                        {
                            width: viewportWidth,
                            height: 45,
                            justifyContent: 'center',
                            alignItems: 'center',
                        },
                    ]}
                    mode={'parallax'}
                    modeConfig={{
                        parallaxScrollingScale: 1,
                        parallaxScrollingOffset: 180,
                        parallaxAdjacentItemScale: 0.9
                    }}
                >
                </Carousel> 
                {/* </View> */}
            {/* </TouchableOpacity> */}

            {/* </Animated.View> */}
            {/* </Pressable> */}
        </View>

    );
}

export default TotalsCar;

const styles = StyleSheet.create({
    itemCont: {
        // backgroundColor: "red",
        width: viewportWidth*0.7,
        alignSelf: "center",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    itemAmt: {
        fontSize: 32,
        fontFamily: "Poppins_700Bold",
        color: "white"
    },
    itemAmtLight: {
        fontSize: 32,
        fontFamily: "Poppins_700Bold",
        color: "black"
    },
    decimal: {
        fontFamily: "Poppins_300Light"
    }
  });