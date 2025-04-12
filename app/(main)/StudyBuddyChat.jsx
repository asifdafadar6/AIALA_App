import React, { useState } from "react"; // Import useState from React
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// import { pdfjs } from 'pdfjs-dist';

// Set the worker for pdfjs
// pdfjs.GlobalWorkerOptions.workerSrc = require('./assets/pdfjs/pdf.worker.min.js'); // Make sure pdf.worker.min.js is in the correct folder

export default function StudyBuddyChat() {
    // const [numPages, setNumPages] = useState(); // Initialize the number of pages
    // const [pageNumber, setPageNumber] = useState(1); // Initialize the current page
    // const [scale, setScale] = useState(1.0); // Track the zoom level
    // const [isPopupOpen, setIsPopupOpen] = useState(false); // Track popup state
    // const [isProButtonDisabled, setIsProButtonDisabled] = useState(false); // Track Pro button state

    // Handle document load
    // const onDocumentLoadSuccess = ({ numPages }) => {
    //     setNumPages(numPages);
    // };

    // // Handle navigation to the next page
    // const nextPage = () => {
    //     if (pageNumber < numPages) setPageNumber(pageNumber + 1);
    // };

    // // Handle navigation to the previous page
    // const prevPage = () => {
    //     if (pageNumber > 1) setPageNumber(pageNumber - 1);
    // };

    // // Handle zoom in
    // const zoomIn = () => {
    //     setScale(scale + 0.1);
    // };

    // // Handle zoom out
    // const zoomOut = () => {
    //     setScale(scale - 0.1);
    // };

    // // Open popup (if needed)
    // const openPopup = () => {
    //     setIsPopupOpen(true);
    // };

    return (
        <View style={styles.container}>
            Header with Avatar
            <View style={styles.header}>
                <TouchableOpacity onPress={()=>router.push('(main)/StudyBuddy')}>
                    <FontAwesome5 name="arrow-left" size={18} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <FontAwesome5 name="edit" size={18} color="black" />
                </TouchableOpacity>
            </View>

            {/* Avatar */}
            <View style={styles.avatarContainer}>
                <Image
                    source={require("../../assets/images/mentormate.png")}
                    style={styles.avatar}
                />
            </View>

            {/* Message Button */}
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

            {/* Document Preview */}
            {/* <View style={styles.pdfreadcontainer}>
                <ScrollView style={styles.pdfContainer} contentContainerStyle={styles.pdfContent}>
                    <Pdf
                        source={{ uri: 'http://www.pdf995.com/samples/pdf.pdf', cache: true }} // Replace with your PDF URL or file path
                        onLoadComplete={onDocumentLoadSuccess}
                        page={pageNumber}
                        scale={scale}
                        style={styles.pdf}
                    />
                </ScrollView> */}

                {/* Page Navigation Controls */}
                {/* <View style={styles.controlsContainer}>
                    <View style={styles.navigationButtons}>
                        <TouchableOpacity onPress={prevPage} disabled={pageNumber <= 1} style={styles.navButton}>
                            <Text style={styles.navButtonText}>Previous</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={nextPage} disabled={pageNumber >= numPages} style={styles.navButton}>
                            <Text style={styles.navButtonText}>Next</Text>
                        </TouchableOpacity>
                    </View> */}

                    {/* Pro Button */}
                    {/* {!isPopupOpen && (
                        <TouchableOpacity
                            onPress={openPopup}
                            disabled={isProButtonDisabled}
                            style={[styles.proButton, isProButtonDisabled && styles.disabledButton]}
                        >
                            <Text style={styles.proButtonText}>Pro</Text>
                        </TouchableOpacity>
                    )} */}

                    {/* Page Info */}
                    {/* <Text style={styles.pageInfo}>
                        Page <Text style={styles.bold}>{pageNumber}</Text> of <Text style={styles.bold}>{numPages}</Text>
                    </Text> */}

                    {/* Zoom Controls */}
                    {/* <View style={styles.zoomControls}>
                        <TouchableOpacity onPress={zoomIn} style={styles.zoomButton}>
                            <Ionicons name="ios-zoom-in" size={20} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={zoomOut} style={styles.zoomButton}>
                            <Ionicons name="ios-zoom-out" size={20} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#E6E6E6",
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
  documentContainer: {
    flex: 1,
    alignItems: "center",
    marginBottom: 20,
  },
  document: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paginationButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#E6E6E6",
  },
  paginationText: {
    color: "#3B82F6",
    fontWeight: "bold",
  },
  pageIndicator: {
    fontSize: 14,
    color: "#666666",
  },
  pdfreadcontainer:{
    flex: 1,
    backgroundColor: "#F6F6F6",
    padding: 20,
  },
  pdfContainer: {
    flex: 1,
  },
  pdfContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdf: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
  controlsContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  navButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#4F83CC',
    marginHorizontal: 8,
    borderRadius: 25,
  },
  navButtonText: {
    color: 'white',
    fontSize: 14,
  },
  proButton: {
    position: 'absolute',
    bottom: 100,
    right: 10,
    width: 60,
    height: 60,
    backgroundColor: '#4F83CC',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    zIndex: 1000,
  },
  disabledButton: {
    backgroundColor: '#D3D3D3',
  },
  proButtonText: {
    color: 'white',
    fontSize: 14,
  },
  pageInfo: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 14,
    color: '#4F83CC',
  },
  bold: {
    fontWeight: 'bold',
  },
  zoomControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  zoomButton: {
    backgroundColor: '#E0E0E0',
    padding: 8,
    marginHorizontal: 8,
    borderRadius: 25,
  },
});
