import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useGlobalSearchParams } from 'expo-router';

export default function PDFView() {
  const params = useGlobalSearchParams();

  console.log("File URL:", params);
  
  useEffect(() => {
    const file = params.file ? decodeURIComponent(params.file) : null;

    if (file) {
    } else {
      console.log("File is undefined or not passed correctly.");
    }
  }, [params]);

  return (
    <View>
      <Text>PDFView</Text>
      <Text>File URL: {params.file ? decodeURIComponent(params.file) : 'No file URL passed'}</Text>
    </View>
  );
}
