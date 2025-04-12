import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function _layout() {
  return (
    <Stack>
        <Stack.Screen name='index' options={{headerShown:false}}/>
        <Stack.Screen name='ActivityHistory' options={{headerShown:false}}/>
        <Stack.Screen name='PunchInOut' options={{headerShown:false}}/>
        <Stack.Screen name='LessionPlanner' options={{headerShown:true}}/>
        <Stack.Screen name='ActivityPlanner' options={{headerShown:true}}/>
        <Stack.Screen name='ActivityGenerator' options={{headerShown:true}}/>
        <Stack.Screen name='StudyBuddy' options={{headerShown:true}}/>
        <Stack.Screen name='StudyBuddyChat' options={{headerShown:false}}/>
        <Stack.Screen name='MentorMate' options={{headerShown:true}}/>
        <Stack.Screen name='MentorMateChat' options={{headerShown:true}}/>
        <Stack.Screen name='ViewAssessments' options={{headerShown:false}}/>
        <Stack.Screen name='PDFView' options={{headerShown:true}}/>
        <Stack.Screen name='AssessmentReview' options={{headerShown:true}}/>
     </Stack>
  )
}