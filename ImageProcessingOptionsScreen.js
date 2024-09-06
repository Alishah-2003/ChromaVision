import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { useFonts, Montserrat_300Light,Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import AppLoading from "expo-app-loading";


export default function ImageProcessingOptionsScreen({ navigation }) {
    let [fontsLoaded] = useFonts({
    Montserrat_300Light, Montserrat_700Bold
  });
   
const handlePressDue=()=> {

console.log("Deuteranopia button pressed");
navigation.navigate("Camera");
};
 if (!fontsLoaded) {
    //return <AppLoading />;
    return null;
  } else {
    return (
    <View style={styles.container}>
    <Text style={styles.title}>Deuteranopia</Text>
      <View style={[styles.box, { backgroundColor: "#eecffa" }]}>
            <Text style={styles.boxText}>
              It's the most common type of color blindness where people have difficulty distinguishing between colors in the red-green range. 
            </Text>
          </View>
          <View style={[styles.box, { backgroundColor: "#eecffa" }]}>
            <Text style={styles.boxText}>
              As a result, those with deuteranopia may have challenges in tasks such as identifying traffic lights, reading maps, or matching clothes based on color. 
            </Text>
          </View>
          <View style={[styles.box, { backgroundColor: "#eecffa" }]}>
            <Text style={styles.boxText}>
              Our app converts the photos you captured to be more colorful and vibrant, bringing out their beauty with just a snap.
            </Text>
          </View>
          
        <TouchableOpacity style={styles.optionButton} onPress={handlePressDue}>
        <Text style={styles.optionButtonText}>Convert Now!</Text>
          </TouchableOpacity>
          </View>
        );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
   title: {
    fontSize: 33,
    // fontWeight: "bold",
    marginBottom: 20,
    textAlign:"center",
    fontFamily: "Montserrat_700Bold",
  },
  optionButton: {
    backgroundColor: '#4B0082',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginVertical: 10,
  },
  box: {
  
    width: 300,
    height: 130,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#eecffa",
    marginBottom: 20,
    //paddingTop: 10,
  },
  boxText: {
    color: "black",
    fontSize: 14.5,
    //fontWeight: "bold",
    //padding: 10,
    textAlign:"center",
    paddingLeft: 12,
    paddingRight: 12,
    fontFamily: "Montserrat_700Bold",
  },
  optionButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: "Montserrat_700Bold",
  },
  processedImageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  processedImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});
