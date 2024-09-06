import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, Montserrat_300Light, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import AppLoading from "expo-app-loading";

export default function LoginScreen({ navigation }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  let [fontsLoaded] = useFonts({
    Montserrat_300Light, Montserrat_700Bold,
  });

  const handleLogin = async () => {
    try {
      const storedPassword = await AsyncStorage.getItem(name);
      if (storedPassword === null) {
        Alert.alert('User does not exist');
      } else if (storedPassword === password) {
        Alert.alert('Login', "Login successful!\nPress 'OK' to continue.", 
          [{ text: 'OK', onPress: () => navigation.navigate("Camera") }]
        );
      } else {
        Alert.alert('Invalid username or password');
      }
    } catch (error) {
      Alert.alert('Error in login');
    }
  };

  if (!fontsLoaded) {
    //return <AppLoading />;
    return null;
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Login to your account.</Text>
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
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  subtitle: {
    textAlign: "center",
    fontFamily: "Montserrat_700Bold",
    fontSize: 12,
    marginBottom: 25,
  },
  boxText: {
    color: "black",
    fontSize: 12,
    textAlign: "left",
    marginBottom: 13,
    fontFamily: "Montserrat_700Bold",
  },
  title: {
    textAlign: "center",
    fontSize: 40,
    fontFamily: "Montserrat_700Bold",
    marginBottom: 3,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: '#eecffa',
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 13,
    fontFamily: "Montserrat_300Light",
  },
  loginButton: {
    backgroundColor: '#490357',
    borderRadius: 30,
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 40,
    width: 170,
    alignSelf: "center",
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: "Montserrat_700Bold",
    textAlign: 'center',
  },
});
