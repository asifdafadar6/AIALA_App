import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const banners = [
    { image: require('../../assets/images/heroImg.webp') },
    { image: require('../../assets/images/heroImg6.webp') },
    { image: require('../../assets/images/heroImgST.webp') },
  ];

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.bannerContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {banners.map((banner, index) => (
          <View key={index} style={styles.banner}>
            <Image source={banner.image} style={styles.bannerImage} />
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
    </View>
  );
}

const styles = StyleSheet.create({
    bannerContainer: {
      width: '100%',
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5', 
      position: 'relative', 
      marginTop:10
    },
    banner: {
      width: width, 
      height: '90%',
      marginRight:20
    },
    bannerImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover', 
      borderRadius: 10, 
    },
    pagination: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: 10,
    },
    paginationDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: '#ddd',
      marginHorizontal: 5,
      marginBottom:14
    },
    activeDot: {
      backgroundColor: '#ffc107', 
      width: 12,
      height: 12,
      borderRadius:20
    },
  });
  
