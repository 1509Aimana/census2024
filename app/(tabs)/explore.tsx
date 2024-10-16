import React from 'react';
import { 
  StyleSheet,
  Text,
  TextInput, 
  View,
  Image,
  Button, 
  ScrollView,
  ImageBackground
  } from 'react-native';

export default function App() {
  return (
    <ImageBackground
        source={require('@/assets/images/BG.png')}
        style={styles.background}
    >
        <View style={styles.container}>
          <Image
            source={require("@/assets/images/Header2.jpg")}
            style={styles.headerImage}
          />

          {/* Comments/Remarks Section */}
            <Text style={styles.label}>Comments/Remarks. (Note in the space below any comments/questions if you have.)</Text>
            <TextInput 
              style={styles.textInput} 
              multiline={true} 
              placeholder="Write your comments here..." 
            />

            {/* Thank You Text */}
            <Text style={styles.thankYouText}>"THANK YOU FOR YOUR PARTICIPATION"</Text>

          {/* Bottom Image */}
          <Image 
            source={require("@/assets/images/SS.png")} // Replace with your footer image URL
            style={styles.footerImage} 
          />

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <Button title="Save Form" onPress={() => alert('Form Saved!')} />
            <Button title="Log Out" onPress={() => alert('Logged Out!')} color="orange" />
          </View>

        </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    padding: 10,
  },
  container: {
    flex: 1,
    padding: 20,
    // backgroundColor: "#4CAF50", 
    justifyContent: "center",
    top: 30,
  },
  headerImage: {
    width: 330,
    height: 100,
    marginBottom: 20,
    borderRadius: 25,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#000',
  },
  textInput: {
    height: 150,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  thankYouText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
  footerImage: {
    width: 300,
    height: 300,
    marginBottom: 20,
    top: -40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 50,
  },
});
