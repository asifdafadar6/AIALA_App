import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function _layout() {
  return (
      <Stack>
         <Stack.Screen name='index' options={{headerShown:false}}/>
         <Stack.Screen name='SignIn' options={{headerShown:false}}/>
         <Stack.Screen name='SignUp' options={{headerShown:false}}/>
         <Stack.Screen name='ForgetPassword' options={{headerShown:false}}/>
         <Stack.Screen name='ResetPassword' options={{headerShown:false}}/>
         <Stack.Screen name='Questionnaire' options={{headerShown:false}}/>
        <Stack.Screen name='studentquestionnaire' options={{headerShown:false}}/>
        <Stack.Screen name='teacherquestionnaire' options={{headerShown:false}}/>
      </Stack>
  
  )
}