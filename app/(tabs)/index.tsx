import {
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Text,
  View,
  Button,
  ImageBackground,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import AuthComponent from "@/components/auth/AuthComponent";
import React from "react";

export default function HomeScreen() {
  const navigation = useNavigation();

  const handleDashboard = () => {
    // code to handle the browse action
    (navigation as any).navigate("dashboard");
  };

  const handleSignIn = () => {
    (navigation as any).navigate("auth");
  };

  const testRoute = () => {
    (navigation as any).navigate("test");
  };

  return (
    <ImageBackground
      source={require('@/assets/images/BG.png')}
      style={styles.background}
    >
      <View style={styles.container}>
      <Image source={require("@/assets/images/SS.png")}
        style={styles.header}
      />
      {/* Two Text Messages */}
      <Text style={styles.headerText}>PAPUA NEW GUNIEA NATIONAL POPULATION CENSUS 2024</Text>
      <Text style={styles.subText}>
       
      </Text>

      {/* <TouchableOpacity style={styles.button} onPress={() => handleDashboard()}>
        <Text style={styles.buttonText}>Data Entry</Text>
      </TouchableOpacity> */}

      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={() => handleSignIn()}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  );
}

// Styling for a modern, attractive layout
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    // backgroundColor: "#f5f5f5", // Light background for contrast against buttons
  },
  header: {
    width: 350,
    top: -40,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 40, // Space between text and buttons
  },
  button: {
    backgroundColor: "#4CAF50", // Modern green color
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 50,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Elevation for Android
  },
  buttonSecondary: {
    backgroundColor: "#FFD700", // Stylish blue for Sign In/Sign Up buttons
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 50,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Elevation for Android
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
