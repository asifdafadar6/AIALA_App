import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { MyContext } from "../../components/provider/contextApi";

export default function Questionnaire() {
  const {logout} = useContext(MyContext)
  const [step, setStep] = useState(1);
  const [selectedUserType, setSelectedUserType] = useState("");
  const router = useRouter();

  const handleNext = () => {
    if (selectedUserType === "Student") {
      router.push("/studentquestionnaire"); 
    } else if (selectedUserType === "Teacher") {
      router.push("/teacherquestionnaire");
    }else if (selectedUserType === "Student") {
      router.push("/studentquestionnaire");
    }
     else {
      Alert.alert("Error", "Please select a user type!"); 
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1); // Navigate back to the previous step
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/UserDetails.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <View style={styles.progressContainer}>
          <View style={[styles.step, step >= 1 ? styles.activeStep : null]}>
            <Text style={styles.stepText}>1</Text>
          </View>
          <View style={styles.line} />
          <View style={[styles.step, step >= 2 ? styles.activeStep : null]}>
            <Text style={styles.stepText}>2</Text>
          </View>
        </View>

        {step === 1 ? (
          <View style={styles.contentBox}>
            <Text style={styles.title}>
              To Provide the Best in Class Service, We need to Proceed with a Small Q&A Session
            </Text>
            <Text style={styles.subtitle}>Are you ready?</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.yesButton}
                onPress={() => setStep(2)}
              >
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.noButton}
                onPress={()=>{router.push('(auth)/SignIn')}}
              >
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.contentBox}>
            <Text style={styles.title}>Select User Type</Text>
            <View style={styles.dropdown}>
              <Picker
                selectedValue={selectedUserType}
                onValueChange={(itemValue) => setSelectedUserType(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select User Type" value="" />
                <Picker.Item label="Student" value="Student" />
                <Picker.Item label="Teacher" value="Teacher" />
              </Picker>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.previousButton}
                onPress={handlePrevious}
              >
                <Text style={styles.buttonText}>Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.nextButton}
                onPress={handleNext}
              >
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logoutButton: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "#0053A4",
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  logoutText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  step: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  activeStep: {
    backgroundColor: "#48C774",
    borderWidth: 1,
    borderColor: '#1a50a5'
  },
  stepText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  line: {
    width: 60,
    height: 1,
    backgroundColor: "#1a50a5",
    borderColor: '#1a50a5',
    borderWidth: 1
  },
  contentBox: {
    backgroundColor: "#0053A4",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  title: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 20,
  },
  subtitle: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 30,
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 8,
    width: "100%",
    marginBottom: 20,
  },
  picker: {
    height: 53,
    width: "100%",
    color: "gray",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    paddingTop: 20,
  },
  yesButton: {
    backgroundColor: "#48C774",
    paddingVertical: 10,
    borderRadius: 8,
    width: "45%",
    marginRight: 10, // Add margin between buttons
  },
  noButton: {
    backgroundColor: "#F89D2C",
    paddingVertical: 10,
    borderRadius: 8,
    width: "45%",
  },
  previousButton: {
    backgroundColor: "#F89D2C",
    paddingVertical: 10,
    borderRadius: 8,
    width: "45%",
  },
  nextButton: {
    backgroundColor: "#48C774",
    paddingVertical: 10,
    borderRadius: 8,
    width: "45%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center", // Center text within buttons
  },
});
