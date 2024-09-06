// PhotoPreviewScreen.js
import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function PhotoPreviewScreen({  navigation }) {
    console.log("preview screen");

  

  
  const handleRetake = () => {
    navigation.navigate("SecondScreen");
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo.uri }} style={styles.image} resizeMode="cover" />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.processButton]} onPress={handleProcess}>
          <Text style={styles.buttonText}>Process</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.retakeButton]} onPress={handleRetake}>
          <Text style={styles.buttonText}>Retake</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
  },
  button: {
    backgroundColor: '#490357',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  processButton: {
    backgroundColor: '#490357',
  },
  retakeButton: {
    backgroundColor: '#490357',
  },
});
