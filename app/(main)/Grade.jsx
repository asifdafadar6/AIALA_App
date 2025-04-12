import React, { useState, useEffect, useContext } from "react";
import {
    View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, ActivityIndicator, Animated
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { MyContext } from "../../components/provider/contextApi";

const { width } = Dimensions.get("window");

export default function Grade() {
    const { studentActive } = useContext(MyContext);

    const fetchStudentData = () => {
        return Promise.resolve(studentActive);
    };

    const [statsDataGrouped, setStatsDataGrouped] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const translateX = useState(new Animated.Value(0))[0];

    const autoSlideInterval = 3000;
    let autoSlideTimer = null;

    const fetchAndProcessData = async () => {
        try {
            setLoading(true);
            const studentData = await fetchStudentData();
            if (studentData && studentData.length > 0) {
                const transformedData = studentData.map((item) => ({
                    grade: item.grade,
                    stats: [
                        { label: "Student Count", value: item.data.details[0].student_count, color: "#4CAF50" },
                        { label: "Assessment Count", value: item.data.details[0].assessment_count, color: "#2196F3" },
                        { label: "Average Score", value: item.data.details[0].average_score, color: "#FFC107" },
                    ],
                }));

                setStatsDataGrouped(transformedData);
            }
        } catch (error) {
            console.error("Error fetching student data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleNext = () => {
        setCurrentPage((prev) => (prev < statsDataGrouped.length - 1 ? prev + 1 : prev));
    };

    const handlePrevious = () => {
        setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
    };

    const autoSlide = () => {
        setCurrentPage((prev) =>
            prev < statsDataGrouped.length - 1 ? prev + 1 : 0
        );
    };

    useEffect(() => {
        fetchAndProcessData();
    }, [studentActive]);

    useEffect(() => {
        if (statsDataGrouped.length > 0) {
            autoSlideTimer = setInterval(autoSlide, autoSlideInterval);
            return () => clearInterval(autoSlideTimer);
        }
    }, [statsDataGrouped, currentPage]);

    useEffect(() => {
        Animated.timing(translateX, {
            toValue: -currentPage * width,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [currentPage]);

    if (loading) {
        return (
            <View style={styles.emptyContainer}>
                <View style={styles.loaderContainer}>
                    <Image source={require('../../assets/images/tabIcon.png')} style={styles.loaderImage} />
                </View>
            </View>
        );
    }
    
    const currentStats = statsDataGrouped[currentPage];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Grade {currentStats?.grade}</Text>
                <Text style={styles.subtitle}>
                    Performance metrics and statistics for Grade {currentStats?.grade} students
                </Text>
            </View>

            <View style={styles.carouselContainer}>
                <Animated.View style={[styles.carouselInner, { width: '95%', transform: [{ translateX }] }]}>
                    {statsDataGrouped.map((gradeData, index) => (
                        <View key={index} style={styles.gradeContainer}>
                            {gradeData.stats?.map((item, idx) => (
                                <View key={idx} style={[styles.statCard, { backgroundColor: item.color }]}>
                                    <Text style={styles.statValue}>{item.value}</Text>
                                    <Text style={styles.statLabel}>{item.label}</Text>
                                </View>
                            ))}
                        </View>
                    ))}
                </Animated.View>

                <TouchableOpacity onPress={handlePrevious} style={styles.arrowLeft}>
                    <MaterialIcons name="arrow-back" size={28} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNext} style={styles.arrowRight}>
                    <MaterialIcons name="arrow-forward" size={28} color="gray" />
                </TouchableOpacity>
            </View>

            <View style={styles.pagination}>
                {statsDataGrouped.map((_, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => setCurrentPage(index)}
                        style={[styles.paginationDot, currentPage === index && styles.activeDot]}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#F5F5F5",
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loaderContainer: {
        backgroundColor: "#fff",
        borderRadius: 100,
        padding: 16,
        elevation: 3,
    },
    loaderImage: {
        width: 150,
        height: 150,
    },
    header: {
        marginBottom: 24,
        paddingHorizontal: 14,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#333",
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        marginTop: 8,
    },
    carouselContainer: {
        position: "relative",
        alignItems: "center",
        overflow: "hidden",
        width: width,
        flexDirection: 'row',
        marginTop: 16,
        marginRight:16
    },
    carouselInner: {
        flexDirection: "row",
    },
    gradeContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
        paddingHorizontal: 10,
    },
    statCard: {
        width: "30%",
        padding: 10,
        borderRadius: 12,
        marginHorizontal: 8,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    statValue: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#fff",
    },
    statLabel: {
        fontSize: 16,
        color: "#fff",
        marginTop: 6,
    },
    arrowLeft: {
        position: "absolute",
        left: 10,
        top: "50%",
        transform: [{ translateY: -20 }],
        backgroundColor: "#fff",
        borderRadius: 50,
        padding: 8,
        elevation: 5,
    },
    arrowRight: {
        position: "absolute",
        right: 8,
        top: "50%",
        transform: [{ translateY: -20 }],
        backgroundColor: "#fff",
        borderRadius: 50,
        padding: 8,
        elevation: 5,
    },
    pagination: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 24,
    },
    paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#ccc",
        marginHorizontal: 6,
    },
    activeDot: {
        backgroundColor: "#2196F3",
    },
});
