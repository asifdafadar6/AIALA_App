import { View, Text } from 'react-native'
import React from 'react'
import { BarChart } from 'react-native-chart-kit'

export default function HourSpent() {
  return (
    <View style={styles.chartContainer}>
    <Text style={styles.sectionTitle}>Hours Spent</Text>
    <BarChart
      data={{
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [
          {
            data: [2, 4, 6, 8, 12, 6, 4],
          },
        ],
      }}
      width={300} 
      height={200} 
      yAxisLabel=""
      chartConfig={{
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
        color: (opacity = 1) => `rgba(63, 81, 181, ${opacity})`,
        barPercentage: 0.6,
      }}
      style={styles.chartStyle}
    />
  </View>
  )
}


const styles={
    chartContainer: {
        marginBottom: 24,
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
      },
      chartStyle: {
        borderRadius: 8,
      },
}