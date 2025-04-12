import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';

export default function studentQuestionnaire() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState('');
  const [otherPrimaryGoal, setOtherPrimaryGoal] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('');
  const [otherBoard, setOtherBoard] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedStudyPreference, setSelectedStudyPreference] = useState('');
  const [selectedChallenge, setSelectedChallenge] = useState('');
  const [selectedSecondarySubject, setSelectedSecondarySubject] = useState('');
  const [otherSecondarySubject, setOtherSecondarySubject] = useState('');
  const [selectedSupportType, setSelectedSupportType] = useState('');
  const [additionalSupportDetails, setAdditionalSupportDetails] = useState('');
  const [selectedSupportOption,setSelectedSupportOption] = useState('');
  const [selectedDigitalTools, setSelectedDigitalTools] = useState('');
  const [digitalToolsDetails, setDigitalToolsDetails] = useState('');
  const [selectedSupport, setSelectedSupport] = useState("");
  const [supportDetails, setSupportDetails] = useState("")

  const [studentData, setStudentData] = useState({
    questionnaire: {
      // username: existingUser.username,
      // user_type: selectedUserType,
      profession: "",
      number_of_children: 0,
      child_details: [],
      favorite_subjects: selectedSubject,
      least_favorite_subjects: selectedSubject,
      study_challenges: selectedChallenge,
      teaching_specialization: [],
      secondary_subject: "",
      competitive_exam_ready: true,
      support_needed: ["Personalized study plans", "Exam preparation tips"],
      extracurricular_activities: ["Music", "Drama"],
      educational_goals:
        "To excel in NEET and secure admission into a reputed medical college",
    },
    subscription: {
      subscription_status: "Active",
      subscription_type: "Monthly",
      subscription_value: 500,
    },
  });

  console.log("Student Data", studentData);



  const handleNext = () => {
    if (currentStep === 1 && selectedGoal) {
      if (selectedGoal === 'Yes (Please Specify)' && !otherPrimaryGoal) {
        alert("Please specify the details.");
        return;
      }
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 2 && selectedSchool && selectedClass) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 3 && selectedBoard) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 4 && selectedStudyPreference) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 5 && selectedSubject) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 6 && selectedChallenge) {
      // if (selectedSecondarySubject === 'Other (Please specify)' && !otherSecondarySubject) {
      //   alert("Please specify your other secondary subject.");
      //   return;
      // }
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 7 && selectedSecondarySubject) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 8) {
      if (selectedSupportOption === 'Yes (Please Specify)' && !additionalSupportDetails) {
        alert("Please specify the details.");
        return;
      }
      setCurrentStep(currentStep + 1);
    }
     else if (currentStep === 9 && selectedDigitalTools) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 10) {
      if (selectedSupport === 'Other' && !supportDetails) {
        alert("Please specify your other secondary subject.");
        return;
      }
      setCurrentStep(currentStep + 1);
    }else {
      alert("Please provide input before proceeding.");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    // Update the teacherData with userType
    // const updatedTeacherData = {
    //     ...teacherData,
    //     userType: "Teacher", // Add the userType as "Teacher"
    // };

    // // Optionally log or send data to an API
    // console.log("Submitting Teacher Data:", updatedTeacherData);

    // Navigate to the drawer or any other route
    router.push('(drawer)');
  };


  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Step 1: Primary Goal
  return (
    <View style={styles.formContainer}>
      <Text style={styles.questionText}>What is Your Primary Goal?</Text>
      <ScrollView>
        <View style={styles.optionsGrid}>
          {[
            'Doctor', 'Engineer', 'Entrepreneur', 'Scientist', 'Teacher',
            'Artist', 'Writer', 'Athlete', 'Pilot', 'Architect',
            'Social Worker', 'Actor', 'Businessman', 'Politician',
            'Software Developer', 'Researcher', 'Musician', 'Environmentalist',
            'Content Creator', 'Chef', 'Astronaut', 'Fashion Designer',
            'Other (Please Specify)'
          ].map((goal, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                selectedGoal === goal && styles.selectedOption
              ]}
              onPress={() => setSelectedGoal(goal)}
            >
              <View style={styles.radioButton}>
                {selectedGoal === goal && (
                  <View style={styles.selectedRadio} />
                )}
              </View>
              <Text style={styles.optionText}>{goal}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Input for "Other (Please Specify)" option */}
        {selectedGoal === 'Other (Please Specify)' && (
          <TextInput
            style={styles.textInput}
            placeholder="Please specify..."
            placeholderTextColor="#888"
            onChangeText={(text) => setOtherPrimaryGoal(text)} // Update "Other" input state
            value={otherPrimaryGoal} // Display "Other" input value
          />
        )}
      
      <View style={styles.navButtons}>
        <TouchableOpacity
          style={styles.navButtonPrevious}
          onPress={() => {
            router.push('(auth)/Questionnaire');
          }}
        >
          <Text style={styles.navButtonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButtonNext} onPress={handleNext}>
          <Text style={styles.navButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  );
      case 2: // Step 2: Select School and Class
        return (
          <View style={styles.formContainer}>
            <Text style={styles.questionText}>What class are you in?</Text>
            {/* School Selection */}
            <ScrollView>
              {['Primary School', 'Middle School', 'High School', 'Senior Secondary School', 'Undergraduate Programs']
                .reduce((rows, school, index, array) => {
                  if (index % 2 === 0) {
                    rows.push(array.slice(index, index + 2)); // Group items in pairs of two
                  }
                  return rows;
                }, [])
                .map((row, rowIndex) => (
                  <View key={rowIndex} style={styles.row}>
                    {row.map((school, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.option}
                        onPress={() => {
                          setSelectedSchool(school);
                          setSelectedClass(null); // Reset class selection when school changes
                        }}
                      >
                        <View style={styles.radioButton}>
                          {selectedSchool === school && <View style={styles.selectedRadio} />}
                        </View>
                        <Text style={styles.optionText}>{school}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ))}
            </ScrollView>

            {/* Class Selection (Only if a school is selected) */}
            {selectedSchool && (
              <View style={styles.classContainer}>
                <Text style={styles.subQuestionText}>
                  Select a class for {selectedSchool}:
                </Text>
                <ScrollView>
                  {getClassesBySchool(selectedSchool)
                    .reduce((rows, classOption, index, array) => {
                      if (index % 2 === 0) {
                        rows.push(array.slice(index, index + 2)); // Group items in pairs of two
                      }
                      return rows;
                    }, [])
                    .map((row, rowIndex) => (
                      <View key={rowIndex} style={styles.row}>
                        {row.map((classOption, index) => (
                          <TouchableOpacity
                            key={index}
                            style={styles.option}
                            onPress={() => setSelectedClass(classOption)}
                          >
                            <View style={styles.radioButton}>
                              {selectedClass === classOption && (
                                <View style={styles.selectedRadio} />
                              )}
                            </View>
                            <Text style={styles.optionText}>{classOption}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    ))}
                </ScrollView>
              </View>
            )}

            <View style={styles.navButtons}>
              <TouchableOpacity style={styles.navButtonPrevious} onPress={handlePrevious}>
                <Text style={styles.navButtonText}>Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navButtonNext} onPress={handleNext}>
                <Text style={styles.navButtonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case 3: // Step 3: Educational Boards
        return (
          <View style={styles.formContainer}>
            <Text style={styles.questionText}>
              What board are you interested in?
            </Text>
            <ScrollView>
              <View style={styles.optionsGrid}>
                {['CBSE', 'ICSC', 'State Board', 'Others (Please Specify)'].map((board, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.option}
                    onPress={() => {
                      setSelectedBoard(board);
                      if (board !== 'Others (Please Specify)') {
                        setOtherBoard(''); // Reset "Others" input when a predefined board is selected
                      }
                    }}
                  >
                    <View style={styles.radioButton}>
                      {selectedBoard === board && <View style={styles.selectedRadio} />}
                    </View>
                    <Text style={styles.optionText}>{board}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              {selectedBoard === 'Others (Please Specify)' && (
                <TextInput
                  style={styles.textInput}
                  placeholder="Please specify..."
                  placeholderTextColor="#888"
                  onChangeText={(text) => setOtherBoard(text)} // Update "Others" input state
                  value={otherBoard} // Display "Others" input value
                />
              )}
            </ScrollView>

            <View style={styles.navButtons}>
              <TouchableOpacity style={styles.navButtonPrevious} onPress={handlePrevious}>
                <Text style={styles.navButtonText}>Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navButtonNext} onPress={handleNext}>
                <Text style={styles.navButtonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      case 4: // Step 4: Study Preference
        return (
          <View style={styles.formContainer}>
            <Text style={styles.questionText}>How do you prefer to study?</Text>
            <ScrollView>
              <View style={styles.optionsGrid}>
                {[
                  'Alone',
                  'In a group',
                  'With a Tutor'
                ].map((preference, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.option}
                    onPress={() => setSelectedStudyPreference(preference)}
                  >
                    <View style={styles.radioButton}>
                      {selectedStudyPreference === preference && (
                        <View style={styles.selectedRadio} />
                      )}
                    </View>
                    <Text style={styles.optionText}>{preference}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            <View style={styles.navButtons}>
              <TouchableOpacity style={styles.navButtonPrevious} onPress={handlePrevious}>
                <Text style={styles.navButtonText}>Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navButtonNext} onPress={handleNext}>
                <Text style={styles.navButtonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      case 5: // Step 4: Least Favorite Subject
        return (
          <View style={styles.formContainer}>
            <Text style={styles.questionText}>What is your favorite subject?</Text>
            <ScrollView>
              <View style={styles.optionsGrid}>
                {[
                  'Mathematics',
                  'Science',
                  'English',
                  'Social Studies',
                  'Physics',
                  'Chemistry',
                  'Biology',
                ].map((subject, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.option}
                    onPress={() => setSelectedSubject(subject)}
                  >
                    <View style={styles.radioButton}>
                      {selectedSubject === subject && (
                        <View style={styles.selectedRadio} />
                      )}
                    </View>
                    <Text style={styles.optionText}>{subject}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            <View style={styles.navButtons}>
              <TouchableOpacity style={styles.navButtonPrevious} onPress={handlePrevious}>
                <Text style={styles.navButtonText}>Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navButtonNext} onPress={handleNext}>
                <Text style={styles.navButtonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      case 6: // Step 5: Challenges in Teaching
        return (
          <View style={styles.formContainer}>
            <Text style={styles.questionText}>What are your study challenges?</Text>
            <ScrollView>
              <View style={styles.optionsGrid}>
                {[
                  'Understanding Complex',
                  'Staying Motivated',
                  'Lack of Resources',
                  'Time Management',
                ].map((challenge, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.option}
                    onPress={() => setSelectedChallenge(challenge)}
                  >
                    <View style={styles.radioButton}>
                      {selectedChallenge === challenge && (
                        <View style={styles.selectedRadio} />
                      )}
                    </View>
                    <Text style={styles.optionText}>{challenge}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              {selectedChallenge === 'Other (Please specify)' && (
                <TextInput
                  style={styles.textInput}
                  placeholder="Please specify..."
                  placeholderTextColor="#888"
                  onChangeText={(text) => setSelectedChallenge(text)}
                  value={selectedChallenge}
                />
              )}
            </ScrollView>
            <View style={styles.navButtons}>
              <TouchableOpacity style={styles.navButtonPrevious} onPress={handlePrevious}>
                <Text style={styles.navButtonText}>Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navButtonNext} onPress={handleNext}>
                <Text style={styles.navButtonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case 7: // Step 6: Secondary Subject
        return (
          <View style={styles.formContainer}>
            <Text style={styles.questionText}>Are You Compititive exam ready?</Text>
            <ScrollView>
              <View style={styles.optionsGrid}>
                {[
                  'Yes',
                  'No',
                ].map((subject, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.option}
                    onPress={() => setSelectedSecondarySubject(subject)}
                  >
                    <View style={styles.radioButton}>
                      {selectedSecondarySubject === subject && (
                        <View style={styles.selectedRadio} />
                      )}
                    </View>
                    <Text style={styles.optionText}>{subject}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              {/* Input for "Other" option */}
              {/* {selectedSecondarySubject === 'Other (Please specify)' && (
                <TextInput
                  style={styles.textInput}
                  placeholder="Please specify..."
                  placeholderTextColor="#888"
                  onChangeText={(text) => setOtherSecondarySubject(text)}
                  value={otherSecondarySubject}
                />
              )} */}
            </ScrollView>
            <View style={styles.navButtons}>
              <TouchableOpacity style={styles.navButtonPrevious} onPress={handlePrevious}>
                <Text style={styles.navButtonText}>Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navButtonNext} onPress={handleNext}>
                <Text style={styles.navButtonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
        case 8:
          return (
            <View style={styles.formContainer}>
              <Text style={styles.questionText}>
                Do you need help with time management or planning study schedules?
              </Text>
              <ScrollView>
                <View style={styles.optionsGrid}>
                  {[
                    'Yes (Please Specify)',
                    'No',
                  ].map((supportOption, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.option}
                      onPress={() => setSelectedSupportOption(supportOption)}
                    >
                      <View style={styles.radioButton}>
                        {selectedSupportOption === supportOption && (
                          <View style={styles.selectedRadio} />
                        )}
                      </View>
                      <Text style={styles.optionText}>{supportOption}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
        
                {selectedSupportOption === 'Yes (Please Specify)' && (
                  <TextInput
                    style={styles.textInput}
                    placeholder="Please specify..."
                    placeholderTextColor="#888"
                    onChangeText={(text) => setAdditionalSupportDetails(text)}
                    value={additionalSupportDetails}
                  />
                )}
              </ScrollView>
              <View style={styles.navButtons}>
                <TouchableOpacity style={styles.navButtonPrevious} onPress={handlePrevious}>
                  <Text style={styles.navButtonText}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButtonNext} onPress={handleNext}>
                  <Text style={styles.navButtonText}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          );        
      case 9: // Step 8: Digital Tools Usage
        return (
          <View style={styles.formContainer}>
            <Text style={styles.questionText}>
              What is your educational goal?
            </Text>
            <ScrollView>
              <View style={styles.optionsGrid}>
                {['To excel in NEET and secure admission into a reputed medical college',
                 'To achieve high scores in board exams',
                'To develop a strong foundation in science for future studies',
              'To gain skills for competitive exams and job opportunities'].map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.option}
                    onPress={() => setSelectedDigitalTools(option)}
                  >
                    <View style={styles.radioButton}>
                      {selectedDigitalTools === option && (
                        <View style={styles.selectedRadio} />
                      )}
                    </View>
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            <View style={styles.navButtons}>
              <TouchableOpacity
                style={styles.navButtonPrevious}
                onPress={handlePrevious}
              >
                <Text style={styles.navButtonText}>Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navButtonNext} onPress={handleNext}>
                <Text style={styles.navButtonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case 10: // Step 9: Digital Tools Usage
        return (
          <View style={styles.formContainer}>
            <Text style={styles.questionText}>
              Do you have extracurricular activities?
            </Text>
            <ScrollView>
              <View style={styles.optionsGrid}>
                {['Music', 'Drama', 'Play', 'Other'].map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.option}
                    onPress={() => setSelectedSupport(option)} // Updated here
                  >
                    <View style={styles.radioButton}>
                      {selectedSupport === option && ( // Updated here
                        <View style={styles.selectedRadio} />
                      )}
                    </View>
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            {/* Input Field for "Yes" Option */}
            {selectedSupport === 'Other' && ( // Updated here
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Please specify the support you need..."
                  placeholderTextColor="#ccc"
                  value={supportDetails} // Updated here
                  onChangeText={setSupportDetails} // Updated here
                />
              </View>
            )}
            <View style={styles.navButtons}>
              <TouchableOpacity style={styles.navButtonPrevious} onPress={handlePrevious}>
                <Text style={styles.navButtonText}>Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navButtonNext} onPress={handleNext}>
                <Text style={styles.navButtonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      case 11:
        return (
          <View style={styles.formContainer}>
            <Text style={styles.questionText}>Your Subscription Plan</Text>
            <View style={styles.subscriptionDetails}>
              <Text style={styles.subscriptionText}>Subscription Status: Active</Text>
              <Text style={styles.subscriptionText}>Subscription Type: Yearly</Text>
              <Text style={styles.subscriptionText}>Subscription Value: ₹3000</Text>
            </View>
            <View style={styles.navButtons}>
              <TouchableOpacity
                style={styles.navButtonPrevious}
                onPress={handlePrevious}
              >
                <Text style={styles.navButtonText}>Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.navButtonNext}
                onPress={handleSubmit}
              >
                <Text style={styles.navButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      default:
        return <Text>Step {currentStep} Content</Text>;
    }
  };

  // Helper function to get classes based on selected school
  const getClassesBySchool = (school) => {
    const classes = {
      'Primary School': ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5'],
      'Middle School': ['Grade 6', 'Grade 7', 'Grade 8'],
      'High School': ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
      'Senior Secondary School': ['Grade 11', 'Grade 12'],
      'Undergraduate Programs': ['First Year', 'Second Year', 'Third Year', 'Fourth Year']
    };
    return classes[school] || [];
  };

  return (
    <ImageBackground
      source={require('../../assets/images/UserDetails.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Progress Tracker */}
        <View style={styles.progressContainer}>
  <View style={styles.progressGroup}>
    {/* Show steps 1-6 if currentStep is between 1 and 6 */}
    {currentStep <= 6 &&
      [1, 2, 3, 4, 5, 6].map((step, index) => {
        const isCompleted = currentStep >= step;
        return (
          <View key={step} style={styles.progressItem}>
            <View style={[styles.progressCircle, isCompleted && styles.completedCircle]}>
              <Text
                style={[
                  styles.progressText,
                  isCompleted && styles.completedProgressText,
                  currentStep === step && styles.activeProgressText,
                ]}
              >
                {step}
              </Text>
            </View>
            {index < 5 && <View style={styles.line} />} {/* Line between circles */}
          </View>
        );
      })}

    {/* Show steps 7-11 if currentStep is greater than 6 */}
    {currentStep > 6 &&
      [7, 8, 9, 10, 11].map((step, index) => {
        const isCompleted = currentStep >= step;
        return (
          <View key={step} style={styles.progressItem}>
            <View style={[styles.progressCircle, isCompleted && styles.completedCircle]}>
              <Text
                style={[
                  styles.progressText,
                  isCompleted && styles.completedProgressText,
                  currentStep === step && styles.activeProgressText,
                ]}
              >
                {step}
              </Text>
            </View>
            {index < 4 && <View style={styles.line} />} {/* Line between circles */}
          </View>
        );
      })}
  </View>
</View>

        {/* Step Content */}
        <View style={styles.contentContainer}>{renderStepContent()}</View>
      </View>
    </ImageBackground>

  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  progressGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ccc',
    backgroundColor: '#4caf50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeProgressCircle: {
    borderColor: '#0d47a1',
    backgroundColor: '#0d47a1', // Active circle background
  },
  completedCircle: {
    borderColor: '#0d47a1',
    // backgroundColor: '#4caf50',
  },
  progressText: {
    fontSize: 14,
    color: '#000',
  },
  completedProgressText: {
    color: '#000',
  },
  activeProgressText: {
    color: '#fff',
    fontWeight: 'bold',
    // backgroundColor:'#0d47a1'
  },
  line: {
    width: 20,
    height: 2,
    backgroundColor: '#0d47a1',
    // marginHorizontal: 5,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 20,
  },
  optionsContainer: {
    marginVertical: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    // backgroundColor: 'transparent',  // Default background is transparent
  },
  selectedOption: {
    borderColor: 'orange', // Change border color when selected
    // backgroundColor: 'white', // Change background color when selected
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,

  },
  subQuestionText: {
    color: '#fff',
    paddingBottom: 20
  },
  selectedRadio: {
    width: 12,
    height: 12,
    borderRadius: 6,
    // backgroundColor: '#0066CC',
    color: "orange",
    borderColor: 'orange'
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  navButtonPrevious: {
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  navButtonNext: {
    backgroundColor: '#32CD32',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  navButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  formContainer: {
    marginVertical: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  subscriptionDetails: {
    color: '#fff'
  },
  subscriptionText: {
    color: '#fff',
    fontSize: 20
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%', // Adjust width for two-column layout
    marginBottom: 15,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedRadio: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
  optionText: {
    fontSize: 16,
    color: '#fff', // Adjust text color based on theme
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: '#002D72', // Blue background for the form
    padding: 20,
    borderRadius: 10,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%', // Adjust width for two-column layout
    marginBottom: 15,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedRadio: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
  optionText: {
    fontSize: 16,
    color: '#fff', // Adjust text color based on theme
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: '#002D72', // Blue background for the form
    padding: 20,
    borderRadius: 10,
  },

  textInput: {
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    color: '#fff', // Adjust text color
  },
  inputContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10, // Optional: spacing between rows
    marginRight: 12
  }

});
