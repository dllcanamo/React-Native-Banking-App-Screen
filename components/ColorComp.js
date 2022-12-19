import React, { useState, useEffect } from "react";
import { StyleSheet, View } from 'react-native';

import Pairings from "../constants/Pairings";

function ColorComp(props) {
    const [activeHeight, setActiveHeight] = useState(10);

    let opacity = 0.2;
    if(props.index === props.activeIndex) {
        opacity = 1;
    }

    const styles = getStyles(activeHeight, opacity, props.label);

    useEffect(() => {
        setActiveHeight(props.size);
    });

    

    return (
        <View style={styles.cont}>
            <View style={styles.colorComp}></View>
        </View>

    );
}

export default ColorComp;

const getStyles = (activeHeight, opacity, color) => StyleSheet.create({
    rootScreen: {
      flex: 1
    },
    cont: {
        paddingVertical: 1
    },
    colorComp: {
        backgroundColor: Pairings[color],
        width: "100%",
        height:  activeHeight,
        borderRadius: activeHeight/2,
        opacity: opacity
    }
  });