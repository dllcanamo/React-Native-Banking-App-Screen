import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Appearance,
  useColorScheme,
  Platform,
  Text,
} from "react-native";
import { useFonts } from "expo-font";
import Dummy from "./constants/Dummy";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";

import ExpIncComponent from "./components/ExpIncComponent";
import DateConfigComponent from "./components/DateConfigComponent";
import TotalsComponent from "./components/TotalsComponent";
import SummaryComponent from "./components/SummaryComponent";
import BreakdownComponent from "./components/BreakdownComponent";

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCat, setActiveCat] = useState("exp");
  const [activeData, setActiveData] = useState(Dummy.Exp);
  const [activeDate, setActiveDate] = useState("day");
  const [activeTable, setActiveTable] = useState(activeData.day);

  const colorScheme = useColorScheme();

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  useEffect(() => {
    setActiveTable(activeData[activeDate]);
    setActiveIndex(1);
  }, [activeCat, activeDate]);

  function triggerSwipeChange(index) {
    // let num = index;
    // if(index == 0) {
    //   num = 1
    // }
    if (index != activeIndex) {
      setActiveIndex(index);
    }
  }

  function triggerPressChange(index) {
    // let num = index;
    // if(index == 0) {
    //   num = 1
    // }
    if (index != activeIndex) {
      setActiveIndex(index);
    }
  }

  function triggerDateChange(config) {
    setActiveDate(config);
  }

  function triggerCatChange(cat) {
    setActiveCat(cat);
    setActiveData(cat !== "exp" ? Dummy.Inc : Dummy.Exp);
  }

  return (
    <View style={styles.container}>
      <View
        style={
          colorScheme == "light"
            ? [styles.rootScreen, styles.lightMode]
            : [styles.rootScreen, styles.darkMode]
        }
      >
        <StatusBar
          style={colorScheme == "light" ? "dark-content" : "light"}
          backgroundColor={colorScheme != "light" ? "black" : "white"}
        />
        <ExpIncComponent
          onPress={triggerCatChange}
          activeCat={activeCat}
          scheme={colorScheme}
        ></ExpIncComponent>

        <DateConfigComponent
          activeDate={activeDate}
          scheme={colorScheme}
          onPress={triggerDateChange}
        ></DateConfigComponent>

        <View style={styles.summContCont}>
          <View style={styles.summCont}>
            <SummaryComponent
              onPress={triggerPressChange}
              activeIndex={activeIndex}
              data={activeTable}
              scheme={colorScheme}
            ></SummaryComponent>
          </View>
        </View>

        <View>
          <TotalsComponent
            onSnap={triggerSwipeChange}
            activeIndex={activeIndex}
            data={activeTable}
            scheme={colorScheme}
          ></TotalsComponent>
        </View>

        <BreakdownComponent
          activeIndex={activeIndex}
          activeCat={activeCat}
          data={activeTable}
          scheme={colorScheme}
        ></BreakdownComponent>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    width: '100%'
  },
  darkMode: {
    backgroundColor: "black",
  },
  lightMode: {
    // backgroundColor: "#f5f5f5"
    backgroundColor: "transparent",
  },
  compCont: {
    flex: 1,
    marginTop: 44,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  summContCont: {
    // backgroundColor: 'green',
    flexShrink: 1,
    flexBasis: 1,
    flexGrow: 1,
  },
  summCont: {
    height: "100%",
  },
  navBot: {
    height: 94,
    backgroundColor: "green",
  },
});
