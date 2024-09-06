import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { useFonts } from "expo-font";
import { useFonts, Montserrat_300Light,Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import AppLoading from "expo-app-loading";

export default function HomeScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    Montserrat_300Light, Montserrat_700Bold
  });
  const handleSkipPress = () => {
    navigation.navigate("Second");
    console.log("Skip button pressed");
  };
  if (!fontsLoaded) {
    //return <AppLoading />;
    return null;
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>ChromaVision</Text>
        <Text style={styles.boldText}>
                Hi, welcome to ChromaVision!
              </Text>
        <View style={styles.content}>
          <View style={[styles.box, { backgroundColor: "#eecffa" }]}>
            <Text style={styles.boxText}>
              Open your eyes to a world of vibrant hues and rich tones with our color assistance app.
            </Text>
          </View>
          <View style={[styles.box, { backgroundColor: "#eecffa" }]}>
            <Text style={styles.boxText}>
              I provide a seamless experience, enhancing your ability to perceive colors accurately in real life.
            </Text>
          </View>
          <View style={[styles.box, { backgroundColor: "#eecffa" }]}>
            <Text style={styles.boxText}>
              Analyzing the surrounding colors, I adjust visual output to cater precisely to your color blindness.
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkipPress}>
          <Text style={styles.skipButtonText}>GET STARTED</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 80,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 33,
    // fontWeight: "bold",
    marginBottom: 20,
    textAlign:"center",
    fontFamily: "Montserrat_700Bold",
  },
  content: {
    alignItems: "center",
     // Aligns boxes at the center horizontally
    //textAlign: "center",
  },
  box: {
  
    width: 300,
    height: 110,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#eecffa",
    marginBottom: 20,
    //paddingTop: 10,
  },
  boxText: {
    color: "black",
    fontSize: 15,
    //fontWeight: "bold",
    //padding: 10,
    textAlign:"center",
    paddingLeft: 12,
    paddingRight: 12,
    fontFamily: "Montserrat_700Bold",
  },
  boldText: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 18,
    //marginBottom:10,
    paddingBottom:35,
  },
  skipButton: {
    backgroundColor: "#490357", // Dark purple color
    //paddingVertical: 25,
    //paddingHorizontal: 25,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop:28,
    width: 205,
    height:65,

  },
  skipButtonText: {
    color: "white",
    fontSize: 17,
    fontFamily: "Montserrat_700Bold",
  },
});
