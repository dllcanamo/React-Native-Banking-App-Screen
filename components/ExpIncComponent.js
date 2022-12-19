import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";

import Colors from "../constants/Colors";

import GradientButton2 from "./GradientButton2";

import { useFonts, Poppins_600SemiBold } from "@expo-google-fonts/poppins";

function ExpIncComponent(props) {
  const [activeCat, setActiveCat] = useState("");

  const styles = getStyles(props.scheme);

  function buttonPressed(cat) {
    props.onPress(cat);
  }

  useEffect(() => {
    setActiveCat(props.activeCat);
  }, [props.activeCat]);

  let [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.expIncCont}>
      <TouchableOpacity
        style={[styles.button, styles.expenseBtn]}
        // onPress={()=>{console.log('pressed!');}}
        onPress={buttonPressed.bind(this, "exp")}
      >
        <LinearGradient
          style={[styles.button, { width: "100%" }]}
          colors={
            activeCat == "exp"
              ? [Colors.gradPink, Colors.gradYellow]
              : props.scheme == "light"
              ? ["white", "white"]
              : [Colors.gray, Colors.gray]
          }
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
        >
          <View style={styles.viewPressCont}>
            {activeCat == "exp" ? <GradientButton2 /> : <></>}
            <Text
              style={
                props.scheme == "light" && activeCat != "exp"
                  ? styles.unselectedTxt
                  : styles.btnText
              }
            >
              {" "}
              Expense{" "}
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.incomeBtn]}
        // onPress={()=>{console.log('pressed!');}}
        onPress={buttonPressed.bind(this, "inc")}
      >
        <LinearGradient
          style={[styles.button, { width: "100%" }]}
          colors={
            activeCat == "inc"
              ? [Colors.gradPink, Colors.gradYellow]
              : props.scheme == "light"
              ? ["white", "white"]
              : [Colors.gray, Colors.gray]
          }
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
        >
          <View style={styles.viewPressCont}>
            {activeCat == "inc" ? <GradientButton2 /> : <></>}
            {/* <GradientButton /> */}
            <Text
              style={
                props.scheme == "light" && activeCat != "inc"
                  ? styles.unselectedTxt
                  : styles.btnText
              }
            >
              {" "}
              Income{" "}
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

export default ExpIncComponent;

const getStyles = (scheme) =>
  StyleSheet.create({
    expIncCont: {
      height: 65,
      flexDirection: "row",
      paddingHorizontal: 16,
      paddingTop: 10,
      paddingBottom: 11,
    },
    button: {
      flex: 1,
      height: 44,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    },
    expenseBtn: {
      marginRight: 5,
      textAlignVertical: "center",
    },
    incomeBtn: {
      marginLeft: 5,
    },
    viewPressCont: {
      flex: 1,
      alignSelf: "stretch",
      justifyContent: "center",
      alignItems: "center",
    },
    btnText: {
      //   fontFamily: "pop-med",
      fontFamily: "Poppins_600SemiBold",
      fontSize: 16,
      color: "white",
      textAlignVertical: "center",
      textAlign: Platform.OS === "android" ? "center" : "auto",
      includeFontPadding: false,
      zIndex: 20,
    },
    unselectedTxt: {
      //   fontFamily: "pop-med",
      fontFamily: "Poppins_600SemiBold",
      fontSize: 16,
      color: "black",
      textAlignVertical: "center",
      textAlign: Platform.OS === "android" ? "center" : "auto",
      zIndex: 20,
    },
  });
