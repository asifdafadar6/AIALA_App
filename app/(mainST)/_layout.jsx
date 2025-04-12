import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='Report' options={{ headerShown: true }} />
      <Stack.Screen name='MockTest' options={{ headerShown: true }}/>
      <Stack.Screen name='MockExam' options={{ headerShown: true }}/>
      <Stack.Screen name='LearnMate' options={{ headerShown: true }}/>
      <Stack.Screen name='ViewCourse' />
      <Stack.Screen name='GenerateCourse' />
      <Stack.Screen name='Assessments' />
    </Stack>
  )
}