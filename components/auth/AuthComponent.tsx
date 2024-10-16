import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "expo-router";

const AuthComponent = () => {
  const navigation = useNavigation();

  const handleSignIn = () => {
    // code to handle the browse action
    (navigation as any).navigate("dashboard");
  };


  // State to track which form is displayed (Sign In or Sign Up)
  const [isSignIn, setIsSignIn] = useState(true);

  // Switch between Sign In and Sign Up form
  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/SS.png")}
        style={styles.header}
      />
      {/* Title */}
      <Text style={styles.headerText}>
        {isSignIn ? "Login to Your Account" : "Create a New Account"}
      </Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="UserName"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor="#888"
      />

      {!isSignIn && (
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          placeholderTextColor="#888"
        />
      )}

      <TouchableOpacity style={styles.button} onPress={() => handleSignIn()}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Action Button
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>
          {isSignIn ? "Sign In" : "Sign Up"}
        </Text>
      </TouchableOpacity> */}

      {/* Toggle between forms */}
      <TouchableOpacity onPress={toggleForm}>
        <Text style={styles.toggleText}>
          {isSignIn
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
// Modern styling for the form
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f2f2f2", // Light background for a clean look
    borderRadius: 20,
    width: "100%",
  },
  header: {
    width: 250,
    top: -40,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333", // Dark text for contrast
    marginBottom: 40, // Space between header and form
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#fff", // White background for inputs
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3, // Elevation for Android shadow
  },
  button: {
    backgroundColor: "#4CAF50", // Green for action button
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 80,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  toggleText: {
    color: "#2196F3", // Blue link for toggling between forms
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 20,
  },
});

export default AuthComponent;
