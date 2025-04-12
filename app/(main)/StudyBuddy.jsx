import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, } from "react-native";
import { MyContext } from "../../components/provider/contextApi";
import { getBoards, getChapters, getDocument, getSubjects } from "../../components/provider/teachers_api";
import uuid from "react-native-uuid";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";

export default function StudyBuddy() {
  const [selectedOption, setSelectedOption] = useState("");
  const [currentView, setCurrentView] = useState("StudyType");
  const [pdfFile, setPdfFile] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  const handleNextClick = () => {
    if (selectedOption) setCurrentView(selectedOption);
  };

  const handleBackClick = () => setCurrentView("StudyType");

  const handlePdfSubmit = (file, data) => {
    if (file) {
      setPdfFile(file);
      setSelectedData(data);
      setCurrentView("PdfReader");
      console.log("PDFDATA",file);
      
      router.push({
        pathname: '/PDFView',
        params: { file: file },
      });
    } else {
      console.error("No file provided");
    }
  };
  

  return (
    <View style={{ flex: 1 }}>
      {currentView === "StudyType" && currentView && (
        <StudyType
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          handleNextClick={handleNextClick}
        />
      )}
      {currentView === "Yourdoc" && <StudyUpload handleBackClick={handleBackClick} />}
      {currentView === "Preloaded" && (
        <StudyPreloaded handleBackClick={handleBackClick} handlePdfSubmit={handlePdfSubmit} />
      )}
    </View>
  );
}

const StudyType = ({ selectedOption, setSelectedOption, handleNextClick }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Select Doctype</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedOption}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedOption(itemValue)}>
            <Picker.Item label="Select Doctype" value="" />
            <Picker.Item label="Preloaded" value="Preloaded" />
            <Picker.Item label="Your Doc" value="Yourdoc" />
          </Picker>

        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleNextClick}
          disabled={!selectedOption}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const StudyPreloaded = ({ handleBackClick, handlePdfSubmit }) => {
  const { grade = [], existingUser } = useContext(MyContext);
  const [filters, setFilters] = useState({ grade: "", 
    board: "", subject: "", chapter: "" });
  const [boards, setBoards] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sendData, setSendData] = useState(null);

  const fetchBoards = async (selectedGrade) => {
    if (!selectedGrade) return;
    setLoading(true);
    try {
      const response = await getBoards(selectedGrade);
      setBoards(response);
    } catch (error) {
      console.error("Error fetching boards:", error);
    } finally {
      setLoading(false);
    }
  };


  const fetchSubjects = async (selectedGrade, selectedBoard) => {
    if (!selectedGrade || !selectedBoard) return;
    setLoading(true);
    try {
      const response = await getSubjects(selectedGrade, selectedBoard);
      setSubjects(response);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchChapters = async (selectedGrade, selectedBoard, selectedSubject) => {
    if (!selectedGrade || !selectedBoard || !selectedSubject) return;
    setLoading(true);
    try {
      const response = await getChapters(selectedGrade, selectedBoard, selectedSubject);
      setChapters(response);
    } catch (error) {
      console.error("Error fetching chapters:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDocument = async (selectedGrade, selectedBoard, selectedSubject, selectedChapter) => {
    if (!selectedGrade || !selectedBoard || !selectedSubject || !selectedChapter) return;
    setLoading(true);
    const sessionId = uuid.v4();
    const selectedChapterDetails = chapters.find((chapter) => chapter.id === selectedChapter);

    setSendData({ grade: selectedGrade, board: selectedBoard, subject: selectedSubject, chapterId: selectedChapter, sessionId, existingUser });

    try {
      const response = await getDocument(selectedGrade, selectedBoard, selectedSubject, selectedChapterDetails?.name);
      setDocument(response);
    } catch (error) {
      console.error("Error fetching document:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = async (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);

    switch (key) {
      case "grade":
        setBoards([]);
        setSubjects([]);
        setChapters([]);
        setDocument(null);
        await fetchBoards(value);
        break;
      case "board":
        setSubjects([]);
        setChapters([]);
        setDocument(null);
        await fetchSubjects(filters.grade, value);
        break;
      case "subject":
        setChapters([]);
        setDocument(null);
        await fetchChapters(filters.grade, filters.board, value);
        break;
      case "chapter":
        setDocument(null);
        await fetchDocument(filters.grade, filters.board, filters.subject, value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    if (document) {
      handlePdfSubmit(document.url, sendData);
      console.log("DAta",document);
      
    } else {
      handlePdfSubmit("/aiala.pdf");
    }
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      <View style={styles.dropDownContainer}>
        <View style={{ width: "100%", marginBottom: 10 }}>
          <Text>Select Grade</Text>
          <View style={styles.pickerWrapper}>
            <Picker style={styles.picker} selectedValue={filters.grade} onValueChange={(value) => handleChange("grade", value)}>
              <Picker.Item label="Select Grade" value="" />
              {grade.map((g, index) => <Picker.Item key={index} label={`Grade ${g}`} value={g} />)}
            </Picker>
          </View>
        </View>

        <View style={{ width: "100%", marginBottom: 10 }}>
          <Text>Select Board</Text>
          <View style={styles.pickerWrapper}>
            <Picker selectedValue={filters.board} onValueChange={(value) => handleChange("board", value)} enabled={!!filters.grade}>
              <Picker.Item label="Select Board" value="" />
              {boards.map((b, index) => <Picker.Item key={index} label={b.name} value={b.name} />)}
            </Picker>
          </View>
        </View>

        <View style={{ width: "100%", marginBottom: 10 }}>
          <Text>Select Subject</Text>
          <View style={styles.pickerWrapper}>
            <Picker selectedValue={filters.subject} onValueChange={(value) => handleChange("subject", value)} enabled={!!filters.board}>
              <Picker.Item label="Select Subject" value="" />
              {subjects.map((s, index) => <Picker.Item key={index} label={s.name} value={s.id} />)}
            </Picker>
          </View>
        </View>

        <View style={{ width: "100%", marginBottom: 10 }}>
          <Text>Select Chapter</Text>
          <View style={styles.pickerWrapper}>
            <Picker selectedValue={filters.chapter} onValueChange={(value) => handleChange("chapter", value)} enabled={!!filters.board}>
              <Picker.Item label="Select Chapter" value="" />
              {chapters.map((s, index) => <Picker.Item key={index} label={s.name} value={s.id} />)}
            </Picker>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            marginTop: 10,
            padding: 10,
            borderWidth: 1,
            borderColor: "#3182ce",
            borderRadius: 8,
            alignItems: "center",
          }}
          onPress={handleBackClick} >
          <Text style={{ color: "#3182ce", fontSize: 16 }}>Back</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,

  },
  dropDownContainer: {
    width: "100%",
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  card: {
    width: 320,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    marginBottom: 10,
    fontSize: 14,
    color: "#4A4A4A",
  },
  pickerWrapper: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 1,
    marginTop: 5,
    marginBottom: 20
  },
  picker: {
    color: "#333",
    height: 50,
  },
  button: {
    backgroundColor: "#3182ce",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    width: '100%'
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
};
