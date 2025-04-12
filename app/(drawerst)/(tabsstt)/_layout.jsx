import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { DrawerToggleButton } from '@react-navigation/drawer';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useContext } from 'react';
import { MyContext } from '../../../components/provider/contextApi';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { FontAwesome6, Ionicons } from '@expo/vector-icons';


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          position: 'relative',
          bottom: 10,
          left: 14,
          right: 14,
          height: 72,
          elevation: 0,
          backgroundColor: '#051937',
          borderRadius: 16,
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 14
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#EB6A39',
        headerTitle: '',
        headerStyle: {
          backgroundColor: '#ffff',
          shadowColor: '#051937',
          elevation: 0,
        },
        headerTitleAlign: 'center',
        headerLeft: () => (
          <View style={styles.drawerButtonContainer}>
            <DrawerToggleButton tintColor="#051937" />
          </View>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={()=>{Alert.alert("Notification","Empty Notification")}} style={styles.notificationButtonContainer}>
            <Ionicons name="notifications" size={26} color="#EB6A39" />
          </TouchableOpacity>
        ),
        headerTitle: () => (
          <View style={styles.logoContainer}>
            <Image
              source={require('../../../assets/images/logo.png')}
              style={styles.logo}
            />
          </View>
        ),
      }}>


      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused, color }) => {
            return (
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 60,
                  height: 60,
                  backgroundColor: focused ? '#EB6A39' : null, 
                  borderRadius: 30,
                  marginBottom: focused ? 20 : 0,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: focused ? 0.3 : 0,
                  shadowRadius: 5,
                  elevation: focused ? 8 : 0,
                  paddingTop: focused ? null : 24
                }}
              >
                <FontAwesome
                  size={24}
                  name="home"
                  color={focused ? '#ffffff' : color}
                />
                {!focused && (
                  <Text
                    style={{
                      color: color,
                      fontSize: 12,
                      marginTop: 4,
                    }}
                  >
                    Home
                  </Text>
                )}
              </View>
            );
          },

        }}
      />

      <Tabs.Screen
        name="mentormate"
        options={{
          tabBarIcon: ({ focused, color }) => {
            return (
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 60,
                  height: 60,
                  backgroundColor: focused ? 'steelblue' : null,
                  borderRadius: 30,
                  marginBottom: focused ? 20 : 0,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: focused ? 0.3 : 0,
                  shadowRadius: 5,
                  elevation: focused ? 8 : 0,
                  paddingTop: focused ? null : 24,
                }}
              >
                <FontAwesome5
                  size={24}
                  name="user-friends"
                  color={focused ? '#ffffff' : color}
                />
                {!focused && (
                  <Text
                    style={{
                      color: color,
                      fontSize: 12,
                      marginTop: 4,
                      textAlign: 'center',
                      width: 70,
                    }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    Learn Mate
                  </Text>
                )}
              </View>
            );
          },
        }}
      />



      <Tabs.Screen
        name="studybuddy"
        options={{
          tabBarIcon: ({ focused, color }) => {
            return (
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 60,
                  height: 60,
                  backgroundColor: focused ? 'green' : null,
                  borderRadius: 30,
                  marginBottom: focused ? 20 : 0,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: focused ? 0.3 : 0,
                  shadowRadius: 5,
                  elevation: focused ? 8 : 0,
                  paddingTop: focused ? null : 24
                }}
              >
                <FontAwesome5
                  size={24}
                  name="book-reader"
                  color={focused ? '#ffffff' : color}
                />
                {!focused && (
                  <Text
                    style={{
                      color: color,
                      fontSize: 12,
                      marginTop: 4,
                      flexWrap: 'nowrap',
                      width: 70,
                      textAlign: 'center',
                    }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    >
                    Study Buddy
                  </Text>
                )}
              </View>
            );
          },

        }}
      />


      <Tabs.Screen
        name="myAccountSt"
        options={{
          tabBarIcon: ({ focused, color }) => {
            return (
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 60,
                  height: 60,
                  backgroundColor: focused ? '#e63c30' : null,
                  borderRadius: 30,
                  marginBottom: focused ? 20 : 0,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: focused ? 0.3 : 0,
                  shadowRadius: 5,
                  elevation: focused ? 8 : 0,
                  paddingTop: focused ? null : 24
                }}
              >
                <FontAwesome6
                  size={24}
                  name="user"
                  color={focused ? '#ffffff' : color}
                />
                {!focused && (
                  <Text
                    style={{
                      color: color,
                      fontSize: 12,
                      marginTop: 4,
                      flexWrap: 'nowrap',
                      textAlign: 'center',
                    }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    >
                    Account
                  </Text>
                )}
              </View>
            );
          },

        }}
      />

    </Tabs>


  );
}

const styles = StyleSheet.create({
  headerLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  notificationButtonContainer: {
    transform: [{ scale: 1.1 }],
    borderRadius: 4,
    marginRight: 4
  },
  drawerButtonContainer: {
    transform: [{ scale: 1.1 }],
    // backgroundColor: '#f4f4f4',
    borderRadius: 4,
    marginLeft: 1
  },
  logoContainer: {
    // position: 'absolute',
    // left: '50%',
    // transform: [{ translateX: -40 }],
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});
