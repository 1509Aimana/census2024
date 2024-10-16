import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  Platform,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Pressable,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  addPerson,
  getPersons,
  updatePerson,
  deletePerson,
  initializeDB,
  Person,
} from "@/database"; // Import initializeDB
import { useNavigation } from "expo-router";

const Dashboard = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("Select Gender");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [age, setAge] = useState("");
  const [maritalStatus, setMartialStatus] = useState("Select Martial Status");
  const [householdRole, setHouseholdRole] = useState ("");
  const [persons, setPersons] = useState<Person[]>([]);
  const [selectedPerson] = useState<number | null>(null);
  const [editingPersonId, setEditingPersonId] = useState<number | null>(null); // Track if updating a person
  
  const navigation = useNavigation();

  const [citizenship, setCitizenship] = useState('');
  const [isCitizen, setIsCitizen] = useState(false);
  const [isNonCitizen, setIsNonCitizen] = useState(false);

  const handleCitizenCheck = () => {
    setIsCitizen(true);
    setIsNonCitizen(false);
    setCitizenship('Citizen');
  };

  const handleNonCitizenCheck = () => {
    setIsCitizen(false);
    setIsNonCitizen(true);
    setCitizenship('Non-Citizen');
  };

  const handleNextPage = () => {
    // code to handle the browse action
    (navigation as any).navigate("IndicativeInformation");
  };


  const onChangeDate = (_event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const fetchPersons = async () => {
    const allPersons = await getPersons();
    setPersons(allPersons);
  };

  useEffect(() => {
    const setupDatabase = async () => {
      await initializeDB();
      fetchPersons();
    };

    setupDatabase();
  }, []);

  const handleSubmit = async () => {
    if (
      !firstName ||
      !lastName ||
      !age ||
      gender === "Select Gender"
    ) {
      Alert.alert("Error", "Please fill in all fields correctly.");
      return;
    }

    try {
      if (editingPersonId) {
        // Update existing person
        await updatePerson(
          editingPersonId,
          firstName,
          lastName,
          date.toISOString(),
          age,
          gender,
          maritalStatus,
          citizenship, // Add this argument
          householdRole // Add this argument
        );
        console.log("Person updated successfully");
      } else {
        // Add new person
        const id = await addPerson(
          firstName,
          lastName,
          date.toISOString(),
          age,
          gender,
          maritalStatus,
          citizenship, // Add this argument
          householdRole,  // Add thisargument
        );
        console.log("Person created successfully with ID:", id);
      }
      resetForm();
      fetchPersons(); // Refresh the list
    } catch (error) {
      console.error("Error submitting person:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePerson(id);
      console.log("Person deleted successfully");
      fetchPersons(); // Refresh the list after deleting
    } catch (error) {
      console.error("Error deleting person:", error);
    }
  };

  const handleUpdateClick = (person: Person) => {
    // Populate the form with the selected person's data
    setFirstName(person.firstName);
    setLastName(person.lastName);
    setGender(person.gender);
    setDate(new Date(person.date)); // Assuming dateOfBirth is a string
    setAge(person.age);
    setMartialStatus(person.martialStatus as string);
    setCitizenship(person.citizenship);
    setHouseholdRole(person.householdRoles);
    setEditingPersonId(person.id); // Set the ID for updating
  };

  const resetForm = () => {
    // Clear the form after submission or update
    setFirstName("");
    setLastName("");
    setGender("Select Gender");
    setDate(new Date());
    setAge("");
    setMartialStatus("Select Martial Status");
    setCitizenship("Citizenship")
    setHouseholdRole("Household Roles");
    setEditingPersonId(null); // Reset ID for creating new entries
  };

  function handleNext(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <ImageBackground
      source={require('@/assets/images/BG.png')}
      style={styles.background}
    >
      <ScrollView>
        <View style={styles.container}>
        <Image 
          source={require("@/assets/images/Header2.jpg")}
          style={styles.header2}
        />
          <Text style={styles.header}>Data Entry Form</Text>

          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            placeholderTextColor="#888"
          />

          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            placeholderTextColor="#888"
          />


          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label={"Select Gender"} value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>

          <View>
            <Button
              title="Select Date of Birth"
              onPress={() => setShowDatePicker(true)}
            />
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onChangeDate}
              />
            )}
            <Text style={styles.dateText}>
              Date of Birth: {date.toDateString()}
            </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Age"
            value={age}
            onChangeText={setAge}
            placeholderTextColor="#888"
          />
          <Picker
            selectedValue={maritalStatus}
            onValueChange={(itemValue) => setMartialStatus(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label={"Select Martial Status"} value="" />
            <Picker.Item label="Never Married" value="never married" />
            <Picker.Item label="Married/Living Together" value="married/living together" />
            <Picker.Item label="Serperated" value="serperated" />
            <Picker.Item label="Divorced" value="divorced" />
            <Picker.Item label="Widowed" value="widowed" />
          </Picker>

          <Picker
            selectedValue={householdRole}
            onValueChange={(itemValue) => setHouseholdRole(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label={"Role in Household"} value="" />
            <Picker.Item label="Head of Household" value="Head of Household" />
            <Picker.Item label="Husband/Wife" value="Husband/Wife" />
            <Picker.Item label="Own Son" value="Own Son" />
            <Picker.Item label="Own Daughter" value="Own Daughter" />
            <Picker.Item label="Father/Mother" value="Father/Mother" />
          </Picker>

          <View style={styles.main}>
            <Text style={styles.label1}>Citizenship</Text>
            <View style={styles.checkboxContainer}>
            <Pressable onPress={handleCitizenCheck} style={styles.checkbox}>
              <Text style={[styles.checkboxIcon, isCitizen ? styles.checked : null]}>{isCitizen ? '☑' : '☐'}</Text>
              <Text style={styles.label}>Citizen</Text>
            </Pressable>
            <Pressable onPress={handleNonCitizenCheck} style={styles.checkbox}>
              <Text style={[styles.checkboxIcon, isNonCitizen ? styles.checked : null]}>{isNonCitizen ? '☑' : '☐'}</Text>
              <Text style={styles.label}>Non-Citizen</Text>
            </Pressable>
            </View>
          </View>

          <TouchableOpacity style={styles.button1} onPress={() => handleNextPage()}>
            <Text style={styles.buttonText1}>Next Form</Text>
          </TouchableOpacity>

          <Button
            title={selectedPerson ? "Update" : "Submit"}
            onPress={handleSubmit}
          />

          {/* Table to display records */}
          <View style={styles.tableContainer}>
            {/* <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>First Name</Text>
              <Text style={styles.tableHeaderText}>Last Name</Text>
              <Text style={styles.tableHeaderText}>Gender</Text>
              <Text style={styles.tableHeaderText}>Date of Birth</Text>
              <Text style={styles.tableHeaderText}>Age</Text>
              <Text style={styles.tableHeaderText}>Martial Status</Text>
              <Text style={styles.tableHeaderText}>Household roles</Text>
              <Text style={styles.tableHeaderText}>Citizenship</Text>
              <Text style={styles.tableHeaderText}>Actions</Text>
            </View> */}
            {persons.map((person) => (
              <View key={person.id} style={styles.tableRow}>
                <Text style={styles.tableRowText}>{person.firstName}</Text>
                <Text style={styles.tableRowText}>{person.lastName}</Text>
                <Text style={styles.tableRowText}>{person.gender}</Text>
                <Text style={styles.tableRowText}>{person.age}</Text>
                <Text style={styles.tableRowText}>{person.martialStatus}</Text>
                <Text style={styles.tableRowText}>{person.householdRoles}</Text>
                <Text style={styles.tableRowText}>{person.citizenship}</Text>
                <Text style={styles.tableRowText}>
                  {new Date(person.date).toDateString()}
                </Text>
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={styles.updateButton}
                    onPress={() => handleUpdateClick(person)}
                  >
                    <Text style={styles.buttonText}>Update</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(person.id)}
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  main: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    height: 90,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxIcon: {
    fontSize: 24,
    color: 'black', // or any other default color you want
  },
  checked: {
    color: 'red', // or any other color you want
  },
  label: {
    marginLeft: 8,
    fontSize: 17,
  },
  label1: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
  header2: {
    width: 350,
    height: 120,
    borderRadius: 25,
    marginBottom: 25,
  },
  container: {
    flex: 1,
    padding: 20,
    // backgroundColor: "#4CAF50", 
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  picker: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  dateText: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 16,
    color: "#666",
  },
  personContainer: {
    marginBottom: 20,
  },
  tableContainer: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f1f1f1",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tableRowText: {
    flex: 1,
    textAlign: "center",
  },
  actionButtons: {
    flexDirection: "row",
  },
  updateButton: {
    backgroundColor: "#4CAF50",
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  deleteButton: { backgroundColor: "#F44336", padding: 5, borderRadius: 5 },
  buttonText: { color: "#fff", fontWeight: "bold" },
  button1: {
    backgroundColor: "#FFBF00", // Green for action button
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
  buttonText1: {
    color: "#17202a",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default Dashboard;
function rgb(_arg0: number, _arg1: number, _arg2: number): number {
  throw new Error("Function not implemented.");
}

function gradient(_arg0: number, _deg: any, _arg2: any, _arg3: number, _arg4: any, _arg5: number) {
  throw new Error("Function not implemented.");
}

function rgba(_arg0: number, _arg1: number, _arg2: number, _arg3: number): any {
  throw new Error("Function not implemented.");
}

function fetchPersons() {
  throw new Error("Function not implemented.");
}

function setFirstName(firstName: string) {
  throw new Error("Function not implemented.");
}

function setLastName(lastName: string) {
  throw new Error("Function not implemented.");
}

function setGender(gender: string) {
  throw new Error("Function not implemented.");
}

function setDate(arg0: Date) {
  throw new Error("Function not implemented.");
}

function setAge(_age: string) {
  throw new Error("Function not implemented.");
}

function setMartialStatus(martialstatus: any) {
  throw new Error("Function not implemented.");
}

function setEditingPersonId(id: number) {
  throw new Error("Function not implemented.");
}

