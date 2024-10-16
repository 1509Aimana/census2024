import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, Button, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';

export default function App() {
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [llg, setLLG] = useState('');
  const [ward, setWard] = useState('');
  const [censusUnit, setCensusUnit] = useState('');
  const [censusUnitType, setCensusUnitType] = useState('');
  const [workloadNo, setWorkloadNo] = useState('');
  const [locality, setLocality] = useState('');
  const [section, setSection] = useState('');
  const [lot, setLot] = useState('');

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log({
      province,
      district,
      llg,
      ward,
      censusUnit,
      censusUnitType,
      workloadNo,
      locality,
      section,
      lot,
    });
  };

  return (
    <ImageBackground
        source={require('@/assets/images/BG.png')}
        style={styles.background}
    >
        <ScrollView contentContainerStyle={styles.container}>
        <Image 
            source={require("@/assets/images/Header2.jpg")}
            style={styles.header2}
      />
      <Text style={styles.header}>Indicative Information</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Province Name"
        value={province}
        onChangeText={setProvince}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter District Name"
        value={district}
        onChangeText={setDistrict}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter LLG"
        value={llg}
        onChangeText={setLLG}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Ward"
        value={ward}
        onChangeText={setWard}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Census Unit"
        value={censusUnit}
        onChangeText={setCensusUnit}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Census Unit Type"
        value={censusUnitType}
        onChangeText={setCensusUnitType}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Workload No./Enumeration Area"
        value={workloadNo}
        onChangeText={setWorkloadNo}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Locality"
        value={locality}
        onChangeText={setLocality}
      />

      <View style={styles.row}>
        <TextInput
          style={styles.sectionInput}
          placeholder="Section"
          value={section}
          onChangeText={setSection}
        />
        <TextInput
          style={styles.lotInput}
          placeholder="Lot"
          value={lot}
          onChangeText={setLot}
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Form</Text>
      </TouchableOpacity>
    </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
  container: {
    flexGrow: 1,
    padding: 20,
    // backgroundColor: '#F38D31',
  },
  header2: {
    width: 350,
    height: 120,
    borderRadius: 25,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: 'black',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionInput: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    flex: 1,
    marginRight: 10,
  },
  lotInput: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#FFBF00',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
  },
  submitButtonText: {
    color: '#17202a',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
