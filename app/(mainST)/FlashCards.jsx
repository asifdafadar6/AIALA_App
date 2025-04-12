import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Animated,
} from "react-native";
import { MyContext } from "../../components/provider/contextApi";
import { getChapters, getSubjects, getSubtopic } from "../../components/provider/teachers_api";
import { flashCards } from "../../components/provider/students_api";
import { Picker } from "@react-native-picker/picker";

export default function FlashCards() {
  const [viewAll, setViewAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [flashData, setFlashData] = useState({});
  const [flippedCards, setFlippedCards] = useState({});

  const [filters, setFilters] = useState({
    grade: "",
    board: "",
    subject: "",
    chapternumber: "",
    subtopic_name: "",
  });

  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [subtopics, setSubtopics] = useState([]);

  const { existingUser } = useContext(MyContext);

  useEffect(() => {
    if (existingUser) {
      setFilters((prev) => ({
        ...prev,
        grade: existingUser.classes,
        board: existingUser.boards,
      }));
      fetchSubjects();
    }
  }, [existingUser]);

  const fetchSubjects = async () => {
    setLoading(true);
    try {
      const response = await getSubjects(existingUser.classes, existingUser.boards);
      setSubjects(response);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchChapters = async () => {
    setLoading(true);
    try {
      const response = await getChapters(filters.grade, filters.board, filters.subject);
      setChapters(response);
    } catch (error) {
      console.error("Error fetching chapters:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubtopics = async () => {
    setLoading(true);
    try {
      const response = await getSubtopic(filters.grade, filters.board, filters.subject, filters.chapternumber);
      setSubtopics(response);
    } catch (error) {
      console.error("Error fetching subtopics:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = async (key, value) => {
    const updatedFilters = { ...filters, [key]: value };

    if (key === "subject") {
      updatedFilters.chapternumber = "";
      updatedFilters.subtopic_name = "";
      setChapters([]);
      setSubtopics([]);
      if (value) await fetchChapters();
    } else if (key === "chapternumber") {
      updatedFilters.subtopic_name = "";
      setSubtopics([]);
      if (value) await fetchSubtopics();
    }

    setFilters(updatedFilters);
  };

  const handleSubmitFlash = async (e) => {
    e.preventDefault();
    setLoading(true);

    const dataA = {
      grade: "10",
      board: "APSCERT",
      subject: "Biology",
      chapternumber: "1",
      subtopic_name: "Food Supplying System",
    };

    try {
      const response = await flashCards(dataA);
      console.log("FlashCard Response:", response);

      if (response && response[0]?.flash_cards) {
        setFlashData(response[0].flash_cards);
        const initialFlipState = Object.keys(response[0].flash_cards).reduce(
          (acc, key) => ({ ...acc, [key]: false }),
          {}
        );
        setFlippedCards(initialFlipState);
      } else {
        setFlashData({});
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setFlashData({});
    } finally {
      setLoading(false);
    }
  };

  const toggleFlip = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const cards = Object.entries(flashData).map(([key, item]) => {
    return {
      id: key,
      front: item.front,
      back: item.back,
    };
  });

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.title}>Flashcards</Text>
      </View>
      <View style={styles.header}>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsFilterVisible(!isFilterVisible)}
          >
            <Text style={styles.buttonText}>{isFilterVisible ? "Hide Filter" : "Show Filter"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setViewAll(!viewAll)}
          >
            <Text style={styles.buttonText}>{viewAll ? "Close All" : "View All"}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {isFilterVisible && (
        <View style={styles.filterContainer}>
          <Picker
            selectedValue={filters.subject}
            onValueChange={(value) => handleChange("subject", value)}
            style={styles.picker}
          >
            <Picker.Item label="Select Subject" value="" />
            {subjects.map((subject) => (
              <Picker.Item key={subject.id} label={subject.name} value={subject.id} />
            ))}
          </Picker>
          <Picker
            selectedValue={filters.chapternumber}
            onValueChange={(value) => handleChange("chapternumber", value)}
            style={styles.picker}
          >
            <Picker.Item label="Select Chapter" value="" />
            {chapters.map((chapter) => (
              <Picker.Item key={chapter.id} label={chapter.name} value={chapter.id} />
            ))}
          </Picker>
          <Picker
            selectedValue={filters.subtopic_name}
            onValueChange={(value) => handleChange("subtopic_name", value)}
            style={styles.picker}
          >
            <Picker.Item label="Select Subtopic" value="" />
            {subtopics.map((subtopic) => (
              <Picker.Item key={subtopic.id} label={subtopic.name} value={subtopic.name} />
            ))}
          </Picker>
          <TouchableOpacity style={styles.button} onPress={handleSubmitFlash}>
            <Text style={styles.buttonText}>Filter</Text>
          </TouchableOpacity>
        </View>
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : Object.keys(flashData).length > 0 ? (
        viewAll ? (
          cards.map((card) => (
            <TouchableOpacity
              key={card.id}
              onPress={() => toggleFlip(card.id)}
              style={styles.cardContainer}>
              <View style={[
                styles.card,
                { backgroundColor: flippedCards[card.id] ? "#EB6A39" : "#6fa3ef" },
              ]}>
                <Text style={styles.cardText}>
                  {flippedCards[card.id] ? card.back : card.front}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.infoText}>
            Switch to "View All" to display flashcards in bulk.
          </Text>
        )
      ) : (
        <Text style={styles.placeholder}>No flashcards found. Adjust the filter and try again.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffff",
    marginVertical: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  headerButtons: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#4c6ef5",
    padding: 10,
    borderRadius: 4,
    marginLeft: 4,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  filterContainer: {
    marginTop: 16,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
  },
  picker: {
    marginBottom: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    height: 52,
  },
  cardContainer: {
    marginBottom: 16,
    alignItems: "center",
  },
  card: {
    width: "100%",
    padding: 16,
    backgroundColor: "#6fa3ef",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 100,
  },
  cardText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  placeholder: {
    textAlign: "center",
    color: "#999",
    fontSize: 16,
    marginTop: 20,
  },
  infoText: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
    marginTop: 20,
  },
});