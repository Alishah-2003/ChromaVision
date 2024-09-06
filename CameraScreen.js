import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Button, Image, Alert } from "react-native";
import { Camera } from "expo-camera";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { useFonts, Montserrat_300Light,Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import AppLoading from "expo-app-loading";
  
// Define the CameraScreen component
export default function CameraScreen({ navigation }) {
  const [camera, setCamera] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [processedImageUrl, setProcessedImageUrl] = useState(null);
  const [showCapturedImage, setShowCapturedImage] = useState(false);
  let [fontsLoaded] = useFonts({
    Montserrat_300Light, Montserrat_700Bold
  });

  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access camera was denied");
      }
    })();
  }, []);

  const captureImage = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedImage(photo);
      setShowCapturedImage(true);
      const base64Image = await FileSystem.readAsStringAsync(photo.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setImageBase64(base64Image);
    }
  };

  const fetchGrayImage = async () => {
    try {
      console.log("fetching...");
      if (!imageBase64) {
        console.error("Base64 image data not found.");
        return;
      }
      //const response = await fetch("http://10.0.21.4:5000/colorCorrect", {
      const response = await fetch("http://192.168.0.104:5000/colorCorrect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageBase64: imageBase64,
        }),
      });
      const data = await response.json();
      console.log(data);
      setProcessedImageUrl(data.imageUrl);

      setShowCapturedImage(false);
    } catch (error) {
      console.error("Error fetching grayscale image:", error);
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setShowCapturedImage(false);
    setProcessedImageUrl(null);
  };

  const saveImage = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        throw new Error("Permission to access media library not granted");
      }

      if (processedImageUrl) {
        // Get the file name from the processedImageUrl
        const fileName = processedImageUrl.substring(
          processedImageUrl.lastIndexOf("/") + 1
        );
        // Construct the local URI for the cache directory
        const localUri = `${FileSystem.cacheDirectory}${fileName}`;

        // Download the image to the cache directory
        await FileSystem.downloadAsync(processedImageUrl, localUri);

        // Move the image from the cache directory to external storage
        await MediaLibrary.saveToLibraryAsync(localUri);

        Alert.alert('Image saved successfully!','Your image has been successfully converted and saved to your gallery.');
      } else {
        Alert.alert('No image processed to be saved');
      }
    } catch (error) {
      console.error("Error saving image:", error);
      Alert.alert("Failed to save image");
    }
  };
  if (!fontsLoaded) {
    //return <AppLoading />;
    
  } else {


  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {showCapturedImage && capturedImage && (
          <Image source={{ uri: capturedImage.uri }} style={styles.image} />
        )}
        {!showCapturedImage && processedImageUrl && (
          <Image source={{ uri: processedImageUrl }} style={styles.image} />
        )}
        {!capturedImage && !showCapturedImage && (
          <Camera
            ref={cameraRef}
            style={styles.camera}
            type={Camera.Constants.Type.back}
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
        {!capturedImage && !showCapturedImage && (
          <View style={styles.buttonFirst}>
            <Button
              title="CAPTURE"
              //fontFamily="Montserrat_700Bold"
              onPress={captureImage}
              color="#490357"
              //paddingHorizontal="40"
              
            />
          </View>
        )}
        {capturedImage && !processedImageUrl && (
          <View style={styles.buttonRowFir}>
            <View style={styles.buttonSecond}>
              <Button title="CONVERT" onPress={fetchGrayImage} color="#490357" />
          </View>
          <View style={styles.buttonSecond}>
            <Button title="RETAKE" onPress={retakePhoto} color="#490357" />
        </View>
        </View>
      )}
        {(capturedImage || processedImageUrl) && (
          <View style={styles.buttonRowSec}>
            <View style={styles.buttonThird}>
              <Button title="RETAKE" onPress={retakePhoto} color="#490357" />
            </View>
            {processedImageUrl && (
              <View style={styles.buttonThird}>
                <Button title="SAVE" onPress={saveImage} color="#490357" />
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    //flex: 1,
    //width: "100%",
    justifyContent: "center",
    alignItems: "center",
    //paddingTop:20,
    //marginLeft:10,
    //paddingHorizontal:10,
    width:"100%",
    height:"100%",
  },
  image: {
    width: "100%",
    height: "100%",
    //paddingTop:50,
    //marginTop:50,
    //resizeMode: "contain",
  },
  camera: {
    flex: 1,
    //paddingTop:30,
    width: "100%",
    height:"100%",
    //marginBottom:22,
    alignItems:"center",
    justifyContent:"flex-end",
  },
  buttonContainer: {
    position:"absolute",
    //width: 200,
    flexDirection:"row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop:50,
    marginBottom: 20,
    
    fontFamily:"Montserrat_700Bold",
    bottom:10,
    margin:15,
    //paddingVertical:20,
  },
  buttonRowFir: {
    //flexDirection: "row",
    padding:15,
    fontFamily:"Montserrat_700Bold",
    justifyContent: "space-between",
    flexDirection:"row",
    marginHorizontal:100,
    //left:0,
    //right:0,
    //width: "100%",
   // margin: 20,
  },
  buttonRowSec: {
    //flexDirection: "row",
    padding:15,
    fontFamily:"Montserrat_700Bold",
    justifyContent: "space-between",
    flexDirection:"row",
    marginHorizontal:-100,
    //left:0,
    //right:0,
    //width: "100%",
   //margin: 20,
  },
  buttonFirst: {
    backgroundColor: "#490357",
    //paddingVertical: 1,
    //paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: "center",
    //fontFamily:"Montserrat_300Light",
    justifyContent: "space-evenly",
    width: 120,
    height:50,
    marginHorizontal: 5,
    fontWeight:"bold"
  },
  buttonSecond: {
    backgroundColor: "#490357",
    //paddingVertical: 1,
    //paddingHorizontal: 30,
    borderRadius: 40,
    alignItems: "center",
    fontFamily:"Montserrat_700Bold",
    justifyContent: "space-evenly",
    width: 110,
    height:50,
    //padding:15,
    marginTop:50,
    //position:'relative',
    marginHorizontal: 15,
  },
  buttonThird: {
    backgroundColor: "#490357",
    //paddingVertical: 1,
    //paddingHorizontal: 30,
    borderRadius: 40,
    alignItems: "center",
    fontFamily:"Montserrat_700Bold",
    justifyContent: "space-evenly",
    width: 110,
    height:50,
    
    
    marginTop:50,
    marginHorizontal: 30,
  },
});
