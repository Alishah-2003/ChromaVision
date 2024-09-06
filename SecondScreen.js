// Import necessary libraries and components
import React, { useState, useRef } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useFonts, Montserrat_300Light,Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import AppLoading from "expo-app-loading";

// Define the SecondScreen component
export default function SecondScreen({ navigation }) {
  const [showCamera, setShowCamera] = useState(false); // State to manage camera visibility
  const [capturedPhoto, setCapturedPhoto] = useState(null); // State to manage captured photo
  const [photoTaken, setPhotoTaken] = useState(false); // State to manage whether photo is taken
  const cameraRef = useRef(null); // Reference to the camera component
  let [fontsLoaded] = useFonts({
    Montserrat_300Light,Montserrat_700Bold,
  });

  // Function to handle the click event of "Click to Begin" button
  const handleBeginClick = () => {
    navigation.navigate("ImageProcessing"); // Navigate to CameraScreen
  };

  const handleLoginClick = () => {
    navigation.navigate("Login");
    console.log("login clicked");
  };

  const handleSignupClick = () => {
    navigation.navigate("Signup");
    console.log("signup clicked");
  };

  const handleGuestClick = () => {
    // Handle guest button click
    console.log("guest mode");
    navigation.navigate("ImageProcessing");
  };
  if (!fontsLoaded) {
    //return <AppLoading />;
    return null;
  } else {
    return (
      <View style={styles.container}>
        {/* Content when camera is not shown */}
        {!showCamera ? (
          <>
            <View style={styles.topContainer}>
              <Text style={styles.title}>ChromaVision</Text>
              <Text style={styles.subtitle}>
                - Discover a colorful world, tailored for you.
              </Text>
            </View>
            {/* Buttons for login, signup, and view as guest */}
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[styles.button, styles.loginButton]}
                onPress={handleLoginClick}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[styles.button, styles.signupButton]}
                onPress={handleSignupClick}
              >
                <Text style={styles.buttonText}>Signup</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[styles.button, styles.guestButton]}
                onPress={handleGuestClick}
              >
                <Text style={styles.buttonText}>Guest Mode</Text>
              </TouchableOpacity>
            </View>
            {/* Button to begin using the app */}
            <TouchableOpacity
              style={styles.beginButton}
              onPress={handleBeginClick}
            >
              <Text style={styles.buttonText}>Try The App</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={{ flex: 1 }}>
            {/* If photo is taken, display it with options to save or retake */}
            {photoTaken ? (
              <View style={{ flex: 1 }}>
                <Image
                  source={{ uri: capturedPhoto.uri }}
                  style={{ flex: 1 }}
                  resizeMode="cover"
                />
                <View style={styles.captureButtonGroup}>
                  <TouchableOpacity
                    style={[styles.button, styles.captureButton]}
                    onPress={savePhoto}
                  >
                    <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity>
                  <View style={{ width: 20 }} />
                  <TouchableOpacity
                    style={[styles.button, styles.captureButton]}
                    onPress={retakePicture}
                  >
                    <Text style={styles.buttonText}>Retake</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              /* If photo is not taken, display the camera */
              <Camera
                style={styles.camera}
                ref={cameraRef}
                type={Camera.Constants.Type.back}
              >
                <TouchableOpacity
                  style={styles.captureButton}
                  onPress={handleTakePicture}
                >
                  <Text style={styles.captureButtonText}>Take Picture</Text>
                </TouchableOpacity>
              </Camera>
            )}
          </View>
        )}
      </View>
    );
  }
  // Render the UI
}

// Define styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  // Define other styles...
  topContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    // fontWeight: "bold",
    marginBottom: 2,
    fontFamily: "Montserrat_700Bold",
  },
  subtitle: {
    fontSize: 15,
    color: "black",
    paddingTop:4,
    fontFamily:"Montserrat_300Light",
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
    padding:5,
    //paddingTop:10,
  },
  button: {
    //backgroundColor: "#41054d", // Dark purple color
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    width: 180,
    backgroundColor: "#490357",
    //marginTop:3,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontFamily:"Montserrat_700Bold",
  },
  /*loginButton: {
     // Dark purple color
  },
  signupButton: {
    backgroundColor: "#4B0082", // Dark purple color
  },
  guestButton: {
    backgroundColor: "#4B0082", // Dark purple color
  },*/
  beginButton: {
    backgroundColor: "#490357", // Dark purple color
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 40,
    //marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 180,
    marginTop:3,
  },
});
