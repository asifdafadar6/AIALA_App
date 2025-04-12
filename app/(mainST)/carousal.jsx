import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';


const { width } = Dimensions.get('window');

export default function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const banners = [
        {
            image: require('../../assets/images/carousal1.jpg'),
            title: 'History Quiz Competition',
            subtitle:
                'A fascinating quiz to explore and test historical knowledge in an engaging way.',
            date: '1/10/2023',
        },
        {
            image: require('../../assets/images/carousal1.jpg'),
            title: 'Science Fair 2023',
            subtitle: 'Showcase your innovations and experiments to the world.',
            date: '15/10/2023',
        },
        {
            image: require('../../assets/images/carousal1.jpg'),
            title: 'Art & Craft Exhibition',
            subtitle: 'Celebrate creativity and artistry in this annual event.',
            date: '25/10/2023',
        },
    ];

    const handleScroller = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffsetX / width);
        setCurrentIndex(index);
    };

    const handleNext = () => {
        if (currentIndex < banners.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.bannerCarouselContainer}>
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroller}
                    scrollEventThrottle={16}
                    contentOffset={{ x: currentIndex * width, y: 0 }}
                    style={styles.scrollView}
                >
                    {banners.map((banner, index) => (
                        <View key={index} style={styles.banner}>
                            <Image source={banner.image} style={styles.bannerImage} />
                            <View style={styles.textContainer}>
                                <Text style={styles.bannerTitle}>{banner.title}</Text>
                                <Text style={styles.bannerSubtitle}>{banner.subtitle}</Text>
                                <View style={styles.bannerFooter}>
                                    <Text style={styles.bannerDate}>📅 {banner.date}</Text>
                                </View>
                                <TouchableOpacity style={styles.registerButton}>
                                    <Text style={styles.registerText}>Register Now</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </ScrollView>
                <View style={styles.pagination}>
                    {banners.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.paginationDot,
                                currentIndex === index && styles.activeDot,
                            ]}
                        />
                    ))}
                </View>
                <TouchableOpacity
                    style={[styles.arrow, styles.leftArrow]}
                    onPress={handlePrev}
                    disabled={currentIndex === 0}
                >
                    <Text style={styles.arrowText}><AntDesign name="left" size={20} color="#fff" /></Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.arrow, styles.rightArrow]}
                    onPress={handleNext}
                    disabled={currentIndex === banners.length - 1}
                >
                    <Text style={styles.arrowText}><AntDesign name="right" size={20} color="#fff" /></Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bannerCarouselContainer: {
        width: '100%',
        height: 210,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginVertical:20
    },
    scrollView: {
        width: width,
        flexGrow: 0,
    },
    banner: {
        width: width * 0.85,
        marginHorizontal: width * 0.075,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#8BC34A', 
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 3,
    },
    bannerImage: {
        width: 110,
        height: '100%',
        resizeMode: 'cover',
    },
    textContainer: {
        flex: 1,
        padding: 4,
    },
    bannerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 2,
    },
    bannerSubtitle: {
        fontSize: 13,
        color: '#fff',
        marginBottom: 6,
    },
    bannerFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bannerDate: {
        fontSize: 14,
        color: '#fff',
    },
    registerButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#2196f3', 
        borderRadius: 10, 
        marginTop: 10,
        alignSelf: 'flex-start',
        marginBottom:2
    },
    registerText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ddd',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#4CAF50',
    },
    arrow: {
        position: 'absolute',
        top: '35%',
        zIndex: 10,
        padding: 10,
        borderRadius: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    leftArrow: {
        left: -20, 
    },
    rightArrow: {
        right: -20,
    },
    arrowText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
