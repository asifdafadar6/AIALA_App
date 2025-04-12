import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient
import { router } from "expo-router";

export default function MentorMate() {
  return (
    <LinearGradient
      colors={["#E9EEF2", "#E6E6F0", "#F0DFE8", "#E2E4F3", "#FEFBEA"]} // Define your gradient colors
      style={styles.gradientContainer} // Apply gradient style
    >
      <ScrollView>
        <View style={styles.container}>
          {/* Top Section */}
          <View style={styles.card}>
            <Image
              source={require("../../assets/images/mentormateicon.png")}
              style={styles.avatar}
            />
            <Text style={styles.welcomeText}>Welcome To Aiala</Text>
            <Text style={styles.subtitle}>Learn with our MentorMate</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionContainer}>
            <TouchableOpacity
              style={styles.messageButton}
              onPress={() => {
                router.push("(main)/MentorMateChat");
              }}
            >
              <Text style={{ color: "white" }}>Message</Text>
              <FontAwesome5 name="telegram-plane" size={18} color="white" />
            </TouchableOpacity>
          </View>

          {/* Trending Topics */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Trending Topics</Text>
            {["Web3", "Blockchain", "Crypto", "DeFi"].map((topic, index) => (
              <View key={index} style={styles.trendingItem}>
                <Text style={styles.link}>{topic}</Text>
                <FontAwesome6 name="arrow-trend-up" size={18} color="green" />
              </View>
            ))}
          </View>

          {/* Recent Articles */}
          <View style={styles.articleSection}>
            <Text style={styles.sectionTitle}>Recent Articles</Text>
            {[
              {
                title: "Negative Impact of AI",
                image: require("../../assets/images/MentorMate1.jpg"),
              },
              {
                title: "AI in Modern Medical Science",
                image: require("../../assets/images/MentorMate2.jpg"),
              },
              {
                title: "What is the dark side to AI?",
                image: require("../../assets/images/MentorMate3.jpg"),
              },
            ].map((article, index) => (
              <View key={index} style={styles.articleItem}>
                <Image source={article.image} style={styles.articleImage} />
                <Text style={styles.article}>{article.title}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 165,
    height: 161,
    borderRadius: 10,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  messageButton: {
    flex: 1,
    backgroundColor: "#3B82F6",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginRight: 10,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  // startButton: {
  //   flex: 1,
  //   backgroundColor: "#FFFFFF",
  //   borderWidth: 1,
  //   borderColor: "#3B82F6",
  //   paddingVertical: 10,
  //   borderRadius: 5,
  //   alignItems: "center",
  // },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3B82F6",
  },
  section: {
    marginBottom: 20,
  },
  trendingItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  link: {
    fontSize: 14,
    color: "#4a4a4a",
    marginRight: 5,
  },
  articleSection: {
    marginBottom: 50,
  },
  articleItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  articleImage: {
    width: 22,
    height: 21,
    borderRadius: 5,
    marginRight: 10,
  },
  article: {
    fontSize: 14,
    color: "#555",
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
});
