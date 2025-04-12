import React, { useContext, useState, useEffect, useRef } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import axios from "axios"; // Added axios import
import { MyContext } from "../../components/provider/contextApi";
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Markdown from "react-native-markdown-display";


export default function MentorMateChat() {
  const { existingUser } = useContext(MyContext);
  const [messages, setMessages] = useState([]);
  // const [messagesHistory, setMessagesHistory] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFirstMessage, setIsFirstMessage] = useState(true);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  const API_URL = "https://aiala.troshi.in/api/users/send-message";
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (newMessage.trim()) {
      const userMessage = {
        id: Date.now(),
        sender: "user",
        message: newMessage,
        timestamp: new Date().toLocaleTimeString(),
        date: new Date(),
      };
      setLoading(true);
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      // setMessagesHistory((prevHistory) => [...prevHistory, newMessage]); // Add to history

      try {
        const response = await axios.post(API_URL, {
          message: newMessage,
          sender: "psychology",
          timestamp: new Date().toLocaleTimeString(),
          firstname: existingUser.userData.firstname,
          username: existingUser.username,
          usertype: existingUser.usertype,
          email: existingUser.userData.email,
          sessionID: "9dbfde6f-73be-47f4-aaf9-8dbeb1087a01",
          chatID: "messages_1733732207784-7tj43e3eh",
        });

        const botMessageContent = response.data.message;

        const botMessage = {
          id: Date.now() + 1,
          sender: "bot",
          message: botMessageContent,
          timestamp: new Date().toLocaleTimeString(),
          date: new Date(),
        };

        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error("Error sending message:", error);
        const botMessage = {
          id: Date.now() + 2,
          sender: "bot",
          message: "Oops, there was an error. Please try again later.",
          timestamp: new Date().toLocaleTimeString(),
          date: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } finally {
        setLoading(false);
      }

      setNewMessage(""); // Clear input field
    }
  };

  const formatTimestamp = (date) => {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    if (date.toDateString() === now.toDateString()) {
      return "Today";
    }
    if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }
    return date.toLocaleDateString();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  // const clearHistory = () => {
  //   setMessagesHistory([]);
  // };

  const startNewChat = () => {
    setMessages([]);
    // setIsFirstMessage(true);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "user" ? styles.userMessage : styles.mentorMessage,
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          item.sender === "user" ? styles.userBubble : styles.mentorBubble,
        ]}
      >
        <Text style={styles.messageText}>{item.message}</Text>
        <Text style={styles.messageTime}>{item.timestamp}</Text>
      </View>
    </View>
  );

  return (

    <View style={styles.container}>
      <LinearGradient
        colors={["#E9EEF2", "#E6E6F0", "#F0DFE8", "#E2E4F3", "#FEFBEA"]} // Define your gradient colors
        style={styles.gradientContainer} // Apply gradient style
      >
        {/* <TouchableOpacity onPress={() => setIsHistoryVisible(!isHistoryVisible)}>
        <Text style={styles.toggleHistoryText}>
          {isHistoryVisible ? "Hide" : "Show"} History
        </Text>
      </TouchableOpacity> */}
        <View style={styles.header}>
          <TouchableOpacity onPress={startNewChat}>
            <Feather name="edit" size={24} color="black" />
          </TouchableOpacity>
        </View>

{/* 
        {!isHistoryVisible &&  (
          <FlatList
            data={messagesHistory}
            renderItem={({ item }) => (
              <View style={styles.historyItem}>
                <Text>{item}</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        )} */}

        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id.toString()}
          style={styles.chatSection}
          contentContainerStyle={{ paddingBottom: 20 }}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <FontAwesome name="paper-plane" size={24} style={styles.sendIcon} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  gradientContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end", // Align header elements to the right
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  mentorAvatar: {
    width: 100, // Adjusted size for better scaling
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
    position: "absolute",
    top: 100,
  },
  chatSection: {
    flex: 1,
    marginTop: 20, // Creates space below the avatar
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  messageContainer: {
    marginBottom: 12, // Slightly reduced spacing
    flexDirection: "row",
  },
  userMessage: {
    alignSelf: "flex-end",
  },
  mentorMessage: {
    alignSelf: "flex-start",
  },
  messageBubble: {
    maxWidth: "75%", // Allow more content
    padding: 10, // Slightly reduced padding
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  userBubble: {
    backgroundColor: "#DCF8C6", // Soft green for user's messages
    alignSelf: "flex-end",
    marginLeft: 40,
  },
  mentorBubble: {
    backgroundColor: "#F0F0F0", // Light gray for mentor's messages
    alignSelf: "flex-start",
    marginRight: 40,
  },
  messageText: {
    fontSize: 15, // Adjusted for better readability
    color: "#333", // Darker text for readability
  },
  messageTime: {
    fontSize: 11,
    color: "#777", // Muted color for timestamps
    marginTop: 4,
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0", // Subtle border for separation
  },
  input: {
    flex: 1,
    height: 42, // Adjusted height for better input field size
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    paddingHorizontal: 14,
    fontSize: 14,
    color: "#333",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  sendButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#3B82F6", // Blue for the send button
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  sendIcon: {
    fontSize: 18,
    color: "#FFFFFF", // White send icon for contrast
    transform: [{ rotate: "45deg" }], // Correct rotation for the icon
  },
  historyItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#E8F1FD", // Light blue for history items
    borderRadius: 10,
    marginVertical: 4,
  },
});
