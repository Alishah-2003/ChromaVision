import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, Montserrat_300Light, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import AppLoading from "expo-app-loading";

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  let [fontsLoaded] = useFonts({
    Montserrat_300Light, Montserrat_700Bold,
  });

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }
    try {
      const storedPassword = await AsyncStorage.getItem(name);
      if (storedPassword !== null) {
        Alert.alert('User already exists');
      } else {
        await AsyncStorage.setItem(name, password);
        Alert.alert('Sign up', "Sign Up successful!\nPress 'OK' to continue.", [
          { text: "OK", onPress: () => navigation.navigate("Login") },
        ]);
      }
    } catch (error) {
      Alert.alert('Error in signup');
    }
  };

  if (!fontsLoaded) {
    //return <AppLoading />;
    return null;
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>Create a new account.</Text>
        <Text style={styles.boxText}>NAME</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={setName}
            value={name}
          />
          <Text style={styles.boxText}>PASSWORD</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />
          <Text style={styles.boxText}>CONFIRM PASSWORD</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  subtitle: {
    textAlign: "center",
    fontFamily: "Montserrat_700Bold",
    fontSize: 12,
    marginBottom: 25,
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    marginBottom: 3,
    fontFamily: "Montserrat_700Bold",
  },
  boxText: {
    color: "black",
    fontSize: 12,
    textAlign: "left",
    marginBottom: 13,
    fontFamily: "Montserrat_700Bold",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: "#eecffa",
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 13,
    fontFamily: "Montserrat_300Light",
  },
  signupButton: {
    backgroundColor: "#490357",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginBottom: 10,
    width: 250,
    alignSelf: "center",
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Montserrat_700Bold",
    textAlign: "center",
  },
});
