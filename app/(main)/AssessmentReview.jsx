import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, Modal, } from 'react-native';
import React, { useState } from 'react';
import { useGlobalSearchParams } from 'expo-router';
import { Picker } from '@react-native-picker/picker';

export default function MockTestScreen() {
    const params = useGlobalSearchParams();

    const [modalVisible, setModalVisible] = useState(false);

    console.log("Received params:", params);

    let assessmentData;
    try {
        if (params.message) {
            assessmentData = JSON.parse(params.message);
        } else {
            assessmentData = params.message || null;
        }
    } catch (error) {
        console.error("Error parsing assessment data:", error);
        assessmentData = null;
    }

    console.log("Parsed assessmentData:", assessmentData);

    if (!assessmentData) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 16 }}>No assessment data available.</Text>
            </View>
        );
    }

    const { subject, totalMarks, sections } = assessmentData;

    const allQuestions = sections.flatMap((section) =>
        section.questions.map((q) => ({ ...q, type: section.type, answer: q.answer }))
    );

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userResponses, setUserResponses] = useState({});
    const [showAnswer, setShowAnswer] = useState(false);
    const [canModify, setCanModify] = useState(true);

    const currentQuestion = allQuestions[currentQuestionIndex];

    const handleNext = () => {
        if (currentQuestionIndex < allQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setShowAnswer(false);
            setCanModify(true);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setShowAnswer(false);
            setCanModify(true);
        }
    };

    const handleResponseChange = (value, index) => {
        if (canModify) {
            setUserResponses((prevResponses) => {
                const updatedResponses = { ...prevResponses };
                if (currentQuestion.type === 'fillInTheBlanks' || currentQuestion.type === 'matchTheFollowing') {
                    updatedResponses[currentQuestionIndex] = {
                        ...(updatedResponses[currentQuestionIndex] || {}),
                        [index]: value,
                    };
                } else {
                    updatedResponses[currentQuestionIndex] = value;
                }
                return updatedResponses;
            });
        }
    };

    const handleSubmit = () => {
        setModalVisible(true);
    };

    const formatQuestionType = (type) => {
        return type
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/^./, (str) => str.toUpperCase());
    };

    return (
        <ScrollView style={{ padding: 20, backgroundColor: "#f8f9fa" }}>
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: "#333" }}>
                    {subject}
                </Text>
                <Text style={{ fontSize: 16, color: "#666" }}>Total Marks: {totalMarks}</Text>
            </View>

            <View style={{ padding: 15, backgroundColor: '#fff', borderRadius: 10, elevation: 3, shadowColor: '#000' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: "#222" }}>
                    {formatQuestionType(currentQuestion.type)}
                </Text>

                <Text style={{ fontSize: 18, fontWeight: 'bold', color: "#222" }}>
                    Question {currentQuestionIndex + 1}/{allQuestions.length}:
                </Text>
                <Text style={{ fontSize: 16, marginTop: 5, color: "#444" }}>{currentQuestion.question || currentQuestion?.sentence}</Text>

                {/* Render multiple-choice options */}
                {currentQuestion.options && (
                    <View style={{ marginTop: 10 }}>
                        {currentQuestion.options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleResponseChange(option)}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    padding: 10,
                                    marginVertical: 5,
                                    backgroundColor: userResponses[currentQuestionIndex] === option ? '#4CAF50' : '#f0f0f0',
                                    borderRadius: 5,
                                    opacity: canModify ? 1 : 0.6,
                                }}
                                disabled={!canModify}
                            >
                                <View
                                    style={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: 10,
                                        borderWidth: 2,
                                        borderColor: userResponses[currentQuestionIndex] === option ? '#4CAF50' : '#ccc',
                                        backgroundColor: userResponses[currentQuestionIndex] === option ? '#4CAF50' : 'transparent',
                                        marginRight: 10,
                                    }}
                                />
                                <Text style={{ fontSize: 14, color: userResponses[currentQuestionIndex] === option ? '#fff' : '#000' }}>
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                {/* Render match the following with Picker */}
                {currentQuestion.type === 'matchTheFollowing' && (
                    <View style={{ marginTop: 10 }}>
                        {currentQuestion.items && currentQuestion.items.map((item, index) => (
                            <View key={index} style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }}>
                                <Text style={{ flex: 1, fontSize: 16 }}>{item.A || item.B || item.C || item.D}</Text>
                                <Picker
                                    style={{
                                        flex: 1,
                                        marginLeft: 10,
                                        borderWidth: 1,
                                        borderColor: '#ccc',
                                        borderRadius: 5,
                                    }}
                                    selectedValue={userResponses[currentQuestionIndex]?.[index] || ''}
                                    onValueChange={(value) => handleResponseChange(value, index)}
                                    enabled={canModify}
                                >
                                    <Picker.Item label="Select an option" value="" />
                                    {currentQuestion.matches.map((match, matchIndex) => (
                                        <Picker.Item
                                            key={matchIndex}
                                            label={`${matchIndex + 1}. ${match[matchIndex + 1]}`}
                                            value={matchIndex + 1}
                                        />
                                    ))}
                                </Picker>
                            </View>
                        ))}
                    </View>
                )}

                {/* Render fill in the blanks */}
                {currentQuestion.type === 'fillInTheBlanks' && (
                    <View style={{ marginTop: 10 }}>
                        {typeof currentQuestion.answer === 'string' && currentQuestion.answer.includes(',') ? (
                            currentQuestion.answer.split(',').map((part, index) => (
                                <TextInput
                                    key={index}
                                    style={{
                                        marginTop: 10,
                                        padding: 10,
                                        borderWidth: 1,
                                        borderColor: '#ccc',
                                        borderRadius: 5,
                                        backgroundColor: '#fff',
                                    }}
                                    placeholder={`Enter part ${index + 1} of the answer...`}
                                    value={userResponses[currentQuestionIndex]?.[index] || ''}
                                    onChangeText={(value) => handleResponseChange(value, index)}
                                    editable={canModify}
                                />
                            ))
                        ) : (
                            <TextInput
                                style={{
                                    marginTop: 10,
                                    padding: 10,
                                    borderWidth: 1,
                                    borderColor: '#ccc',
                                    borderRadius: 5,
                                    backgroundColor: '#fff',
                                }}
                                placeholder="Enter your answer..."
                                value={userResponses[currentQuestionIndex] || ''}
                                onChangeText={(value) => handleResponseChange(value)}
                                editable={canModify}
                            />
                        )}
                    </View>
                )}

                {/* Render text input for open-ended questions */}
                {currentQuestion.type === 'textInput' && (
                    <TextInput
                        style={{
                            marginTop: 10,
                            padding: 10,
                            borderWidth: 1,
                            borderColor: '#ccc',
                            borderRadius: 5,
                            backgroundColor: '#fff',
                        }}
                        placeholder="Enter your answer..."
                        value={userResponses[currentQuestionIndex] || ''}
                        onChangeText={(value) => handleResponseChange(value)}
                        editable={canModify}
                    />
                )}

                {/* Show correct answer */}
                {showAnswer && (
                    <View style={{ marginTop: 10, backgroundColor: "#ffecb3", padding: 10, borderRadius: 5 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#333" }}>Correct Answer:</Text>
                        {currentQuestion.type === "matchTheFollowing" && Array.isArray(currentQuestion.answer) ? (
                            <View style={{ marginTop: 10 }}>
                                {currentQuestion.answer.map((item, index) => {
                                    const key = Object.keys(item)[0];
                                    const value = item[key];
                                    return (
                                        <Text key={index} style={{ fontSize: 16, color: "#444" }}>
                                            {key} → {value}
                                        </Text>
                                    );
                                })}
                            </View>
                        ) : (
                            <Text style={{ fontSize: 16, color: "#444" }}>{JSON.stringify(currentQuestion.answer)}</Text>
                        )}
                    </View>
                )}
            </View>

            {/* Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}>
                    <View style={{
                        width: '80%',
                        backgroundColor: '#fff',
                        padding: 20,
                        borderRadius: 10,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                        elevation: 5,
                    }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15 }}>Completed</Text>
                        <Text style={{ marginBottom: 20 }}>Your Assessment has been submitted successfully. Please select one of the options below to assign to the students:</Text>

                        <TouchableOpacity style={{
                            marginVertical: 10,
                            paddingVertical: 12,
                            backgroundColor: '#007BFF',
                            borderRadius: 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            borderWidth: 1,
                            borderColor: '#0056b3',
                            elevation: 3,
                        }}>
                            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Office Paper</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            marginVertical: 10,
                            paddingVertical: 12,
                            backgroundColor: '#007BFF',
                            borderRadius: 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            borderWidth: 1,
                            borderColor: '#0056b3',
                            elevation: 3,
                        }}>
                            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Publish</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            marginVertical: 10,
                            paddingVertical: 12,
                            backgroundColor: '#007BFF',
                            borderRadius: 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            borderWidth: 1,
                            borderColor: '#0056b3',
                            elevation: 3,
                        }}>
                            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Create Temporary Link</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            marginVertical: 10,
                            paddingVertical: 12,
                            backgroundColor: '#007BFF',
                            borderRadius: 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            borderWidth: 1,
                            borderColor: '#0056b3',
                            elevation: 3,
                        }}>
                            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Home</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={{
                                marginVertical: 10,
                                paddingVertical: 12,
                                backgroundColor: '#4CAF50',
                                borderRadius: 5,
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                                borderWidth: 1,
                                borderColor: '#388E3C',
                                elevation: 3,
                            }}
                        >
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Navigation buttons */}
            <View style={{ flexDirection: 'row', flexWrap: "wrap", justifyContent: 'space-between', marginTop: 20 }}>
                {/* Previous Button */}
                <TouchableOpacity
                    onPress={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    style={{
                        padding: 12,
                        borderRadius: 5,
                        backgroundColor: currentQuestionIndex === 0 ? '#ccc' : '#2196F3',
                        width: '48%',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ fontSize: 16, color: "#fff" }}>Previous</Text>
                </TouchableOpacity>

                {/* Next / Submit Button */}
                {currentQuestionIndex < allQuestions.length - 1 ? (
                    <TouchableOpacity
                        onPress={handleNext}
                        style={{
                            padding: 12,
                            borderRadius: 5,
                            backgroundColor: '#2196F3',
                            width: '48%',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ fontSize: 16, color: "#fff" }}>Next</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={handleSubmit}
                        style={{
                            padding: 12,
                            borderRadius: 5,
                            backgroundColor: '#4CAF50',
                            width: '48%',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ fontSize: 16, color: "#fff" }}>Submit</Text>
                    </TouchableOpacity>
                )}

                {/* Show/Hide Answer Button */}
                <TouchableOpacity
                    onPress={() => setShowAnswer(!showAnswer)}
                    style={{
                        padding: 12,
                        borderRadius: 5,
                        backgroundColor: '#FF9800',
                        width: '48%',
                        alignItems: 'center',
                        marginTop: 10,
                    }}
                >
                    <Text style={{ fontSize: 16, color: "#fff" }}>{showAnswer ? "Hide Answer" : "Show Answer"}</Text>
                </TouchableOpacity>

                {/* Modify Answer Button */}
                <TouchableOpacity
                    onPress={() => setCanModify(true)}
                    style={{
                        padding: 12,
                        borderRadius: 5,
                        backgroundColor: '#673AB7',
                        width: '48%',
                        alignItems: 'center',
                        marginTop: 10,
                    }}
                >
                    <Text style={{ fontSize: 16, color: "#fff" }}>Modify Answer</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}